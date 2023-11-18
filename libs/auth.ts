import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";
import clientPromise from "./mongodb";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialProvider({
      name: "email and password",
      credentials: {
        email: {
          label: "Email",
          placeholder: "email@email.com",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please provide valid credentials");
        }
        const client = await MongoClient.connect(
          process.env.NEXT_MONGODB_URI as string,
        );

        const db = client.db();
        const user = await db
          .collection("users")
          .findOne({ email: credentials.email });

        if (user) {
          return user as any;
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  adapter: MongoDBAdapter(clientPromise),
  debug: process.env.NODE_ENV === process.env.NEXT_AUTH_ENVIRONMENT,
  secret: process.env.NEXT_AUTH_SECRET,
};
