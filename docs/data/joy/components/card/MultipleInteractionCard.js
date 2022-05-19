import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import Favorite from '@mui/icons-material/Favorite';

export default function MultipleInteractionCard() {
  return (
    <Card
      variant="outlined"
      sx={{ minWidth: 240, '&:hover, &:focus-within': { boxShadow: 'lg' } }}
    >
      <CardOverflow>
        <AspectRatio ratio="4/3">
          <img
            src="https://images.unsplash.com/photo-1627483262268-9c2b5b2834b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            alt=""
          />
          <IconButton
            aria-label="Like minimal photography"
            size="lg"
            variant="solid"
            color="danger"
            sx={{
              position: 'absolute',
              zIndex: 2,
              borderRadius: '50%',
              right: '1rem',
              bottom: 'calc(-1/2 * var(--IconButton-size))',
            }}
          >
            <Favorite />
          </IconButton>
        </AspectRatio>
      </CardOverflow>
      <Typography
        level="h2"
        aria-describedby="multiple-interaction-description"
        sx={{ fontSize: 'lg', mt: 3 }}
      >
        <Link href="#multiple-interaction" overlay color="text.primary">
          Minimal photography
        </Link>
      </Typography>
      <Typography
        id="multiple-interaction-description"
        level="body2"
        sx={{ mt: 0.5, mb: 2 }}
      >
        By <Link href="#sukjit">Sujith</Link>
      </Typography>
      <CardOverflow
        variant="soft"
        sx={{
          display: 'flex',
          gap: 1,
          py: 1.5,
          px: 'var(--Card-padding)',
          mt: 'auto',
          borderTopColor: 'background.level2',
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
