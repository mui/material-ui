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
    "--items-imageLight": items[selectedItemIndex].imageLight,
    "--items-imageDark": items[selectedItemIndex].imageDark,
    ...props.style
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
    "--items-imageLight": items[selectedItemIndex].imageLight,
    "--items-imageDark": items[selectedItemIndex].imageDark,
    color: 'red',
    ...props.style
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
    "--items-imageLight": items[selectedItemIndex].imageLight,
    "--items-imageDark": items[selectedItemIndex].imageDark,
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
