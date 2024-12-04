import * as React from 'react';
import Badge from '@mui/joy/Badge';
import Box from '@mui/joy/Box';
import Switch from '@mui/joy/Switch';
import Typography from '@mui/joy/Typography';

export default function BadgeVisibility() {
  const [invisible, setInvisible] = React.useState(false);
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        minWidth: 200,
        justifyContent: 'space-between',
      }}
    >
      <Badge badgeContent={12} invisible={invisible}>
        <Typography sx={{ fontSize: 'xl' }}>🛍</Typography>
      </Badge>
      <Switch
        startDecorator="invisible"
        checked={invisible}
        onChange={(event) => setInvisible(event.target.checked)}
        variant={invisible ? 'solid' : 'outlined'}
      />
    </Box>
  );
}
