import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Link, { linkClasses } from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';

export default function LinkCard() {
  return (
    <Box sx={{ p: 2 }}>
      <Card variant="outlined" sx={{ display: 'flex', gap: 2 }}>
        <Avatar size="lg" src="/static/images/avatar/1.jpg" />
        <Link
          overlay
          href="#introduction"
          underline="none"
          className={linkClasses.focusVisible}
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}
        >
          <Typography level="body-md">Joy UI</Typography>
          <Typography level="body-sm">Components that spark joy!</Typography>
        </Link>
      </Card>
    </Box>
  );
}
