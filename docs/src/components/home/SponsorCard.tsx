import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Link from 'docs/src/modules/components/Link';
import LaunchRounded from '@material-ui/icons/LaunchRounded';

export default function SponsorCard({
  item,
  inView = false,
  logoSize = 40,
}: {
  item: {
    src: string;
    srcSet: string;
    name: string;
    description: string;
    href: string;
  };
  inView?: boolean;
  logoSize?: number | string;
}) {
  return (
    <Paper
      component={Link}
      noLinkStyle
      href={item.href}
      target="_blank"
      rel="sponsored noopener"
      variant="outlined"
      sx={{
        p: 2,
        display: 'flex',
        textDecoration: 'unset',
        height: '100%',
        textDecorationLine: 'none',
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
