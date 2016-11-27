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
    return (style) => {
      const isFlex = ['flex', 'inline-flex'].includes(style.display);
      const o = InlineStylePrefixer.prefixAll(style);
      if (isFlex) {
        o.display = o.display.join('; display: ');
      }
      return o;
    };
  } else {
    const prefixer = new InlineStylePrefixer({
      userAgent: userAgent,
    });

    return (style) => prefixer.prefix(style);
  }
}
