import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
    user: {
      _id: number;
      name: string;
      email: string;
      linkedinUrl: string;
      avatar?: string;
      
    };
  }
}
