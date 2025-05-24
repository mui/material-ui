'use client';

import * as React from 'react';
import VariableIcon from '../VariableIcon';
import SvgIcon from '../SvgIcon';
import { useTheme, styled } from '../styles';
import memoTheme from './memoTheme';

function propsToVariantName(props, theme) {
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

  return `${emphasis}${filled}`;
}

const masterSizes = [20, 24, 40, 48];

const VariableSvg = styled('svg')(
  memoTheme(() => ({
    '& path': {
      display: 'none',
    },
    // fallback, show 24dp master
    '& .m24': {
      display: 'block',
    },
    '@supports (container-type:inline-size)': {
      containerType: 'inline-size',
      // min-width:0px and max-width:21px, show 20dp master
      '@container (max-width:21px)': {
        '& .m20': {
          display: 'block',
        },
        '& .m24': {
          display: 'none',
        },
      },

      // min-width:22px and max-width:31px, show 24dp master
      // using fallback defined outside the @supports

      // min-width:32px and max-width:43px, show 40dp master
      '@container (min-width:32px) and (max-width:43px)': {
        '& .m40': {
          display: 'block',
        },
        '& .m24': {
          display: 'none',
        },
      },
      // min-width:44px, show 48dp master
      '@container (min-width:44px)': {
        '& .m48': {
          display: 'block',
        },
        '& .m24': {
          display: 'none',
        },
      },
    },
  })),
);

/**
 * Private module reserved for @mui packages.
 */
export default function createVariableIconFromSvg(variants, displayName, viewBox) {
  function Component(props, ref) {
    const theme = useTheme();
    const variationName = propsToVariantName(props, theme);

    const { titleAccess, ...variableIconProps } = props;

    return (
      <VariableIcon
        data-testid={process.env.NODE_ENV !== 'production' ? `${displayName}Icon` : undefined}
        data-variation={
          process.env.NODE_ENV !== 'production' ? `variant${variationName}` : undefined
        }
        ref={ref}
        {...variableIconProps}
      >
        <SvgIcon
          as={VariableSvg}
          fontSize={props.fontSize}
          viewBox={viewBox || '0 -960 960 960'}
          titleAccess={titleAccess}
        >
          {masterSizes.map((opsz) => (
            <path className={`m${opsz}`} key={opsz} d={variants[`${opsz}px${variationName}`]} />
          ))}
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
