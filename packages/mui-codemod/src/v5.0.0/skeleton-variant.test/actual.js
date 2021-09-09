<div>
  <Skeleton variant="circle" />
  <Skeleton variant="rect" />
  <Skeleton classes={{ circle: 'className', rect: 'className' }} />
  <Box
    sx={{
      '& .MuiSkeleton-circle': {
        background: 'red',
      },
      '& .MuiSkeleton-rect': {
        background: 'red',
      },
      '& .CustomSkeleton-circle': {
        background: 'red',
      },
    }}
  />
</div>;
