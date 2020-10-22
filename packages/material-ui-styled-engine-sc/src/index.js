import scStyled from 'styled-components';

export default function styled(tag, options) {
  let scStyledPrepared = scStyled(tag);

  if (options) {
    scStyledPrepared = scStyled(tag).withConfig({
      displayName: options.label,
      shouldForwardProp: options.shouldForwardProp,
    });
  }

  return (styles) => {
    return scStyledPrepared(...styles);
  };
}

export { ThemeContext } from 'styled-components';
