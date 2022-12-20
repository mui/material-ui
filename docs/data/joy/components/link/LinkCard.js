import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import CenterFocusWeak from '@mui/icons-material/CenterFocusWeak';

export default function Links() {
  return (
    <Card
      sx={{
        bgcolor: 'background.body',
        '&:hover, &:focus-within': {
          bgcolor: 'background.level2',
        },
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
          <Typography level="body2">Components that spark joy!</Typography>
        </div>
      </Box>
      <Typography level="body2" display="flex" alignItems="center" gap={0.5}>
        Click the <CenterFocusWeak /> and <kbd>TAB</kbd> to test the focus
      </Typography>
    </Card>
  );
}
