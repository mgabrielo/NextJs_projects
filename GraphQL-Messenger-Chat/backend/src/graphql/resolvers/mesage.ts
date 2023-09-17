import { GraphQLError } from "graphql";
import {
  GraphQlContext,
  MessageSentSubscriptionPayload,
  sendMessageArguments,
} from "../../utils/types";
import { Prisma } from "@prisma/client";
import { withFilter } from "graphql-subscriptions";
import { userIsConversationParticipant } from "../../utils/functions";

const resolvers = {
  Query: {
    messages: async function (
      _: any,
      args: { conversationId: string },
      context: GraphQlContext
    ): Promise<Array<any>> {
      const { session, prisma } = context;
      const { conversationId } = args;

      if (!session?.user) {
        throw new GraphQLError("Not Authenticated nor Authorised");
      }
      const { id: userId } = session.user;

      const conversation = await prisma.conversation.findUnique({
        where: {
          id: conversationId,
        },
        include: {
          participants: {
            include: {
              user: {
                select: {
                  id: true,
                  username: true,
                },
              },
            },
          },
          latestMessage: {
            include: {
              sender: {
                select: {
                  id: true,
                  username: true,
                },
              },
            },
          },
        },
      });

      if (!conversation) {
        throw new GraphQLError("no conversation found");
      }

      const allowedView = userIsConversationParticipant(
        conversation.participants,
        userId
      );

      if (!allowedView) {
        throw new GraphQLError("not Authorised");
      }

      try {
        const messages = await prisma.message.findMany({
          where: {
            conversationId: conversationId,
          },
          include: messagePopulated,
          orderBy: {
            createdAt: "desc",
          },
        });
        // return messages;
        return [{ body: " Hello grey" }] as any;
      } catch (error: any) {
        console.log("query message err:", error);
        throw new GraphQLError(error?.message);
      }
    },
  },
  Mutation: {
    sendMessage: async (
      _: any,
      args: sendMessageArguments,
      context: GraphQlContext
    ): Promise<boolean> => {
      const { session, prisma, pubsub } = context;

      if (!session?.user) {
        throw new GraphQLError("Not Authenticated nor Authorised");
      }

      const { id: userId } = session.user;
      const { id: messageId, senderId, conversationId, body } = args;

      if (userId !== senderId) {
        throw new GraphQLError("Not Authorised");
      }

      try {
        const newMessage = await prisma.message.create({
          data: {
            id: messageId,
            senderId: senderId,
            conversationId: conversationId,
            body: body,
          },
          include: messagePopulated,
        });

        // newMessage.sender.username
        const conversation = await prisma.conversation.update({
          where: {
            id: conversationId,
          },
          data: {
            latestMessageId: newMessage.id,
            participants: {
              update: {
                where: {
                  id: senderId,
                },
                data: {
                  hasSeenLatestMessage: true,
                },
              },
              updateMany: {
                where: {
                  NOT: {
                    userId: senderId,
                  },
                },
                data: {
                  hasSeenLatestMessage: false,
                },
              },
            },
          },
        });

        pubsub.publish("MESSAGE_SENT", { messageSent: newMessage });
        // pubsub.publish("CONVERSATION_UPDATED", {
        //   conversationUpdated: conversation,
        // });
      } catch (error) {
        console.log("send msg err:", error);
        throw new GraphQLError("Error Sending Message");
      }

      return true;
    },
  },
  Subscription: {
    messageSent: {
      subscribe: withFilter(
        (_: any, __: any, context: GraphQlContext) => {
          const { pubsub } = context;
          return pubsub.asyncIterator(["MESSAGE_SENT"]);
        },

        (
          payload: MessageSentSubscriptionPayload,
          args: { convsersationId: string },
          context: GraphQlContext
        ) => {
          return payload.messageSent.conversationId === args.convsersationId;
        }
      ),
    },
  },
};

export const messagePopulated = Prisma.validator<Prisma.MessageInclude>()({
  sender: {
    select: {
      id: true,
      username: true,
    },
  },
});

export default resolvers;
