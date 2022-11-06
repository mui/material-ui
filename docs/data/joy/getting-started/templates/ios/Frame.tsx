import * as React from 'react';
import Sheet, { SheetProps } from '@mui/joy/Sheet';

export default function Frame({
  name,
  sx,
  ...props
}: SheetProps & { name: string }) {
  return (
    <Sheet
      {...props}
      sx={[
        (theme) => ({
          marginTop: '24px',
          '&:before': {
            content: `'${name}'`,
            color: theme.vars.palette.info.plainColor,
            display: 'block',
            position: 'absolute',
            top: 0,
            transform: 'translateY(-100%)',
            letterSpacing: '0.1px',
            padding: '4px 6px',
            ...theme.typography.caption1,
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  );
}
