import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Input from '@mui/joy/Input';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function VariantColorJoy() {
  return (
    <CssVarsProvider>
      <Stack spacing={2}>
        <Input
          size="lg"
          endDecorator={
            <IconButton>
              <VisibilityIcon />
            </IconButton>
          }
        />
        <Input
          size="lg"
          endDecorator={
            <IconButton size="sm">
              <VisibilityIcon />
            </IconButton>
          }
        />
      </Stack>
    </CssVarsProvider>
  );
}
