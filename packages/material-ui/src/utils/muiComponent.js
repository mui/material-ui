export default function muiComponent(useStyles, Component) {
  Component.displayName = useStyles.options.name;

  if (process.env.NODE_ENV !== 'production') {
    // For the unit tests
    Component.useStyles = useStyles;

    // For the markdown generation
    Component.stylesOrCreator = useStyles.stylesOrCreator;
    Component.options = useStyles.options;
  }

  return Component;
}
