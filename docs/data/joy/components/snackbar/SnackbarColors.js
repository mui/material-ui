import * as React from 'react';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Snackbar from '@mui/joy/Snackbar';

export default function SnackbarColors() {
  const [open, setOpen] = React.useState(false);
  const [variant, setVariant] = React.useState('outlined');
  const [color, setColor] = React.useState('neutral');
  return (
    <Stack spacing={2} sx={{ alignItems: 'center' }}>
      <Select
        value={variant}
        onChange={(event, newValue) => setVariant(newValue)}
        sx={{ minWidth: 160 }}
      >
        <Option value="outlined">outlined</Option>
        <Option value="plain">plain</Option>
        <Option value="soft">soft</Option>
        <Option value="solid">solid</Option>
      </Select>
      <Stack spacing={1} direction="row">
        {['primary', 'neutral', 'danger', 'success', 'warning'].map(
          (currentColor) => (
            <Button
              key={currentColor}
              variant="soft"
              color={currentColor}
              size="sm"
              onClick={() => {
                setOpen(true);
                setColor(currentColor);
              }}
            >
              {currentColor}
            </Button>
          ),
        )}
      </Stack>
      <Snackbar
        autoHideDuration={4000}
        open={open}
        variant={variant}
        color={color}
        onClose={(event, reason) => {
          if (reason === 'clickaway') {
            return;
          }
          setOpen(false);
        }}
      >
        {variant} snackbar with {color} color.
      </Snackbar>
    </Stack>
  );
}
