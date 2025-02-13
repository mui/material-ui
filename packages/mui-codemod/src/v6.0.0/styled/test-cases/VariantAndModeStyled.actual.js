const Component = styled.div(({ theme, ownerState }) => ({
  ...theme.typography.caption,
  ...(ownerState.size === 'small' && {
    marginTop: (theme.vars || theme).spacing(1),
    color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main,
  }),
}));
