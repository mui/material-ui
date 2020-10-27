import scStyled from 'styled-components';

export default function styled(tag, options) {
  let scStyledPrepared;

  if (options) {
    scStyledPrepared = scStyled(tag).withConfig({
      displayName: options.label,
      shouldForwardProp: options.shouldForwardProp,
    });
  } else {
    scStyledPrepared = scStyled(tag);
  }

  // TODO: This should not be required once we solve the warning `You have illegal escape sequence in your template literal`
  return (styles) => {
    return scStyledPrepared(...styles);
  };
}

export { ThemeContext } from 'styled-components';
