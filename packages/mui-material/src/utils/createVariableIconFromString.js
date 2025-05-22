'use client';

import * as React from 'react';
import clsx from 'clsx';
import VariableIcon, { fontSizes } from '../VariableIcon/VariableIcon';
import { useTheme } from '../styles';

function fontVariantsToPx(fontSize, fontVariants) {
  if (!Number.isNaN(Number(fontSize))) {
    return Number(fontSize);
  }

  if (fontSize.endsWith('px')) {
    return Number(fontSize.slice(0, -2));
  }

  if (fontSize.endsWith('rem')) {
    return Number(fontSize.slice(0, -3)) * 16;
  }

  if (fontSize === 'inherit') {
    return -1;
  }

  const fontVariant = fontVariants.find((variant) => variant.props.fontSize === fontSize);
  if (fontVariant) {
    return Number(fontVariant.style.fontSize.slice(0, -3)) * 16;
  }

  // Fallback to default size
  return 24;
}

function propsToVariations(props, theme) {
  let opticalSize;
  if (props.fontSize < 22) {
    opticalSize = 20; // small
  } else if (props.fontSize < 31) {
    opticalSize = 24; // medium
  } else if (props.fontSize < 43) {
    opticalSize = 40; // large
  } else {
    opticalSize = 48; // larger
  }

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

  return { opsz: opticalSize, GRAD: emphasis, FILL: filled };
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
    const fontVariants = fontSizes(theme);
    const size = fontVariantsToPx(props.fontSize || 'medium', fontVariants);
    const variations = {
      ...propsToVariations({ ...props, fontSize: size }, theme),
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
