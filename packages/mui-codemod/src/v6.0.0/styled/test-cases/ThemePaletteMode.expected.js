const Test = styled('div')(({ theme }) => ({
  color: theme.palette.primary.main,
  ...theme.applyStyles('dark', {
    color: theme.palette.primary.light
  })
}));
