let warnedOnce = false;

// To remove in v6
export default function createStyles(styles) {
  if (!warnedOnce) {
    console.warn(
      [
        'Material-UI: createStyles from @material-ui/core/styles is deprecated.',
        'Please use @material-ui/styles/createStyles',
      ].join('\n'),
    );

    warnedOnce = true;
  }
  return styles;
}
