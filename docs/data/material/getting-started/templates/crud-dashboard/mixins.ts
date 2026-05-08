import { type Theme, type SxProps } from '@mui/material/styles';

export function getDrawerSxTransitionMixin(isExpanded: boolean, property: string): SxProps<Theme> {
  return (theme: Theme) =>
    theme.transitions.createStyles(property, {
      easing: theme.transitions.easing.sharp,
      duration: isExpanded
        ? theme.transitions.duration.enteringScreen
        : theme.transitions.duration.leavingScreen,
    });
}
