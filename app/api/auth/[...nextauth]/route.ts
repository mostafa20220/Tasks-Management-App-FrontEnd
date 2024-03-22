import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "next-auth";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", value: "tes1t@example.com" },
        password: { label: "Password", type: "password", value: "Test12345!" },
      },

      async authorize(credentials, req): Promise<User | null> {
        // return null;
        // Add logic here to look up the user from the credentials supplied

        try {
          let res = await fetch(`${process.env.SERVER_URL}/auth/signin`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });
          res = await res.json();

          // console.log("auth-res:", res);
          // If you return null then an error will be displayed advising the user to check their details.
          if (!res?.user) return null;
          return res;
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
    //   // signOut: "/auth/signout",
    //   // error: "/auth/error",
    //   // verifyRequest: "/auth/verify-request",
    //   // newUser: null, // If set, new users will be directed here on first sign in
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        // console.log("jwt update");
        // console.log("jwt update user", user);
        // console.log("jwt update token", token);
        // console.log("jwt update session", session);
        return { ...token, tokens: session.tokens };
      }
      // console.log("jwt user", user);
      // console.log("jwt token", token);
      // console.log("jwt session", session);
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      return { ...session, ...token };
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
