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
