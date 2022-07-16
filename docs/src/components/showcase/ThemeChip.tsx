import * as React from 'react';
import Chip, { chipClasses } from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function ThemeChip() {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={(theme) => ({
        [`& .${chipClasses.label}`]: {
          marginBottom: '1px',
          fontSize: '0.875rem',
          lineHeight: 1.5,
          fontWeight: 700,
        },
        [`& .${chipClasses.filled}`]: {
          color: 'grey.800',
          bgcolor: 'grey.200',
          [theme.getColorSchemeSelector('dark')]: {
            color: '#fff',
            bgcolor: 'grey.900',
          },
          [`&.${chipClasses.colorPrimary}`]: {
            bgcolor: 'primary.100',
            color: 'primary.500',
          },
        },
        [`& .${chipClasses.deleteIcon}`]: {
          color: 'grey.700',
          '&:hover': {
            color: 'grey.800',
            [theme.getColorSchemeSelector('dark')]: {
              color: 'grey.500',
            },
          },
        },
        [`& .${chipClasses.deleteIconColorPrimary}`]: {
          color: 'primary.500',
          '&:hover': {
            color: 'primary.700',
          },
        },
      })}
    >
      <Chip label="React" color="primary" onDelete={() => {}} />
      <Chip label="Javascript" onDelete={() => {}} />
    </Stack>
  );
}
