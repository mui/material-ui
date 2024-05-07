<Box
  sx={theme => ({
    backgroundImage: "var(--items-imageDark)",
    ...theme.applyStyles("light", {
      backgroundImage: "var(--items-imageLight)"
    })
  })}
  style={{
    "--items-imageLight": items[selectedItemIndex].imageLight,
    "--items-imageDark": items[selectedItemIndex].imageDark
  }} />;

<Box
  style={{
    ...props.style,
    "--items-imageLight": items[selectedItemIndex].imageLight,
    "--items-imageDark": items[selectedItemIndex].imageDark
  }}
  sx={theme => ({
    backgroundImage: "var(--items-imageDark)",
    ...theme.applyStyles("light", {
      backgroundImage: "var(--items-imageLight)"
    })
  })}
/>;

<Box
  style={{
    color: 'red',
    ...props.style,
    "--items-imageLight": items[selectedItemIndex].imageLight,
    "--items-imageDark": items[selectedItemIndex].imageDark
  }}
  sx={theme => ({
    backgroundImage: "var(--items-imageDark)",
    ...theme.applyStyles("light", {
      backgroundImage: "var(--items-imageLight)"
    })
  })}
/>;

<Box
  {...props}
  sx={theme => ({
    backgroundImage: "var(--items-imageDark)",
    ...theme.applyStyles("light", {
      backgroundImage: "var(--items-imageLight)"
    })
  })}
  style={{
    ...props.style,
    "--items-imageLight": items[selectedItemIndex].imageLight,
    "--items-imageDark": items[selectedItemIndex].imageDark
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
