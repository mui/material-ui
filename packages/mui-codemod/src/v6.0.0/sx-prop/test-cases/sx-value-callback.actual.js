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

<Paper
  elevation={0}
  sx={theme => ({
    display: 'flex',
    border: `1px solid ${theme.palette.divider}`,
    flexWrap: 'wrap'
  })}
></Paper>;

<Divider
  sx={theme => ({
    border: `1px solid ${'#000'}`,
    ...theme.applyStyles("dark", {
      border: `1px solid ${'#fff'}`
    })
  })}
/>;

<Typography
  component="span"
  variant="subtitle1"
  color="inherit"
  sx={theme => ({
    position: 'relative',
    p: 4,
    pt: 2,
    pb: `calc(${theme.spacing(1)} + 6px)`
  })}
>
  {image.title}
  <ImageMarked className="MuiImageMarked-root" />
</Typography>;
