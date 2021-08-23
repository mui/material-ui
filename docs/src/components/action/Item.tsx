import * as React from 'react';
import { useTheme } from '@material-ui/core/styles';
import Box, { BoxProps } from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

export function Group({ desktopColumns = 1, ...props }: { desktopColumns?: number } & BoxProps) {
  const theme = useTheme();
  return (
    <Box
      {...props}
      sx={{
        maxWidth: { md: 500 },
        overflow: 'auto',
        display: 'grid',
        gap: 1,
        gridTemplateColumns: `repeat(${desktopColumns}, 1fr)`,
        '& > *': {
          minWidth: {
            xs: desktopColumns === 1 ? 300 : 225,
            sm: desktopColumns === 1 ? 400 : 225,
            md: 'auto',
          },
          gridRow: { xs: 1, md: 'auto' },
        },
        [theme.breakpoints.down('md')]: {
          mx: -3,
          px: 3,
          mb: -1.5,
          pb: 2,
          scrollSnapType: 'inline mandatory',
          scrollPaddingLeft: 30,
          scrollPaddingRight: 30,
          '& > *': {
            scrollSnapAlign: 'start',
          },
          '& > *:last-child': {
            position: 'relative',
            '&:after': {
              // to create scroll spacing on the right edge
              content: '""',
              position: 'absolute',
              blockSize: '100%',
              inlineSize: 30,
              insetBlockStart: 0,
              insetInlineEnd: -30,
            },
          },
        },
        [theme.breakpoints.down('sm')]: {
          mx: -2,
          px: 2,
          scrollPaddingLeft: 20,
          scrollPaddingRight: 20,
          '& > *:last-child:after': {
            inlineSize: 20,
            insetBlockStart: 0,
            insetInlineEnd: -20,
          },
        },
        ...props.sx,
      }}
    />
  );
}

export default function Item({
  icon,
  title,
  description,
  ...props
}: {
  icon: React.ReactNode;
  title: string;
  description?: string;
} & BoxProps) {
  return (
    <Box
      {...props}
      component="span"
      sx={{
        p: 2,
        display: 'flex',
        alignItems: 'center',
        ...props.sx,
      }}
    >
      {icon}
      <Typography
        component="span"
        color="text.primary"
        sx={{ ml: 2 }}
        variant="body2"
        fontWeight="bold"
      >
        {title}
      </Typography>
    </Box>
  );
}
