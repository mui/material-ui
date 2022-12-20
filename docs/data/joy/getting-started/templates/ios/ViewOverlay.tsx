import * as React from 'react';
import Box, { BoxProps } from '@mui/joy/Box';

export default function ViewOverlay({
  name,
  sx,
  ...props
}: BoxProps & { name?: string }) {
  return (
    <Box
      {...props}
      sx={[
        (theme) => ({
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'rgba(0 0 0 / 0.2)',
          [theme.getColorSchemeSelector('dark')]: {
            bgcolor: 'rgba(0 0 0 / 0.6)',
          },
          ...(name && {
            marginTop: '24px',
            position: 'relative',
            '&:before': {
              content: `'${name}'`,
              color: theme.vars.palette.info.plainColor,
              fontFamily: theme.vars.fontFamily.body,
              display: 'block',
              position: 'absolute',
              top: 0,
              transform: 'translateY(-100%)',
              letterSpacing: '0.1px',
              padding: '4px 6px',
              ...theme.typography.caption1,
            },
          }),
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  );
}
