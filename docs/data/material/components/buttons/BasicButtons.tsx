import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Test from './Test';

export default function BasicButtons() {
  return (
    <Stack spacing={2} direction="row">
      {/* @highlight-start */}
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
      <Test />
      {/* @highlight-end */}
    </Stack>
  );
}
