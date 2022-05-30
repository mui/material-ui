import * as React from 'react';
import { styled } from '@mui/joy/styles';
import VolumeUp from '@mui/icons-material/VolumeUp';
import VolumeOff from '@mui/icons-material/VolumeOff';

const ToggleButton = styled('button')(
  ({ theme, 'aria-pressed': pressed = 'false' }) => ({
    padding: '0.5rem 1rem',
    borderRadius: theme.vars.radius.xs,
    display: 'inline-flex',
    justifyContent: 'center',
    gap: '8px',
    minHeight: 40,
    fontFamily: theme.vars.fontFamily.body,
    fontSize: theme.vars.fontSize.md,
    fontWeight: theme.vars.fontWeight.md,
    alignItems: 'center',
    border: '1px solid transparent',
    backgroundColor: theme.vars.palette.background.body,
    boxShadow: theme.vars.shadow.sm,
    [theme.focus.selector]: theme.focus.default,
    ...theme.variants.plain.neutral,
    ...(pressed === 'false' && {
      '&:hover': theme.variants.plainHover.neutral,
      '&:active': theme.variants.plainActive.neutral,
    }),
    ...(pressed === 'true' && {
      border: '1px solid',
      borderColor: theme.vars.palette.neutral.outlinedBorder,
      color: theme.vars.palette.primary.plainColor,
      backgroundColor: theme.vars.palette.background.body,
      boxShadow: theme.shadow.sm.replace(/,/g, ', inset'),
    }),
  }),
);

export default function StyledComponent() {
  const [muted, setMuted] = React.useState(false);
  return (
    <ToggleButton
      aria-pressed={muted ? 'true' : 'false'}
      onClick={() => setMuted((bool) => !bool)}
      sx={{ minWidth: 120 }}
    >
      Mute {muted ? <VolumeOff /> : <VolumeUp />}
    </ToggleButton>
  );
}
