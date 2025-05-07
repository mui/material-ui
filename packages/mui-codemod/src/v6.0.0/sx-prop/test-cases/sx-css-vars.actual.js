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

<Chip
  size="sm"
  variant="outlined"
  color={colors[data.role]}
  sx={{
    ml: 'auto',
    borderRadius: '2px',
    minHeight: '20px',
    paddingInline: '4px',
    fontSize: 'xs',
    bgcolor: `${colors[data.role]}.softBg`,
  }}
>
  {data.role}
</Chip>;
