import autoPrefix from '../auto-prefix';

export default function(muiTheme) {
  if (muiTheme.userAgent !== false) {
    const prefixer = autoPrefix.getTransform(muiTheme.userAgent);

    return (style) => prefixer.prefix(style);
  }
}
