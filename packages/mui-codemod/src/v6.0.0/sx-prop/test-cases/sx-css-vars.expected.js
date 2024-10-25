<Box
  sx={theme => ({
    backgroundImage: "var(--imageDark-items-selectedItemIndex)",
    ...theme.applyStyles("light", {
      backgroundImage: "var(--imageLight-items-selectedItemIndex)"
    })
  })}
  style={{
    "--imageLight-items-selectedItemIndex": items[selectedItemIndex].imageLight,
    "--imageDark-items-selectedItemIndex": items[selectedItemIndex].imageDark
  }} />;

<Box
  style={{
    "--imageLight-items-selectedItemIndex": items[selectedItemIndex].imageLight,
    "--imageDark-items-selectedItemIndex": items[selectedItemIndex].imageDark,
    ...props.style
  }}
  sx={theme => ({
    backgroundImage: "var(--imageDark-items-selectedItemIndex)",
    ...theme.applyStyles("light", {
      backgroundImage: "var(--imageLight-items-selectedItemIndex)"
    })
  })}
/>;

<Box
  style={{
    "--imageLight-items-selectedItemIndex": items[selectedItemIndex].imageLight,
    "--imageDark-items-selectedItemIndex": items[selectedItemIndex].imageDark,
    color: 'red',
    ...props.style
  }}
  sx={theme => ({
    backgroundImage: "var(--imageDark-items-selectedItemIndex)",
    ...theme.applyStyles("light", {
      backgroundImage: "var(--imageLight-items-selectedItemIndex)"
    })
  })}
/>;

<Box
  {...props}
  sx={theme => ({
    backgroundImage: "var(--imageDark-items-selectedItemIndex)",
    ...theme.applyStyles("light", {
      backgroundImage: "var(--imageLight-items-selectedItemIndex)"
    })
  })}
  style={{
    "--imageLight-items-selectedItemIndex": items[selectedItemIndex].imageLight,
    "--imageDark-items-selectedItemIndex": items[selectedItemIndex].imageDark,
    ...props.style
  }} />;

<Paper
  sx={{
    position: 'relative',
    backgroundColor: 'grey.800',
    color: '#fff',
    mb: 4,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundImage: `url(${"var(--post-image)"})`,
  }}
  style={{
    "--post-image": post.image
  }}></Paper>;

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
    bgcolor: `${"var(--colors-data-role)"}.softBg`,
  }}
  style={{
    "--colors-data-role": colors[data.role]
  }}>
  {data.role}
</Chip>;
