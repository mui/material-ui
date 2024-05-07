<Box
  sx={{
    mb: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 2,
    color: tier.title === 'Professional' ? 'grey.100' : '',
    backgroundColor: (theme) =>
      theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
    borderBottom: (theme) =>
      `1px solid ${theme.palette.mode === 'light' ? 'grey.200' : 'grey.800'}`,
  }}
></Box>;

<Card
  sx={(theme) => ({
    p: 2,
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    ...(tier.title === 'Professional' && {
      border: 'none',
      boxShadow:
        theme.palette.mode === 'light'
          ? `0 8px 12px hsla(210, 98%, 42%, 0.2)`
          : `0 8px 12px hsla(0, 0%, 0%, 0.8)`,
      background: 'radial-gradient(circle at 50% 0%, hsl(210, 98%, 35%), hsl(210, 100%, 16%))',
    }),
  })}
></Card>;
