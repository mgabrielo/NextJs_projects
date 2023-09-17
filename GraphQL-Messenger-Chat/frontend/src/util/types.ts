//Users
export interface CreateUsernameData {
  createUsername: {
    success: boolean;
    error: string;
  };
}

export interface CreateUsernameVariables {
  username: string;
}

export interface SearchUserInput {
  username: string;
}
export interface SearchUserData {
  searchUsers: Array<SearchedUser>;
}

export interface SearchedUser {
  id: string;
  username: string;
}

// Conversations

export interface ConversationsData {
  conversations: Array<any>;
}

export interface CreateConverstaionData {
  createConversation: {
    conversationId: string;
  };
}

export interface CreateConversationInput {
  participantIds: Array<string>;
}

//Messages
export interface MessagesData {
  messages: Array<any>;
}

export interface MessagesVariables {
  conversationId: string;
}
