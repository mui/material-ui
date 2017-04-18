import createPrefixerStatic from 'inline-style-prefixer/static/createPrefixer';
import createPrefixerDynamic from 'inline-style-prefixer/dynamic/createPrefixer';
import autoprefixerDynamic from './autoprefixerDynamic';
import autoprefixerStatic from './autoprefixerStatic';
import warning from 'warning';

let hasWarnedAboutUserAgent = false;

export default function(muiTheme) {
  const isClient = typeof navigator !== 'undefined';
  let userAgent = muiTheme.userAgent;

  if (userAgent === undefined && isClient) {
    userAgent = navigator.userAgent;
  }

  if (userAgent === undefined && !hasWarnedAboutUserAgent) {
    warning(false, `Material-UI: userAgent should be supplied in the muiTheme context
      for server-side rendering.`);

    hasWarnedAboutUserAgent = true;
  }

  const prefixAll = createPrefixerStatic(autoprefixerStatic);

  if (userAgent === false) { // Disabled autoprefixer
    return null;
  } else if (userAgent === 'all' || userAgent === undefined) { // Prefix for all user agent
    return (style) => {
      const isFlex = ['flex', 'inline-flex'].indexOf(style.display) !== -1;
      const stylePrefixed = prefixAll(style);

      if (isFlex) {
        const display = stylePrefixed.display;
        if (isClient) {
          // We can't apply this join with react-dom:
          // #https://github.com/facebook/react/issues/6467
          stylePrefixed.display = display[display.length - 1];
        } else {
          stylePrefixed.display = display.join('; display: ');
        }
      }

      return stylePrefixed;
    };
  } else {
    const Prefixer = createPrefixerDynamic(autoprefixerDynamic, prefixAll);
    const prefixer = new Prefixer({
      userAgent: userAgent,
    });

    return (style) => prefixer.prefix(style);
  }
}
