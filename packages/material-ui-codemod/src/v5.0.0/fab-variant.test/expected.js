<div>
  <Fab variant="circular" />
  <Fab classes={{ circular: 'className' }} />
  <Box
    sx={{
      '& .MuiFab-circular': {
        background: 'red',
      },
      '& .CustomFab-round': {
        background: 'red',
      },
    }}
  />
</div>;
