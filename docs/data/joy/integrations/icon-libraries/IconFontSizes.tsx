import * as React from 'react';
import { FontSize, useTheme } from '@mui/joy/styles';
import Stack from '@mui/joy/Stack';
import Person from '@mui/icons-material/Person';

export default function IconFontSizes() {
  const theme = useTheme();
  return (
    <Stack
      spacing={2}
      direction="row"
      sx={{ gridColumn: '1 / -1', alignItems: 'center', justifyContent: 'center' }}
    >
      {(Object.keys(theme.fontSize) as (keyof FontSize)[]).map((size) => (
        <Person key={size} fontSize={size} />
      ))}
    </Stack>
  );
}
