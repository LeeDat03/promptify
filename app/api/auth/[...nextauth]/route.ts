import User from "@/models/user";
import { connectToDB } from "@/utils/db";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        // Cac buoc de signIn:
        // connecttoDB => kiem tra user co trong db hay khong => neu o co thi tao user moi
        await connectToDB();

        const userExisting = await User.findOne({ email: user.email });

        // neu k ton tai
        if (!userExisting) {
          await User.create({
            username: user.name,
            email: user.email,
            image: user.image,
          });
        }
      } catch (err) {
        console.error(err);
        return false;
      }

      return true;
    },
  },
});

export { handler as GET, handler as POST };
