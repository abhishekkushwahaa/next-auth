import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
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
        const user = { id: "1", name: "Abhsihek", email: credentials?.email };

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
};
