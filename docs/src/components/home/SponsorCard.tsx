import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Box, { BoxProps } from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Link from 'docs/src/modules/components/Link';
import LaunchRounded from '@material-ui/icons/LaunchRounded';

export function SponsorLabel({
  color,
  children,
  sx,
  darker = false,
}: {
  color: 'primary' | 'warning';
  children: React.ReactNode;
  sx?: BoxProps['sx'];
  darker?: boolean;
}) {
  return (
    <Box
      sx={{
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? `${color}.${darker ? '900' : '800'}` : `${color}.50`,
        color: (theme) =>
          theme.palette.mode === 'dark' ? `${color}.100` : `${color}.${darker ? '800' : '500'}`,
        display: 'flex',
        alignItems: 'center',
        typography: 'body2',
        fontWeight: 600,
        p: 1,
        ...sx,
      }}
    >
      <Box
        sx={{
          display: 'inline-block',
          mr: 1,
          borderRadius: 1,
          width: 12,
          height: 12,
          bgcolor: (theme) =>
            theme.palette.mode === 'dark'
              ? `${color}.${darker ? '800' : '300'}`
              : `${color}.${darker ? '800' : '500'}`,
          border: '3px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark'
              ? `${color}.${darker ? '300' : '500'}`
              : `${color}.${darker ? '300' : '100'}`,
        }}
      />
      {children}
    </Box>
  );
}

export default function SponsorCard({
  item,
  bottom,
  inView = false,
}: {
  item: {
    src: string;
    srcSet: string;
    name: string;
    description: string;
    href: string;
  };
  bottom: React.ReactElement;
  inView?: boolean;
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
        height: '100%',
        textDecorationLine: 'none',
        display: 'flex',
        flexDirection: 'column',
        '& svg': {
          transition: '0.2s',
        },
        '&:hover': {
          '& svg': {
            transform: 'translateY(-3px)',
          },
        },
      }}
    >
      <Box sx={{ p: 2, display: 'flex', mb: 'auto' }}>
        <Avatar
          {...(inView && { src: item.src, srcSet: item.srcSet, alt: `${item.name} logo` })}
          sx={{ borderRadius: '4px' }}
        />
        <Box sx={{ ml: 2 }}>
          <Typography variant="body2" fontWeight="bold">
            {item.name}{' '}
            <LaunchRounded
              color="primary"
              sx={{ fontSize: 14, verticalAlign: 'middle', ml: 0.5 }}
            />
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.description}
          </Typography>
        </Box>
      </Box>
      {/* {bottom} */}
    </Paper>
  );
}
