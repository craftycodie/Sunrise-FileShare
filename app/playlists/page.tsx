import { api } from "@/src/trpc/server";
import { Stack, Box, Typography } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

export default async function Home() {
  const playlists = await api.sunrise.matchmakingPlaylists.query();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Typography variant='h4'>Matchmaking Playlists</Typography>
      {playlists.length > 0 &&
          <Stack>
              {playlists?.map((category: any) => (
                <Accordion key={category.id}>
                  <AccordionSummary>
                    <Typography variant='body1'>{category.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ul>
                        {category.hoppers.map((playlist: any) => (
                            <li key={playlist.id}>
                                <Typography variant='body2'>{playlist.name}</Typography>
                                <div dangerouslySetInnerHTML={{__html: playlist.description.replace('|r|n', '\n')}}></div>
                                {/* <Typography variant='body2'>{playlist.description}</Typography> */}
                            </li>
                        ))}
                    </ul>
                  </AccordionDetails>
                </Accordion>
              ))}
          </Stack>
      }
    </main>
  );
}
