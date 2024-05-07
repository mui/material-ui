<Box
  sx={[theme => ({
    mb: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 2,
    backgroundColor: theme.palette.grey[900],
    borderBottom: `1px solid ${'grey.800'}`,
    ...theme.applyStyles("light", {
      backgroundColor: theme.palette.grey[100],
      borderBottom: `1px solid ${'grey.200'}`
    })
  }), tier.title === 'Professional' ? {
    color: 'grey.100'
  } : {
    color: ''
  }]}
></Box>;
