import { gql } from "@apollo/client";

const ConversationFields = `

    id
    participants {
      user {
        id
        username
      }
      hasSeenLatestMessage
    }
    latestMessage{
      id
      sender{
          id
          username
      }
      body
      createdAt
    }
    updatedAt

`;

export default {
  Queries: {
    conversations: gql`
      query Conservations {
        conversations{
        ${ConversationFields}        
        }
      }
    `,
  },
  Mutations: {
    createConversation: gql`
      mutation createConversation($participantIds: [String]!) {
        createConversation(participantIds: $participantIds) {
          conversationId
        }
      }
    `,
  },
  Subscriptions: {
    conversationCreated: gql`
        subscription conversationCreated{
            conversationCreated{
                ${ConversationFields}
            }
        }
    `,
  },
};
