import { DefaultSession } from "next-auth";

export interface DefaultSessionId extends DefaultSession {
  user: {
    name: string;
    email: string;
    image: string;
    id?: string;
  };
}
