import { GraphQLError } from "graphql";
import { GraphQlContext } from "../../utils/types";
import { withFilter } from "graphql-subscriptions";
import { Prisma } from "@prisma/client";

const resolvers = {
  Query: {
    conversations: async (_: any, __: any, context: GraphQlContext) => {
      console.log("conversations query resolver");
      const { session, prisma } = context;

      if (!session?.user) {
        throw new GraphQLError("Not Authorised");
      }

      const {
        user: { id: userId },
      } = session;

      try {
        const conversations = await prisma.conversation.findMany({
          //   where:{
          //       participants:{
          //           some:{
          //               userId:{
          //                   equals: userId
          //               }
          //           }
          //       }
          //   },
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

        return conversations.filter(
          (conversation) =>
            !!conversation.participants.find((p) => p.userId === userId)
        );
      } catch (error) {
        console.log("Conversations Error");
      }
    },
  },
  Mutation: {
    createConversation: async (
      _: any,
      args: { participantIds: Array<string> },
      context: GraphQlContext
    ): Promise<{ conversationId: string }> => {
      //   console.log("conversation resolver args:", args);
      const { session, prisma, pubsub } = context;
      const { participantIds } = args;

      if (!session?.user) {
        throw new GraphQLError("Not Authorised");
      }
      const {
        user: { id: userId },
      } = session;

      try {
        const conversation = await prisma.conversation.create({
          data: {
            participants: {
              createMany: {
                data: participantIds.map((id) => ({
                  userId: id,
                  hasSeenLatestMessage: id === userId,
                })),
              },
            },
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

        // emit subscription
        pubsub.publish("Conversation_Created", {
          conversationCreated: conversation,
        });
        return {
          conversationId: conversation.id,
        };
      } catch (error) {
        console.log("create conversation error", error);
        throw new GraphQLError("Error Creating Conversation");
      }
    },
  },
  Subscription: {
    conversationCreated: {
      // subscribe: (_: any, __: any, context: GraphQlContext) => {
      //   const { pubsub } = context;
      //   return pubsub.asyncIterator(["Conversation_Created"]);
      // },
      subscribe: withFilter(
        (_: any, __: any, context: GraphQlContext) => {
          const { pubsub } = context;
          return pubsub.asyncIterator(["Conversation_Created"]);
        },
        (
          payload: ConversationCreatedSubscriptionPayload,
          _,
          context: GraphQlContext
        ) => {
          const { session } = context;
          const {
            conversationCreated: { participants },
          } = payload;
          const userIsParticipant = !!participants.find(
            (p: any) => p.userId === session?.user?.id
          );
          return userIsParticipant;
        }
      ),
    },
  },
};

export interface ConversationCreatedSubscriptionPayload {
  conversationCreated: any;
}
export default resolvers;
