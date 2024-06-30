import * as React from 'react';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Stack from '@mui/joy/Stack';
import Switch from '@mui/joy/Switch';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';

export default function IconButtons() {
  const [disabled, setDisabled] = React.useState(false);
  return (
    <Stack spacing={3} sx={{ alignItems: 'center' }}>
      <FormControl orientation="horizontal">
        <FormLabel>Disabled</FormLabel>
        <Switch
          checked={disabled}
          onChange={(event) => setDisabled(event.target.checked)}
        />
      </FormControl>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
        <IconButton disabled={disabled} variant="solid">
          <FavoriteBorder />
        </IconButton>
        <IconButton disabled={disabled} variant="soft">
          <FavoriteBorder />
        </IconButton>
        <IconButton disabled={disabled} variant="outlined">
          <FavoriteBorder />
        </IconButton>
        <IconButton disabled={disabled} variant="plain">
          <FavoriteBorder />
        </IconButton>
      </Box>
    </Stack>
  );
}
