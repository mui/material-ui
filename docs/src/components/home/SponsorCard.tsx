import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import LaunchRounded from '@mui/icons-material/LaunchRounded';
import { Link } from '@mui/docs/Link';

export default function SponsorCard(props: {
  item: {
    src: string;
    srcSet?: string;
    name: string;
    description: string;
    href: string;
  };
  inView?: boolean;
  logoSize?: number | string;
}) {
  const { item, inView = false, logoSize = 40 } = props;
  // Keep it under two rows maximum.
  if (item.description.length > 50 && logoSize === 40) {
    throw new Error(
      `${item.name}'s description is too long (${item.description.length} characters). It must fit into two line, so under 50 characters.`,
    );
  }

  return (
    <Paper
      data-ga-event-category="sponsor"
      data-ga-event-action="homepage"
      data-ga-event-label={new URL(item.href).hostname}
      variant="outlined"
      sx={{
        p: 2,
        display: 'flex',
        height: '100%',
        '& svg': {
          transition: '0.2s',
        },
        '&:hover': {
          '& svg': {
            transform: 'translateY(-2px)',
          },
        },
      }}
    >
      <Avatar
        {...(inView && { src: item.src, srcSet: item.srcSet, alt: `${item.name} logo` })}
        sx={{ borderRadius: '4px', width: logoSize, height: logoSize }}
        slotProps={{ img: { loading: 'lazy' } }}
      />
      <Box sx={{ ml: 2 }}>
        <Typography variant="body2" fontWeight="bold">
          {item.name}{' '}
          <LaunchRounded color="primary" sx={{ fontSize: 14, verticalAlign: 'middle', ml: 0.5 }} />
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>
      </Box>
    </Paper>
  );
}
