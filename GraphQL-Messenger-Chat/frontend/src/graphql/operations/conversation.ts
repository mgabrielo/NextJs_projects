import { gql } from "@apollo/client";
import { MessageFields } from "./message";

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
     ${MessageFields}
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
