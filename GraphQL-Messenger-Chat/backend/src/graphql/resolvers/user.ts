import { CreateUsernameResponse, GraphQlContext } from "../../utils/types";

const resolvers = {
  Query: {
    searchUsers: () => {},
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
