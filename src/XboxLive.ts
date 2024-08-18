import { OAuthConfig, OAuthUserConfig } from "next-auth/providers"
import { z } from "zod"

export interface XboxProfile extends Record<string, any> {
  gamertag: string
  xuid: string
  email: string
}

const XHTSResponseSchema = z.object({
    Token: z.string(),
    DisplayClaims: z.object({
        xui: z.array(z.object({ gtg: z.string().optional(), xid: z.string().optional() })).length(1),
    }),
})

export default function XboxLive<P extends XboxProfile>(
    options: OAuthUserConfig<P> & {
      /** @default "consumers" */
      tenantId?: string
    }
  ): OAuthConfig<P> {
    const tenant = options.tenantId ?? "consumers"
  
    return {
      id: "xbl",
      name: "Xbox LIVE",
      type: "oauth",
      wellKnown: `https://login.microsoftonline.com/${tenant}/v2.0/.well-known/openid-configuration`,
      authorization: {
        url: `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/authorize`,
        params: {
          scope: "openid email XboxLive.signin",
        },
      },
      userinfo: {
        async request({ tokens }) {
            console.log("AT USERINFO WITH TOKENS", tokens)
          if (tokens.id_token) {
            const decoded = JSON.parse(
              Buffer.from(tokens.id_token.split(".")[1]!, "base64").toString()
            ) as { email: string }

            console.log("DECODED", decoded)
  
            const xbox = await fetch(
              "https://user.auth.xboxlive.com/user/authenticate",
              {
                method: "POST",
                body: JSON.stringify({
                  Properties: {
                    AuthMethod: "RPS",
                    SiteName: "user.auth.xboxlive.com",
                    RpsTicket: "d=" + tokens.access_token,
                    'OptionalDisplayClaims': ['mgt', 'umg', 'mgs']
                  },
                  RelyingParty: "http://auth.xboxlive.com",
                  TokenType: "JWT",
                }),
              }
            )
  
            if (xbox.ok) {
              const xboxResponse = (await xbox.json()) as {
                DisplayClaims: { xui: { uhs: string | undefined }[] }
                Token: string | undefined
              }
  
              const xboxToken = xboxResponse?.Token

              const xhts = await fetch(
                "https://xsts.auth.xboxlive.com/xsts/authorize",
                {
                  method: "POST",
                  body: JSON.stringify({
                    Properties: {
                        'SandboxId': 'RETAIL',
                        'OptionalDisplayClaims': ['mgt', 'umg', 'mgs'],
                        UserTokens: [xboxToken],
                    },
                    'RelyingParty': 'http://xboxlive.com',
                    'TokenType': 'JWT',
                  }),
                }
              )

              const xhtsResponse = XHTSResponseSchema.parse(await xhts.json())
  
              return {
                id: xhtsResponse.DisplayClaims.xui[0].xid,
                name: xhtsResponse.DisplayClaims.xui[0].gtg,

                refreshToken: tokens.refresh_token,
                gamertag: xhtsResponse.DisplayClaims.xui[0].gtg,
                xuid: xhtsResponse.DisplayClaims.xui[0].xid,
                email: decoded.email,
              }
            }
          }
  
          throw new Error()
        },
      },
      async profile(profile) {
        return profile
      },
      style: { logo: "/microsoft.svg", text: "#fff", bg: "#3b8526" },
      options,
    }
  }