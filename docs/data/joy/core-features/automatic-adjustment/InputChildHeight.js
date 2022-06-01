import * as React from 'react';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';

import Send from '@mui/icons-material/SendRounded';

export default function InputIntegration() {
  return (
    <Input
      size="lg"
      placeholder="yourname@mui.com"
      endDecorator={
        <Button size="sm" endIcon={<Send />} sx={{ boxShadow: 'sm' }}>
          Subscribe
        </Button>
      }
      sx={{ '--Input-radius': '16px', '--Input-decorator-childHeight': '32px' }}
    />
  );
}
