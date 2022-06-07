import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';

export default function Links() {
  return (
    <Card
      sx={{
        bgcolor: 'background.level1',
        boxShadow: 'inset 0 1px 0 0 rgb(255 255 255 / 5%)',
      }}
    >
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Avatar size="lg" src="/static/images/avatar/1.jpg" />
        <div>
          {/* This could be a heading (eg. h2) depends on your use case. */}
          <Typography component="div">
            <Link
              overlay
              href="#with-card"
              textColor="inherit"
              underline="none"
              fontWeight="md"
            >
              Joy UI
            </Link>
          </Typography>
          <Typography level="body2">Spark joy components</Typography>
        </div>
      </Box>
      <Typography level="body2">Joy UI is a new library from MUI.</Typography>
    </Card>
  );
}
