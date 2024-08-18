
import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    expires: number;
    user: {
        xuid: string,
        gamertag: string,
        email: string,
        role: "user" | "admin",
    };
  }

  interface User {
    xuid: string;
    gamertag: string;
    email: string;
    accessToken: string;
    idToken: string;
    expiresIn: number;
    refreshToken: string;
  }
}
