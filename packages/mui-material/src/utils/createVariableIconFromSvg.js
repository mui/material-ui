'use client';

import * as React from 'react';
import VariableIcon, { fontSizes } from '../VariableIcon';
import SvgIcon from '../SvgIcon';
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

function propsToVariantName(props, theme) {
  let size;
  if (props.fontSize < 22) {
    size = '20px'; // small
  } else if (props.fontSize < 31) {
    size = '24px'; // medium
  } else if (props.fontSize < 43) {
    size = '40px'; // large
  } else {
    size = '48px'; // larger
  }

  let emphasis = ''; // regular
  if (theme.colorSchemes.dark || props.emphasis === 'light') {
    // If the theme is dark, we should lighten the icon to reduce glare.
    // https://m3.material.io/styles/icons/applying-icons#9103e57b-6251-49b7-91d1-51a6069addb2
    emphasis = '-light';
  } else if (props.emphasis === 'heavy') {
    emphasis = '-heavy';
  }

  let filled = '';
  if (props.filled) {
    filled = '-filled';
  }

  return `${size}${emphasis}${filled}`;
}

/**
 * Private module reserved for @mui packages.
 */
export default function createVariableIconFromSvg(variants, displayName, viewBox) {
  function Component(props, ref) {
    const theme = useTheme();
    const fontVariants = fontSizes(theme);
    const size = fontVariantsToPx(props.fontSize, fontVariants);
    const variantName = propsToVariantName({ ...props, fontSize: size }, theme);

    const { title, ...variableIconProps } = props;

    return (
      <VariableIcon
        data-testid={process.env.NODE_ENV !== 'production' ? `${displayName}Icon` : undefined}
        data-variant={process.env.NODE_ENV !== 'production' ? variantName : undefined}
        ref={ref}
        {...variableIconProps}
      >
        <SvgIcon fontSize={`${size}px`} viewBox={viewBox || '0 -960 960 960'} titleAccess={title}>
          <path d={variants[variantName]} />
        </SvgIcon>
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
