const Component = styled('div')(({ theme }) => ({
  backgroundColor: theme.lighten(theme.palette.primary.main, 0.2),
  color: theme.lighten(theme.palette.text.primary, 0.5),
  border: `1px solid ${theme.lighten(theme.palette.divider, 0.1)}`,
  '&:hover': {
    backgroundColor: theme.lighten(theme.palette.primary.dark, 0.3),
  },
}));