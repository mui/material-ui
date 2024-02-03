import * as React from 'react';
import { Box, Button } from "@mui/material";

export default function Home() {
  return (
    <main className="mx-auto container py-10">
      <Box className="border-1 border-solid h-96 border-slate-200 p-5 rounded-3xl">
        <h1 className="text-3xl text-center">Next 14 + Material UI + Tailwind CSS</h1>
        <div className="mx-auto w-fit mt-5">
          <Button disableElevation variant="contained" className="px-6 py-2 rounded-xl">MUI Button customized by Tailwind</Button>
        </div>
      </Box>
    </main>
  );
}
