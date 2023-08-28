import { GraphQLError } from "graphql";
import { GraphQlContext } from "../../utils/types";
// import { PrismaClient } from "@prisma/client";
// import { PrismaClient, PromiseReturnType } from "@prisma/client";
// const {Prisma}  = require('@prisma/client')
// Prisma.Conservation
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
      const { session, prisma } = context;
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
        return {
          conversationId: conversation.id,
        };
      } catch (error) {
        console.log("create conversation error", error);
        throw new GraphQLError("Error Creating Conversation");
      }
    },
  },
};

export default resolvers;
