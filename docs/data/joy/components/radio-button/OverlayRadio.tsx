import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';

export default function OverlayRadio() {
  return (
    <FormControl>
      <FormLabel>Members</FormLabel>
      <RadioGroup
        overlay
        name="member"
        defaultValue="person1"
        orientation="horizontal"
        sx={{ gap: 2, mt: 1 }}
      >
        {[1, 2, 3].map((num) => (
          <Sheet
            component="label"
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
              value={`person${num}`}
              sx={{
                mt: -1,
                mr: -1,
                mb: 0.5,
                alignSelf: 'flex-end',
                '--Radio-actionRadius': (theme) => theme.vars.radius.md,
              }}
            />
            <Avatar alt={`person${num}`} src={`/static/images/avatar/${num}.jpg`} />
            <Typography level="body2">Person {num}</Typography>
          </Sheet>
        ))}
      </RadioGroup>
    </FormControl>
  );
}
