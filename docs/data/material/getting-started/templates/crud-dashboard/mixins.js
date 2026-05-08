export function getDrawerSxTransitionMixin(isExpanded, property) {
  return (theme) =>
    theme.transitions.createStyles(property, {
      easing: theme.transitions.easing.sharp,
      duration: isExpanded
        ? theme.transitions.duration.enteringScreen
        : theme.transitions.duration.leavingScreen,
    });
}
