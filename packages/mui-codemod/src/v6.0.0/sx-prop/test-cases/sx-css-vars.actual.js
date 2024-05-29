<Box
  sx={{
    backgroundImage: (theme) =>
      theme.palette.mode === 'light'
        ? items[selectedItemIndex].imageLight
        : items[selectedItemIndex].imageDark,
  }}
/>;

<Box
  style={props.style}
  sx={{
    backgroundImage: (theme) =>
      theme.palette.mode === 'light'
        ? items[selectedItemIndex].imageLight
        : items[selectedItemIndex].imageDark,
  }}
/>;

<Box
  style={{
    color: 'red',
    ...props.style,
  }}
  sx={{
    backgroundImage: (theme) =>
      theme.palette.mode === 'light'
        ? items[selectedItemIndex].imageLight
        : items[selectedItemIndex].imageDark,
  }}
/>;

<Box
  {...props}
  sx={{
    backgroundImage: (theme) =>
      theme.palette.mode === 'light'
        ? items[selectedItemIndex].imageLight
        : items[selectedItemIndex].imageDark,
  }}
/>;

<Paper
  sx={{
    position: 'relative',
    backgroundColor: 'grey.800',
    color: '#fff',
    mb: 4,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundImage: `url(${post.image})`,
  }}
></Paper>;
