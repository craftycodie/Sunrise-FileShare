import Image from "next/image";
import { getServerSession } from "next-auth";
import { api } from "@/src/trpc/server";
import { ServiceRecordPlaceholder } from "@/src/components/ServiceRecordPlaceholder";
import { Stack, Box, Typography, Divider } from "@mui/material";
import { Screenshots } from "@/src/api/sunrise/screenshots";
import { authOptions } from "@/src/api/auth";
import { FileShare } from "@/src/api/sunrise/fileShare";
import Link from "next/link";

const getFileImage = (type: number) =>  {
  if (type < 10) return "gametype";
  if (type === 10) return "map";
  if (type === 11) return "film";
  if (type === 12) return "clip";
  if (type === 13) return "screenshot";

  return "gametype";
}

export default async function Home({params}: {params: { gamertag: string }}) {
  const session = await getServerSession(authOptions);
  const loggedIn = !!session?.user;

  const gamertag = params.gamertag;
  const xuid = await api.sunrise.getXuid.query({ gamertag: params.gamertag });

  const serviceRecord = await api.sunrise.serviceRecord.query({ xuid });
  const fileShare = await api.sunrise.fileShare.query({ xuid });
  const screenshots = await api.sunrise.playerScreenshots.query({ xuid });
  const hasPlayed = !!serviceRecord.playerName;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {hasPlayed && serviceRecord && <ServiceRecordPlaceholder serviceRecord={serviceRecord}/>}
      {!hasPlayed && <Typography variant='h4'>{"This player hasn't played in any Sunrise lobbies yet."}</Typography>}
      {hasPlayed && <Typography variant='h4'>File Share</Typography>}
      {hasPlayed && fileShare.slots.length > 0 &&
          <Stack flexWrap='wrap' flexDirection='row' gap={4} justifyContent='space-between'>
              {fileShare.slots.map((slot: FileShare['slots'][number]) => (
                <Box key={slot.id} width="30%" sx={{
                  border: '1px solid white',
                  background: `linear-gradient(0deg, #111 0%, #555 100%)`,
                }}>
                  <Typography variant='body1'>{slot.header.filename}</Typography>
                  <Typography variant='body1'>Created {slot.header.date} by <Link href={"/player/" + slot.header.author}>{slot.header.author}</Link></Typography>
                  <Divider />
                  <Stack direction='row' gap={2} >
                    <img style={{width: '30%'}} src={'/img/files/' + getFileImage(slot.header.filetype) + '.png'} />
                    {loggedIn && <Typography variant='body1'>Download to Halo 3</Typography>}
                  </Stack>
                  <Divider />
                  <Typography variant='body2'>{slot.header.description}</Typography>
                </Box>
              ))}
          </Stack>
      }
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
