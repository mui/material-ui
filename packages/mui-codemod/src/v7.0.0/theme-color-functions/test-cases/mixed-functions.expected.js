const ComplexComponent = styled('div')(({ theme }) => ({
  backgroundColor: theme.alpha((theme.vars || theme).palette.primary.main, 0.1),
  border: `2px solid ${theme.lighten(theme.palette.primary.main, 0.5)}`,
  '&:hover': {
    backgroundColor: theme.alpha((theme.vars || theme).palette.primary.main, 0.2),
    borderColor: theme.darken(theme.palette.primary.main, 0.2),
  },
  '&:active': {
    backgroundColor: theme.darken(theme.palette.primary.dark, 0.1),
    color: theme.lighten(theme.palette.primary.contrastText, 0.3),
  },
}));