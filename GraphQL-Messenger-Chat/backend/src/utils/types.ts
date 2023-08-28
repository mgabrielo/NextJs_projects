import { PrismaClient } from "@prisma/client";
import Prisma from "@prisma/client";
import { ISODateString } from "next-auth";
import { Context } from "graphql-ws/lib/server";
import { PubSub } from "graphql-subscriptions";

export interface GraphQlContext {
  session: Session | null;
  prisma: PrismaClient;
  pubsub: PubSub;
}
export interface User {
  id: string;
  username: string;
  email: string;
  image: string;
  emailVerified: boolean;
  name: string;
}

export interface Session {
  user?: User;
  expires: ISODateString;
}

export interface SubscriptionContext extends Context {
  connectionParams: {
    session?: Session;
  };
}
//for create username
export interface CreateUsernameResponse {
  success?: boolean;
  error?: string;
}

// for Conversations

// export type ConversationPopulated
