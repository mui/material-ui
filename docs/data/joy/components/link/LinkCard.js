import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import CenterFocusWeak from '@mui/icons-material/CenterFocusWeak';

export default function LinkCard() {
  return (
    <Card>
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
          <Typography level="body-sm">Components that spark joy!</Typography>
        </div>
      </Box>
      <Typography level="body-sm" display="flex" alignItems="center" gap={0.5}>
        Click the <CenterFocusWeak /> and <kbd>TAB</kbd> to test the focus
      </Typography>
    </Card>
  );
}
