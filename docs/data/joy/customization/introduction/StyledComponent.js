import * as React from 'react';
import { styled } from '@mui/joy/styles';

const ToggleButtonGroup = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: '4px',
  padding: '4px',
  borderRadius: theme.vars.radius.sm,
  ...theme.variants.soft.neutral,
  ...theme.variants.outlined.neutral,
}));

const ToggleButton = styled('button')(({ theme, 'aria-pressed': pressed }) => ({
  padding: '0.5rem 1rem',
  borderRadius: theme.vars.radius.xs,
  display: 'inline-flex',
  minHeight: 40,
  fontFamily: theme.vars.fontFamily.body,
  fontSize: theme.vars.fontSize.md,
  fontWeight: theme.vars.fontWeight.md,
  alignItems: 'center',
  backgroundColor: 'initial',
  border: '1px solid transparent',
  ...(!pressed && {
    '&:hover': theme.variants.plainHover.neutral,
    '&:active': theme.variants.plainActive.neutral,
  }),
  ...(pressed && {
    ...theme.variants.outlined.neutral,
    color: theme.vars.palette.primary.plainColor,
    backgroundColor: theme.vars.palette.background.body,
  }),
}));

export default function StyledComponent() {
  const [index, setIndex] = React.useState(0);
  return (
    <ToggleButtonGroup sx={{ minWidth: 200 }}>
      <ToggleButton
        aria-pressed={index === 0 ? 'true' : undefined}
        onClick={() => setIndex(0)}
        sx={{ flexGrow: 1 }}
      >
        Pressed
      </ToggleButton>
      <ToggleButton
        aria-pressed={index === 1 ? 'true' : undefined}
        onClick={() => setIndex(1)}
        sx={{ flexGrow: 1 }}
      >
        Initial
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
