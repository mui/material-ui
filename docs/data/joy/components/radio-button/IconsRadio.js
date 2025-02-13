import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import FormLabel from '@mui/joy/FormLabel';
import Radio, { radioClasses } from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Sheet from '@mui/joy/Sheet';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

export default function IconsRadio() {
  return (
    <RadioGroup
      aria-label="platform"
      defaultValue="Website"
      overlay
      name="platform"
      sx={{
        flexDirection: 'row',
        gap: 2,
        [`& .${radioClasses.checked}`]: {
          [`& .${radioClasses.action}`]: {
            inset: -1,
            border: '3px solid',
            borderColor: 'primary.500',
          },
        },
        [`& .${radioClasses.radio}`]: {
          display: 'contents',
          '& > svg': {
            zIndex: 2,
            position: 'absolute',
            top: '-8px',
            right: '-8px',
            bgcolor: 'background.surface',
            borderRadius: '50%',
          },
        },
      }}
    >
      {['Website', 'Documents', 'Social Account'].map((value) => (
        <Sheet
          key={value}
          variant="outlined"
          sx={{
            borderRadius: 'md',
            boxShadow: 'sm',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1.5,
            p: 2,
            minWidth: 120,
          }}
        >
          <Radio id={value} value={value} checkedIcon={<CheckCircleRoundedIcon />} />
          <Avatar variant="soft" size="sm" />
          <FormLabel htmlFor={value}>{value}</FormLabel>
        </Sheet>
      ))}
    </RadioGroup>
  );
}
