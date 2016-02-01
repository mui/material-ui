export default function(muiTheme) {
  if (muiTheme.userAgent !== false) {
    return (style) => muiTheme.prefix(style);
  }
}
