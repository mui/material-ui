import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import FormLabel from '@mui/material/FormLabel';
import { SxProps, Theme } from '@mui/material/styles';

interface ListHeaderProps {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

function ListHeader({ sx = [], children }: ListHeaderProps) {
  return (
    <ListItem
      sx={[
        {
          width: 'auto',
          textDecoration: 'underline',
        },
        // You cannot spread `sx` directly because `SxProps` (typeof sx) can be an array.
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <FormLabel sx={{ color: 'inherit' }}>{children}</FormLabel>
    </ListItem>
  );
}

export default function PassingSxProp() {
  return (
    <ListHeader
      sx={(theme) => ({
        color: 'info.main',
        ...theme.typography.overline,
      })}
    >
      Header
    </ListHeader>
  );
}
