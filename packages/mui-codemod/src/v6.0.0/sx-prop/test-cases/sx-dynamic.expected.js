<Box
  sx={theme => ({
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
  })}
></Box>;

<Card
  sx={[(theme) => ({
    p: 2,
    display: 'flex',
    flexDirection: 'column',
    gap: 4
  }), tier.title === 'Professional' && (theme => ({
    border: 'none',
    boxShadow:
      `0 8px 12px hsla(0, 0%, 0%, 0.8)`,
    background: 'radial-gradient(circle at 50% 0%, hsl(210, 98%, 35%), hsl(210, 100%, 16%))',
    ...theme.applyStyles("light", {
      boxShadow: `0 8px 12px hsla(210, 98%, 42%, 0.2)`
    })
  }))]}
></Card>;
