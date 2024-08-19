import type { Metadata } from "next";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import { ThemeProvider } from '@mui/material/styles';
import theme from "@/src/theme";
import { Container } from "@mui/material";
import { Header } from "@/src/components/Header";
import CssBaseline from '@mui/material/CssBaseline';
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);


  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
          <CssBaseline />
            <Header session={session} />
            <Container maxWidth="md">              
              {children}
            </Container>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
