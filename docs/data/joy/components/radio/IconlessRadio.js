import * as React from 'react';
import Box from '@mui/joy/Box';
import FormLabel from '@mui/joy/FormLabel';
import Radio, { radioClasses } from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Sheet from '@mui/joy/Sheet';

export default function IconlessRadio() {
  return (
    <Box sx={{ width: 300 }}>
      <FormLabel
        id="storage-label"
        sx={{
          mb: 2,
          fontWeight: 'xl',
          textTransform: 'uppercase',
          fontSize: 'xs',
          letterSpacing: '0.15rem',
        }}
      >
        Storage
      </FormLabel>
      <RadioGroup
        aria-labelledby="storage-label"
        defaultValue="512GB"
        size="lg"
        sx={{ gap: 1.5 }}
      >
        {['512GB', '1TB', '2TB'].map((value) => (
          <Sheet key={value} sx={{ p: 2, borderRadius: 'md' }}>
            <Radio
              label={`${value} SSD storage`}
              overlay
              disableIcon
              value={value}
              sx={(theme) => ({
                '& label': {
                  fontWeight: 'lg',
                  fontSize: 'md',
                  color: 'text.secondary',
                },
                [`&.${radioClasses.checked}`]: {
                  '& label': { color: 'text.primary' },
                  '--joy-palette-primary-outlinedBorder':
                    theme.vars.palette.primary[500],
                  '--joy-palette-primary-outlinedHoverBorder':
                    theme.vars.palette.primary[500],
                  [`& .${radioClasses.action}`]: {
                    '--variant-borderWidth': '2px',
                  },
                },
              })}
            />
          </Sheet>
        ))}
      </RadioGroup>
    </Box>
  );
}
