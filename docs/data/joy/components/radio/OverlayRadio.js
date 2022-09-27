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
      <Typography
        id="member"
        mb={2}
        level="body3"
        textTransform="uppercase"
        fontWeight="xl"
        sx={{ letterSpacing: '0.15rem' }}
      >
        Members
      </Typography>
      <RadioGroup
        overlay
        name="member"
        aria-labelledby="member"
        defaultValue="person1"
        row
        sx={{ gap: 2 }}
      >
        {[1, 2, 3].map((num) => (
          <Sheet
            key={num}
            variant="outlined"
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
              boxShadow: 'sm',
              borderRadius: 'md',
              bgcolor: 'background.body',
              gap: 1.5,
            }}
          >
            <Radio
              id={`person${num}`}
              value={`person${num}`}
              sx={{
                mt: -1,
                mr: -1,
                mb: 0.5,
                alignSelf: 'flex-end',
                '--Radio-action-radius': (theme) => theme.vars.radius.md,
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
