import scStyled from 'styled-components';

export default function styled(tag, options) {
  let stylesFactory;

  if (options) {
    stylesFactory = scStyled(tag).withConfig({
      displayName: options.label,
      shouldForwardProp: options.shouldForwardProp,
    });
  } else {
    stylesFactory = scStyled(tag);
  }

  if (process.env.NODE_ENV !== 'production') {
    const fn = (...styles) => {
      const component = typeof tag === 'string' ? `"${tag}"` : 'component';
      if (styles.length === 0) {
        console.error(
          [
            `MUI: Seems like you called \`styled(${component})()\` without a \`style\` argument.`,
            'You must provide a `styles` argument: `styled("div")(styleYouForgotToPass)`.',
          ].join('\n'),
        );
      } else if (styles.some((style) => style === undefined)) {
        console.error(
          `MUI: the styled(${component})(...args) API requires all its args to be defined.`,
        );
      }
      return stylesFactory(...styles);
    };
    fn.withConfig = stylesFactory.withConfig;
    return fn;
  }

  return stylesFactory;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const internal_processStyles = (tag, processor) => {
  // Styled-components attaches an instance to `componentStyle`.
  // https://github.com/styled-components/styled-components/blob/da8151762dcf72735ffba358173d4c097f6d5888/packages/styled-components/src/models/StyledComponent.ts#L257
  //
  // The instance contains `rules` (the styles)
  // https://github.com/styled-components/styled-components/blob/da8151762dcf72735ffba358173d4c097f6d5888/packages/styled-components/src/models/ComponentStyle.ts#L23
  if (tag.componentStyle) {
    tag.componentStyle.rules = processor(tag.componentStyle.rules);
  }
};

export { ThemeContext, keyframes, css } from 'styled-components';
export { default as StyledEngineProvider } from './StyledEngineProvider';
export { default as GlobalStyles } from './GlobalStyles';
