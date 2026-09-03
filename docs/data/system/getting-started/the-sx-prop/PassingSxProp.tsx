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
        // SxProps (typeof sx) can be an array so we use the `.flat()` array method, which inlines `sx` whether it is a single style or an array of styles.
        sx,
      ].flat()}
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
