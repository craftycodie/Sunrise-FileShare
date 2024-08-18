import { env } from "@/src/env"
import XboxLive from "@/src/XboxLive"
import NextAuth, { NextAuthConfig } from "next-auth"
import { JWT } from "next-auth/jwt"


export const nextAuthConfig: NextAuthConfig = {
    basePath: '/api/auth',
    providers: [
      XboxLive({
        clientId: env.AZURE_AD_CLIENT_ID,
        clientSecret: env.AZURE_AD_CLIENT_SECRET,
      })
    ],
    callbacks: {
      jwt: ({token, user, account, profile}): JWT => {
        console.log('AT JWT WITH', { token, user, account, profile });
        if (account && profile) {
          return {
            user: {
              xuid: user.xuid,
              gamertag: user.gamertag,
              email: user.email,
            },
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
          };
        }
        else {
          console.log({ token, user, account, profile });

          return token as JWT;
        }
      },
      session({ session, token, user }) {
        console.log('AT SESSION WITH', { session, token, user })
        return {
          user: token.user,
          expires: 0,
        }
      },
    },
    secret: env.NEXTAUTH_SECRET,
  }
  

export const {handlers, auth, signIn, signOut} = NextAuth(nextAuthConfig)