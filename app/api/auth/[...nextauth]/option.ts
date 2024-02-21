import { User } from "@/app/models/User";
import { connect } from "@/app/utils/db";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/login",
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
  ],
};
