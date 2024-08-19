import { api } from "@/src/trpc/server";
import { Stack, Box, Typography } from "@mui/material";
import { Screenshots } from "@/src/api/sunrise/screenshots";

export default async function Home() {
  //const playlists = await api.sunrise.matchmakingPlaylists.query();
  const screenshots = await api.sunrise.screenshots.query();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Typography variant='h4'>Screenshots</Typography>
      {screenshots.length > 0 &&
          <Stack flexWrap='wrap' flexDirection='row' gap={2} justifyContent='space-between'>
              {screenshots?.map((screenshot: Screenshots[number]) => (
                <Box key={screenshot.id} width="31%" sx={{ backgroundColor: 'white'}} color="black">
                  <img
                    key={screenshot.id}
                    src={`/api/screenshot/${screenshot.id}`}
                    alt={screenshot.header.description}
                    style={{width: '100%', height: 'auto', border: '2px solid white'}}
                  />
                  <Typography variant='body1'>{screenshot.header.filename}</Typography>
                  <Typography variant='body1'>{screenshot.header.author}</Typography>

                </Box>
              ))}
          </Stack>
      }
    </main>
  );
}
