import Image from "next/image";
import { getServerSession } from "next-auth";
import { api } from "@/src/trpc/server";
import { ServiceRecordPlaceholder } from "@/src/components/ServiceRecordPlaceholder";
import { Stack, Box, Typography } from "@mui/material";
import { Screenshots } from "@/src/api/sunrise/screenshots";
import { authOptions } from "@/src/api/auth";

export default async function Home({params}: {params: { gamertag: string }}) {
  const session = await getServerSession(authOptions);

  const gamertag = params.gamertag;
  const xuid = await api.sunrise.getXuid.query({ gamertag: params.gamertag });

  const serviceRecord = await api.sunrise.serviceRecord.query({ xuid });
  const screenshots = await api.sunrise.playerScreenshots.query({ xuid });
  const hasPlayed = !!serviceRecord.playerName;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {hasPlayed && serviceRecord && <ServiceRecordPlaceholder serviceRecord={serviceRecord}/>}
      {!hasPlayed && <Typography variant='h4'>{"This player hasn't played in any Sunrise lobbies yet."}</Typography>}
      {hasPlayed && <Typography variant='h4'>Screenshots</Typography>}
      {hasPlayed && screenshots.length > 0 &&
          <Stack flexWrap='wrap' flexDirection='row' gap={4} justifyContent='space-between'>
              {screenshots?.map((screenshot: Screenshots[number]) => (
                <Box key={screenshot.id} width="48%">
                  <img
                    key={screenshot.id}
                    src={`/api/screenshot/${screenshot.id}`}
                    alt={screenshot.header.description}
                    style={{width: '100%', height: 'auto', border: '2px solid white'}}
                  />
                  <Typography variant='body1'>{screenshot.header.filename}</Typography>
                  <Typography variant='body2'>{screenshot.header.description}</Typography>
                </Box>
              ))}
          </Stack>
      }
      {hasPlayed && screenshots.length === 0 && <Typography variant='body1'>{gamertag} {"hasn't uploaded any Screenshots yet."}</Typography>}
    </main>
  );
}
