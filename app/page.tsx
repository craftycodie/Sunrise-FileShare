import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { api } from "@/src/trpc/server";
import { ServiceRecordPlaceholder } from "@/src/components/ServiceRecordPlaceholder";
import { Stack, Box, Typography } from "@mui/material";
import { Screenshots } from "@/src/api/sunrise/screenshots";
import { env } from "@/src/env";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const loggedIn = await !!session?.user.xuid
  //const playlists = await api.sunrise.matchmakingPlaylists.query();
  const serviceRecord = loggedIn ? await api.sunrise.serviceRecord.query() : undefined;
  const screenshots = loggedIn ? await api.sunrise.screenshots.query() : undefined;
  const hasPlayed = loggedIn && serviceRecord.playerName;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {hasPlayed && serviceRecord && <ServiceRecordPlaceholder serviceRecord={serviceRecord}/>}
      {loggedIn && !hasPlayed && <Typography variant='h4'>You haven't played in any Halo 3 Sunrise games yet.</Typography>}
      {!loggedIn && <Typography variant='h4'>Sign in with Xbox LIVE to view your Service Record.</Typography>}
      {hasPlayed && <Typography variant='h4'>Screenshots</Typography>}
      {hasPlayed && screenshots.length > 0 &&
          <Stack flexWrap='wrap' flexDirection='row' gap={4} justifyContent='space-between'>
              {screenshots?.map((screenshot: Screenshots[number]) => (
                <Box width="48%">
                  <img
                    key={screenshot.id}
                    src={`${env.SUNRISE_API_BASE_URL}/sunrise/screenshot/${screenshot.id}`}
                    alt={screenshot.header.description}
                    style={{width: '100%', height: 'auto', border: '2px solid white'}}
                  />
                  <Typography variant='body1'>{screenshot.header.filename}</Typography>
                  <Typography variant='body2'>{screenshot.header.description}</Typography>
                </Box>
              ))}
          </Stack>
      }
      {hasPlayed && screenshots.length === 0 && <Typography variant='h4'>You haven't uploaded any Screenshots yet.</Typography>}
      <p style={{whiteSpace: 'pre'}}>
        {/* {JSON.stringify(playlists, null, 2)} */}
      </p>

    </main>
  );
}
