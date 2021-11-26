import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import FormLabel from '@mui/material/FormLabel';
import { SxProps, Theme } from '@mui/material/styles';

interface ListHeaderProps {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

const ListHeader = ({ sx = [], children }: ListHeaderProps) => (
  <ListItem
    sx={[
      {
        width: 'auto',
        textDecoration: 'underline',
      },
      // `SxProps` type can be an array, spreading `sx` directly will give you type error.
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
  >
    <FormLabel sx={{ color: 'inherit' }}>{children}</FormLabel>
  </ListItem>
);

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
