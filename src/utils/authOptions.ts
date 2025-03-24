import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import { setToken } from '@/redux/features/auth/authSlice';
import {store } from '@/redux/store';

declare module 'next-auth' {
    interface Session {
      accessToken?: string;
      user?: any;
    }
  }
  
  declare module 'next-auth/jwt' {
    interface JWT {
      accessToken?: string;
      user?: any;
    }
  }
  
  export const authOptions: NextAuthOptions = {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
      GitHubProvider({
        clientId: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      async jwt({ token, account, user }) {
        // Persist the OAuth access_token to the token right after sign-in
        if (account?.access_token) {
          token.accessToken = account.access_token;
        }
        // If a user is returned by NextAuth, persist user data to the token
        if (user) {
          token.user = user;
        }
        return token;
      },
      async session({ session, token }) {
  
        // Attach the accessToken to the session object if it exists
        if (token?.accessToken) {
          session.accessToken = token.accessToken as string;
        }
        // Once the session is created, update Redux with the session data
        const { dispatch } = store;
        dispatch(setToken({
          token: session.accessToken as string,
          user: session.user,
        }));
        return session;
      },
    },
  };