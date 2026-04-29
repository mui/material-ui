'use client';
import * as React from 'react';
import PropTypes from 'prop-types';

const defaultShouldForwardProp = (prop) =>
  prop !== 'ownerState' && prop !== 'theme' && prop !== 'sx' && prop !== 'as';

export default function styled(Tag, options) {
  const { shouldForwardProp } = options || {};
  const finalShouldForwardProp = shouldForwardProp || defaultShouldForwardProp;

  let warnedAboutSx = false;

  const Component = React.forwardRef(function StyledComponent(props, ref) {
    if (process.env.NODE_ENV !== 'production' && !warnedAboutSx && props.sx !== undefined) {
      warnedAboutSx = true;
      const componentName =
        typeof Tag === 'string' ? `<${Tag}>` : Tag.displayName || Tag.name || 'a component';
      console.error(
        `MUI: The \`sx\` prop was used on ${componentName} but \`@mui/styled-engine-noop\` is active. ` +
          'The `sx` prop will be ignored. Use Tailwind CSS classes via the `className` prop for styling instead.',
      );
    }

    const { as: asProp, ...restProps } = props;
    const FinalTag = asProp || Tag;

    const forwardedProps = Object.fromEntries(
      Object.entries(restProps).filter(([prop]) => finalShouldForwardProp(prop)),
    );

    return <FinalTag {...forwardedProps} ref={ref} />;
  });

  Component.propTypes = {
    as: PropTypes.elementType,
    sx: PropTypes.oneOfType([PropTypes.array, PropTypes.func, PropTypes.object]),
  };

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
export function internal_mutateStyles(_tag, _processor) {}

// eslint-disable-next-line @typescript-eslint/naming-convention
export function internal_serializeStyles(_styles) {
  return '';
}

export { default as StyledEngineProvider } from './StyledEngineProvider';
export { default as GlobalStyles } from './GlobalStyles';
