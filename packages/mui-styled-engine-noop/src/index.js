import * as React from 'react';

export default function styled(Tag, options) {
  const Component = React.forwardRef((props, ref) => {
    return <Tag {...props} ref={ref} />;
  });
  // TODO: handle options
  return () => Component;
}

export function keyframes() {
  return 'animation-name';
}

export function css() {
  return '';
}

export const ThemeContext = React.createContext(null);

// eslint-disable-next-line @typescript-eslint/naming-convention
export function internal_mutateStyles(tag, processor) {
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export function internal_serializeStyles(styles) {
  return '';
}

export { default as StyledEngineProvider } from './StyledEngineProvider';
export { default as GlobalStyles } from './GlobalStyles';
