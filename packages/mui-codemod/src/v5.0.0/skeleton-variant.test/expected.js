<div>
  <Skeleton variant="circular" />
  <Skeleton variant="rectangular" />
  <Skeleton classes={{ circular: 'className', rectangular: 'className' }} />
  <Box
    sx={{
      '& .MuiSkeleton-circular': {
        background: 'red',
      },
      '& .MuiSkeleton-rectangular': {
        background: 'red',
      },
      '& .CustomSkeleton-circle': {
        background: 'red',
      },
    }}
  />
</div>;
