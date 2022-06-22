import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import FormLabel from '@mui/joy/FormLabel';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';

export default function OverlayRadio() {
  return (
    <Box>
      <Typography id="member" mb={1}>
        Member
      </Typography>
      <RadioGroup overlay name="member" aria-labelledby="member" row sx={{ gap: 1 }}>
        {[1, 2, 3].map((num) => (
          <Sheet
            key={num}
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: 'sm',
              gap: 0.5,
            }}
          >
            <Radio
              id={`person${num}`}
              value={`person${num}`}
              sx={{
                mt: -1,
                mr: -1,
                mb: 1,
                alignSelf: 'flex-end',
                '--Radio-action-radius': '4px',
              }}
            />
            <Avatar src={`/static/images/avatar/${num}.jpg`} />
            <FormLabel htmlFor={`person${num}`}>Person {num}</FormLabel>
          </Sheet>
        ))}
      </RadioGroup>
    </Box>
  );
}
