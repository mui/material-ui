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
