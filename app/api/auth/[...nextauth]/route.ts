import { env } from "@/src/env"
import XboxLive from "@/src/XboxLive"
import NextAuth, { AuthOptions } from "next-auth"
import { JWT } from "next-auth/jwt"
import AzureADProvider from "next-auth/providers/azure-ad"


export const authOptions: AuthOptions = {
    // Configure one or more authentication providers
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
  

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }