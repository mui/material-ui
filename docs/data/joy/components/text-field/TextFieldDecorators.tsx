import * as React from 'react';
import Stack from '@mui/joy/Stack';
import TextField from '@mui/joy/TextField';
import Chip from '@mui/joy/Chip';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';

export default function TextFieldDecorator() {
  return (
    <Stack direction="column" spacing={2}>
      <TextField
        label="Label"
        placeholder="Type in here…"
        startDecorator={<PersonRoundedIcon />}
        endDecorator={
          <Chip size="sm" variant="soft">
            New stuff
          </Chip>
        }
      />
      <TextField
        disabled
        label="Label"
        placeholder="I am disabled."
        startDecorator={<EditIcon />}
        endDecorator={<CheckIcon />}
      />
    </Stack>
  );
}
