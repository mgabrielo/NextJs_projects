import { GraphQlContext } from "../../utils/types";

const resolvers = {
  // Query:{},
  Mutation: {
    createConversation: async (
      _: any,
      args: { participantIds: Array<string> },
      context: GraphQlContext
    ) => {
      console.log("conversation resolver args:", args);
    },
  },
};

export default resolvers;
