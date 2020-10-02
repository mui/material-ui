import scStyled from 'styled-components';

export default function styled(tag, options) {
  if (options) {
    return scStyled(tag).withConfig({
      displayName: options.label,
      shouldForwardProp: options.shouldForwardProp,
    });
  }

  return scStyled(tag);
}

export { ThemeContext } from 'styled-components';
