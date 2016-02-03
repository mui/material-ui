import InlineStylePrefixer from 'inline-style-prefixer';
import warning from 'warning';

let hasWarnedAboutUserAgent = false;

export default function(muiTheme) {
  let userAgent = muiTheme.userAgent;

  if (userAgent === undefined && typeof navigator !== 'undefined') {
    userAgent = navigator.userAgent;
  }

  if (userAgent === undefined && !hasWarnedAboutUserAgent) {
    warning(false, `Material-UI: userAgent should be supplied in the muiTheme context
      for server-side rendering.`);

    hasWarnedAboutUserAgent = true;
  }

  if (userAgent === false) { // Disabled autoprefixer
    return null;
  } else if (userAgent === 'all' || userAgent === undefined) { // Prefix for all user agent
    return (style) => InlineStylePrefixer.prefixAll(style);
  } else {
    const prefixer = new InlineStylePrefixer({
      userAgent: userAgent,
    });

    return (style) => prefixer.prefix(style);
  }
}
