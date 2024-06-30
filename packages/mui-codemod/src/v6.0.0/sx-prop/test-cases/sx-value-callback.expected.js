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

<Autocomplete
  sx={theme => ({
    display: 'inline-block',
    '& input': {
      width: 200,
      bgcolor: 'background.paper',
      color: theme.palette.getContrastText(theme.palette.background.paper),
    }
  })}
  id="custom-input-demo"
  options={options}
  renderInput={(params) => (
    <div ref={params.InputProps.ref}>
      <input type="text" {...params.inputProps} />
    </div>
  )}
/>;

<Box
  sx={theme => ({
    position: 'relative',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    p: 4
  })}
></Box>;

<Backdrop
  sx={theme => ({
    color: '#fff',
    zIndex: theme.zIndex.drawer + 1
  })}
  open={open}
  onClick={handleClose}
>
  <CircularProgress color="inherit" />
</Backdrop>;
