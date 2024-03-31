import { DefaultSession } from "next-auth";

export interface DefaultSessionId extends DefaultSession {
  user: {
    name: string;
    email: string;
    image: string;
    id?: string;
  };
}

export interface User {
  _id: string;
  username: string;
  email: string;
  image: string;
}

export interface PromptProps {
  _id: string;
  creator: User;
  prompt: string;
  tag: string;
  date: Date;
}
