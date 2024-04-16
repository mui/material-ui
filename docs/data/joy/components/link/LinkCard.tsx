import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Card from '@mui/joy/Card';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';

export default function LinkCard() {
  return (
    <Card variant="outlined" sx={{ display: 'flex', gap: 2 }}>
      <Avatar size="lg" src="/static/images/avatar/1.jpg" />
      <Link
        overlay
        href="#introduction"
        underline="none"
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}
      >
        <Typography level="body-md">Joy UI</Typography>
        <Typography level="body-sm">Components that spark joy!</Typography>
      </Link>
    </Card>
  );
}
