import scStyled from 'styled-components';

export default function styled(tag, options) {
  let stylesFactory;

  if (options) {
    stylesFactory = scStyled(tag).withConfig({
      displayName: options.label,
      shouldForwardProp: options.shouldForwardProp,
    });
  }

  stylesFactory = scStyled(tag);

  if (process.env.NODE_ENV !== 'production') {
    return (...styles) => {
      if (styles.length === 0) {
        console.error(
          'Material-UI: the styled("div")(styles) API requires the style to be provided.',
        );
      } else if (styles.some((style) => style === undefined)) {
        console.error(
          'Material-UI: the styled("div")(...args) API requires all its args to be defined.',
        );
      }
      return stylesFactory(...styles);
    };
  }

  return stylesFactory;
}

export { ThemeContext, keyframes, css } from 'styled-components';
export { default as StyledEngineProvider } from './StyledEngineProvider';
export { default as GlobalStyles } from './GlobalStyles';
