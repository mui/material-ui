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

  const isServer = typeof window === 'undefined';

  if (userAgent === false) { // Disabled autoprefixer
    return null;
  } else if (userAgent === 'all' || userAgent === undefined) { // Prefix for all user agent
    return (style) => {
      let isFlex = false;

      if (isServer) {
        isFlex = ['flex', 'inline-flex'].includes(style.display);
      }

      const stylePrefixed = InlineStylePrefixer.prefixAll(style);

      // We can't apply this join with react-dom:
      // #https://github.com/facebook/react/issues/6467
      if (isFlex) {
        stylePrefixed.display = stylePrefixed.display.join('; display: ');
      }

      return stylePrefixed;
    };
  } else {
    const prefixer = new InlineStylePrefixer({
      userAgent: userAgent,
    });

    return (style) => prefixer.prefix(style);
  }
}
