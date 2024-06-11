function FacebookCircularProgress(props) {
  return (
    <Box sx={{ position: 'relative' }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) => theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        }}
        size={40}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: (theme) => (theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'),
          animationDuration: '550ms',
          position: 'absolute',
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
        }}
        size={40}
        thickness={4}
        {...props}
      />
    </Box>
  );
}

<Paper
  elevation={0}
  sx={{
    display: 'flex',
    border: (theme) => `1px solid ${theme.palette.divider}`,
    flexWrap: 'wrap',
  }}
></Paper>;

<Divider
  sx={{ border: (theme) => `1px solid ${theme.palette.mode === 'dark' ? '#fff' : '#000'}` }}
/>;

<Typography
  component="span"
  variant="subtitle1"
  color="inherit"
  sx={{
    position: 'relative',
    p: 4,
    pt: 2,
    pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
  }}
>
  {image.title}
  <ImageMarked className="MuiImageMarked-root" />
</Typography>;

<Autocomplete
  sx={{
    display: 'inline-block',
    '& input': {
      width: 200,
      bgcolor: 'background.paper',
      color: (theme) => theme.palette.getContrastText(theme.palette.background.paper),
    },
  }}
  id="custom-input-demo"
  options={options}
  renderInput={(params) => (
    <div ref={params.InputProps.ref}>
      <input type="text" {...params.inputProps} />
    </div>
  )}
/>;

<Box
  sx={{
    position: 'relative',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: (theme) => theme.shadows[5],
    p: 4,
  }}
></Box>;

<Backdrop
  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  open={open}
  onClick={handleClose}
>
  <CircularProgress color="inherit" />
</Backdrop>;
