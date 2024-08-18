import { env } from "@/src/env"
import XboxLive from "@/src/XboxLive"
import NextAuth, { AuthOptions } from "next-auth"
import AzureADProvider from "next-auth/providers/azure-ad"


export const authOptions: AuthOptions = {
    // Configure one or more authentication providers
    providers: [
      XboxLive({
        clientId: env.AZURE_AD_CLIENT_ID,
        clientSecret: env.AZURE_AD_CLIENT_SECRET,
      })
    ],
    debug: true,
    logger: {
      error: (...val) => console.error(JSON.stringify(val, null, 2)),
      warn: (...val) => console.warn(JSON.stringify(val, null, 2)),
      info: (...val) => console.info(JSON.stringify(val, null, 2)),
      debug: (...val) => console.debug(JSON.stringify(val, null, 2)),
    },
    secret: env.NEXTAUTH_SECRET,
  }
  

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }