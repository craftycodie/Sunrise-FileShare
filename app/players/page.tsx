import { api } from "@/src/trpc/server";
import { ServiceRecordPlaceholder } from "@/src/components/ServiceRecordPlaceholder";
import { Stack, Box, Typography } from "@mui/material";
import Link from "next/link";
import { ServiceRecord } from "@/src/api/sunrise/serviceRecord";

export default async function Home() {
  const players = await api.sunrise.serviceRecords.query({ pageSize: 100, pageNumber: 1 });
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Typography variant='h4'>Players</Typography>
      {players.length > 0 &&
          <Stack flexWrap='wrap' flexDirection='row' gap={2} justifyContent='space-between'>
              {players?.map((serviceRecord: ServiceRecord) => (
                <Link key={serviceRecord.id} href={"/player/" + serviceRecord.playerName} style={{
                  width: '100%',
                  textDecoration: 'none',
                  color: 'unset'
                }}>
                  <ServiceRecordPlaceholder serviceRecord={serviceRecord}/>
                </Link>
              ))}
          </Stack>
      }
    </main>
  );
}
