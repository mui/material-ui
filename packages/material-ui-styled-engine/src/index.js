import emStyled from '@emotion/styled';

export default function styled(tag, options) {
  const stylesFactory = emStyled(tag, options);

  if (process.env.NODE_ENV !== 'production') {
    return (...styles) => {
      if (styles.some((style) => style === undefined)) {
        console.error('empty', options.label);
      }
      return stylesFactory(...styles);
    };
  }

  return stylesFactory;
}

export { ThemeContext, keyframes, css } from '@emotion/react';
export { default as StyledEngineProvider } from './StyledEngineProvider';
export { default as GlobalStyles } from './GlobalStyles';
