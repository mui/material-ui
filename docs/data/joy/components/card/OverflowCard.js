import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';

export default function OverflowCard() {
  return (
    <Card variant="outlined" sx={{ minWidth: 240 }}>
      <CardOverflow>
        <AspectRatio ratio="1">
          <img
            src="https://images.unsplash.com/photo-1627483262268-9c2b5b2834b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            alt=""
          />
        </AspectRatio>
      </CardOverflow>
      <Typography level="h2" sx={{ fontSize: 'lg', mt: 3 }}>
        <Link href="#minimal-photo">Minimal photography</Link>
      </Typography>
      <Typography level="body2" sx={{ mt: 0.5, mb: 2 }}>
        By <Link href="#sukjit">Sujith</Link>
      </Typography>
      <CardOverflow
        variant="soft"
        sx={{
          display: 'flex',
          gap: 1,
          py: 1.5,
          px: 'var(--Card-padding)',
          borderTop: '1px solid',
          borderColor: 'neutral.outlinedBorder',
          bgcolor: 'background.level1',
        }}
      >
        <Typography level="body2" sx={{ fontWeight: 'md', color: 'text.primary' }}>
          6.3k views
        </Typography>
        <Box sx={{ width: 2, bgcolor: 'divider' }} />
        <Typography level="body2" sx={{ fontWeight: 'md', color: 'text.primary' }}>
          1 hour ago
        </Typography>
      </CardOverflow>
    </Card>
  );
}
