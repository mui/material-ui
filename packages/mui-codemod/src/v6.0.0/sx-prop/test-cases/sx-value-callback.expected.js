function FacebookCircularProgress(props) {
  return (
    (<Box sx={{ position: 'relative' }}>
      <CircularProgress
        variant="determinate"
        sx={theme => ({
          color: theme.palette.grey[800],
          ...theme.applyStyles("light", {
            color: theme.palette.grey[200]
          })
        })}
        size={40}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={theme => ({
          color: '#308fe8',
          animationDuration: '550ms',
          position: 'absolute',
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
          ...theme.applyStyles("light", {
            color: '#1a90ff'
          })
        })}
        size={40}
        thickness={4}
        {...props}
      />
    </Box>)
  );
}
