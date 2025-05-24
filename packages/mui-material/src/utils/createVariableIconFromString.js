'use client';

import * as React from 'react';
import clsx from 'clsx';
import VariableIcon from '../VariableIcon';
import { useTheme } from '../styles';

function propsToVariations(props, theme) {
  let emphasis = 0; // regular
  if (theme.colorSchemes.dark || props.emphasis === 'light') {
    // If the theme is dark, we should lighten the icon to reduce glare.
    // https://m3.material.io/styles/icons/applying-icons#9103e57b-6251-49b7-91d1-51a6069addb2
    emphasis = -25;
  } else if (props.emphasis === 'heavy') {
    emphasis = 200;
  }

  let filled = 0;
  if (props.filled) {
    filled = 1;
  }

  return { GRAD: emphasis, FILL: filled };
}

/**
 * Private module reserved for @mui packages.
 */
export default function createVariableIconFromString(
  iconName,
  displayName,
  family,
  staticVariations,
  className,
) {
  function Component(props, ref) {
    const theme = useTheme();
    const variations = {
      ...propsToVariations(props, theme),
      ...staticVariations, // do not allow users to override static variations
    };
    const fontVariationSettings = Object.keys(variations)
      .map((key) => `'${key}' ${variations[key]}`)
      .join(', ');

    const { sx, className: userClassName, ...variableIconProps } = props;

    return (
      <VariableIcon
        data-testid={process.env.NODE_ENV !== 'production' ? `${displayName}Icon` : undefined}
        className={clsx(className, userClassName)}
        ref={ref}
        {...variableIconProps}
        sx={{
          ...sx,
          fontVariationSettings,
        }}
      >
        {iconName}
      </VariableIcon>
    );
  }

  if (process.env.NODE_ENV !== 'production') {
    // Need to set `displayName` on the inner component for React.memo.
    // React prior to 16.14 ignores `displayName` on the wrapper.
    Component.displayName = `${displayName}Icon`;
  }

  Component.muiName = VariableIcon.muiName;
  Component.propTypes = VariableIcon.propTypes;

  return React.memo(React.forwardRef(Component));
}
