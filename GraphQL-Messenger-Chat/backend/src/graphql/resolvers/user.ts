import type { User } from "@prisma/client";
import { GraphQLError } from "graphql";
import { CreateUsernameResponse, GraphQlContext } from "../../utils/types";

const resolvers = {
  Query: {
    searchUsers: async (
      _: any,
      args: { username: string },
      context: GraphQlContext
    ): Promise<Array<User>> => {
      console.log("inside search users");
      const { username: searchedUsername } = args;
      const { session, prisma } = context;
      if (!session?.user) {
        throw new GraphQLError("Not Authorised");
      }
      const {
        user: { username: myUsername },
      } = session;
      try {
        const _users = await prisma.user.findMany({
          where: {
            username: {
              contains: searchedUsername,
              not: myUsername,
              mode: "insensitive",
            },
          },
        });

        return _users;
      } catch (error: any) {
        console.log("searchuser error", error);
        throw new GraphQLError(error?.message);
      }
    },
  },
  Mutation: {
    createUsername: async (
      _: any,
      args: { username: string },
      context: GraphQlContext
    ): Promise<CreateUsernameResponse> => {
      const { username } = args;
      const { session, prisma } = context;

      if (!session?.user) {
        return {
          error: "Not Authorised",
        };
      }

      const { id: userId } = session?.user;

      try {
        // check username already exist
        const existingUser = await prisma.user.findUnique({
          where: {
            username,
          },
        });

        if (existingUser) {
          return {
            error: " Username Already Exist, Choose Another",
          };
        }

        //update user
        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            username,
          },
        });

        return { success: true };
      } catch (error: any) {
        console.log("createusername error", error);
        return {
          error: error.message as string,
        };
      }
    },
  },
};

export default resolvers;
