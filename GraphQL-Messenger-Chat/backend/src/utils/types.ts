import { PrismaClient } from "@prisma/client";
import { ISODateString } from "next-auth";

export interface GraphQlContext {
  session: Session | null;
  prisma: PrismaClient;
  // pubsub
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

//for create username
export interface CreateUsernameResponse {
  success?: boolean;
  error?: string;
}
