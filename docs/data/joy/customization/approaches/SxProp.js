import * as React from 'react';
import Button from '@mui/joy/Button';

export default function SxProp() {
  return (
    <Button
      size="md"
      sx={(theme) => ({
        background: `linear-gradient(-45deg, ${theme.vars.palette.primary[800]}, ${theme.vars.palette.primary[500]})`,
        fontWeight: 'lg', // short-hand syntax, same as `theme.fontWeight.lg`
        '&:hover': {
          background: `linear-gradient(-45deg, ${theme.vars.palette.primary[900]}, ${theme.vars.palette.primary[600]})`,
        },
      })}
    >
      This is a call to action
    </Button>
  );
}
