import * as React from 'react';

const defaultShouldForwardProp = (prop) =>
  prop !== 'ownerState' && prop !== 'theme' && prop !== 'sx' && prop !== 'as';

export default function styled(Tag, options) {
  const { shouldForwardProp } = options || {};
  const finalShouldForwardProp = shouldForwardProp || defaultShouldForwardProp;

  const Component = React.forwardRef(function StyledComponent(props, ref) {
    const { as: asProp, ...restProps } = props;
    const FinalTag = asProp || Tag;

    const forwardedProps = Object.fromEntries(
      Object.entries(restProps).filter(([prop]) => finalShouldForwardProp(prop)),
    );

    return <FinalTag {...forwardedProps} ref={ref} />;
  });

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
export function internal_mutateStyles(tag, processor) {}

// eslint-disable-next-line @typescript-eslint/naming-convention
export function internal_serializeStyles(styles) {
  return '';
}

export { default as StyledEngineProvider } from './StyledEngineProvider';
export { default as GlobalStyles } from './GlobalStyles';
