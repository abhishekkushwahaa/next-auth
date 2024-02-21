import GitHubProvider from "next-auth/providers/github";
import { User } from "@/app/models/User";
import { connect } from "@/app/utils/db";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        connect();

        const existingUser = await User.findOne({ email: user.email });
        if (existingUser) {
          return true;
        }

        await User.create({
          name: user.name,
          email: user.email,
        });

        return true;
      } catch (error) {
        console.error("Sign In Error", error);
        return false;
      }
    },
  },
  providers: [
    CredentialsProvider({
      name: "NextAuth",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "Please enter your email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        connect();
        const user = await User.findOne({
          email: credentials?.email,
        });

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
};
