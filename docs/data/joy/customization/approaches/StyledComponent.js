import * as React from 'react';
import { styled } from '@mui/joy/styles';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import VolumeOffRoundedIcon from '@mui/icons-material/VolumeOffRounded';

const ToggleButton = styled('button')(({ theme }) => ({
  padding: '0.5rem 1rem',
  borderRadius: theme.vars.radius.sm,
  display: 'inline-flex',
  justifyContent: 'center',
  gap: '8px',
  minHeight: 40,
  fontFamily: theme.vars.fontFamily.body,
  fontSize: theme.vars.fontSize.md,
  fontWeight: theme.vars.fontWeight.md,
  alignItems: 'center',
  border: '1px solid',
  borderColor: theme.vars.palette.neutral.outlinedBorder,
  backgroundColor: theme.vars.palette.background.body,
  boxShadow: theme.vars.shadow.md,
  [theme.focus.selector]: theme.focus.default,
  ...theme.variants.plain.neutral,
  variants: [
    {
      props: { 'aria-pressed': 'false' },
      style: {
        '&:hover': theme.variants.plainHover.neutral,
        '&:active': theme.variants.plainActive.neutral,
      },
    },
    {
      props: { 'aria-pressed': 'true' },
      style: {
        color: theme.vars.palette.danger.plainColor,
        backgroundColor: theme.vars.palette.background.body,
        boxShadow: theme.shadow.sm.replace(/,/g, ', inset'),
      },
    },
  ],
}));

export default function StyledComponent() {
  const [muted, setMuted] = React.useState(false);
  return (
    <ToggleButton
      aria-pressed={muted ? 'true' : 'false'}
      onClick={() => setMuted((bool) => !bool)}
      sx={{ minWidth: 120 }}
    >
      Mute {muted ? <VolumeOffRoundedIcon /> : <VolumeUpRoundedIcon />}
    </ToggleButton>
  );
}
