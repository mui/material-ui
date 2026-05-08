import { type Theme } from '@mui/material/styles';

export function getDrawerSxTransitionMixin(isExpanded: boolean, property: string) {
  return (theme: Theme) =>
    theme.transitions.createStyles(property, {
      easing: theme.transitions.easing.sharp,
      duration: isExpanded
        ? theme.transitions.duration.enteringScreen
        : theme.transitions.duration.leavingScreen,
    });
}
