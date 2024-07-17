const Component = styled.div(({
  theme
}) => ({
  ...theme.typography.caption,
  variants: [{
    props: {
      size: 'small'
    },
    style: {
      marginTop: (theme.vars || theme).spacing(1),
      color: theme.palette.primary.main,
      ...theme.applyStyles("dark", {
        color: theme.palette.primary.light
      })
    }
  }]
}));
