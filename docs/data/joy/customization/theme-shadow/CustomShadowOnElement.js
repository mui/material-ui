import * as React from 'react';
import Button from '@mui/joy/Button';

export default function CustomShadowOnElement() {
  return (
    <Button
      size="lg"
      sx={(theme) => ({
        boxShadow: theme.shadow.md,
        '--joy-shadowChannel': theme.vars.palette.primary.mainChannel,
        '--joy-shadowRing': 'inset 0 -3px 0 rgba(0 0 0 / 0.24)',
        '&:hover': {
          boxShadow: theme.shadow.lg,
          transform: 'translateY(-3px)',
        },
        '&:active': {
          transform: 'translateY(0px)',
          '--joy-shadowRing': '0 0 #000',
        },
      })}
    >
      Button
    </Button>
  );
}
