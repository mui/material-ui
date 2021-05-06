import emStyled from '@emotion/styled';

export default function styled(tag, options) {
  const stylesFactory = emStyled(tag, options);

  if (process.env.NODE_ENV !== 'production') {
    return (...styles) => {
      if (styles.length === 0) {
        console.error(
          'Material-UI: the styled("div")(style) API requires the style to be provided.',
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

export { ThemeContext, keyframes, css } from '@emotion/react';
export { default as StyledEngineProvider } from './StyledEngineProvider';
export { default as GlobalStyles } from './GlobalStyles';
