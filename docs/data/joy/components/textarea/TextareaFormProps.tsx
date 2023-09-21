import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Textarea from '@mui/joy/Textarea';

export default function TextareaFormProps() {
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
        <Textarea
          placeholder="Try to submit with no text!"
          required
          sx={{ mb: 1 }}
        />
        <Textarea placeholder="It is disabled" disabled sx={{ mb: 1 }} />
        <Button type="submit">Submit</Button>
      </form>
    </Box>
  );
}
