import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';

export default function InputFormProps() {
  return (
    <Box
      sx={{
        py: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <Input
          placeholder="Try to submit with no text!"
          required
          sx={{ mb: 1, fontSize: 'var(--joy-fontSize-sm)' }}
        />
        <Input placeholder="It is disabled" disabled sx={{ mb: 1 }} />
        <Button type="submit">Submit</Button>
      </form>
    </Box>
  );
}
