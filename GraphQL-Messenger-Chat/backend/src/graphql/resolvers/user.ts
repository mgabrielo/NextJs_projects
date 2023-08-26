const resolvers = {
  Query: {
    searchUsers: () => {},
  },
  Mutation: {
    createUsername: () => {
      console.log("Hey G-APi");
    },
  },
};

export default resolvers;
