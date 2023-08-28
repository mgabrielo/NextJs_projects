import gql from "graphql-tag";

const typeDefs = gql`
  type User {
    id: String
    name: String
    email: String
    emailVerified: Boolean
    image: String
    username: String
  }

  type SearchedUser {
    id: String
    username: String
  }

  type Query {
    searchUsers(username: String): [SearchedUser]
  }
  type Mutation {
    createUsername(username: String): CreateUsernameResponse
  }

  type CreateUsernameResponse {
    success: Boolean
    error: String
  }
`;

export default typeDefs;
