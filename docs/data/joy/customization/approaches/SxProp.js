import * as React from 'react';
import Button from '@mui/joy/Button';

export default function SxProp() {
  return (
    <Button
      size="md"
      sx={(theme) => ({
        background: `linear-gradient(-45deg, ${theme.vars.palette.primary[700]}, ${theme.vars.palette.primary[600]})`,
        boxShadow: 'inset 0px 2px 2px rgba(255, 255, 255, 0.3)',
        borderRadius: 'md',
        fontWeight: 'lg', // short-hand syntax, same as `theme.fontWeight.lg`
        '&:hover': {
          background: `${theme.vars.palette.primary[700]}`,
          boxShadow: 'inset 0px 0px 4px rgba(0, 0, 0, 0.3)',
        },
      })}
    >
      This is a call to action
    </Button>
  );
}
