import * as React from 'react';
import Box from '@mui/joy/Box';
import TextField from '@mui/joy/TextField';
import Chip from '@mui/joy/Chip';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';

export default function TextFieldDecorator() {
  return (
    <Box sx={{ p: 4 }}>
      <TextField
        label="Label"
        placeholder="Type in here..."
        startDecorator={<PersonRoundedIcon fontSize="small" />}
        endDecorator={
          <Chip size="sm" variant="soft">
            New stuff
          </Chip>
        }
      />
    </Box>
  );
}
