import * as React from 'react';
import clsx from 'clsx';

function getVariantClasses(props, variants) {
  const variantClasses = variants
    .filter(({ props: { __fromOwnerState = true, ...restProps } }) => {
      return Object.entries(restProps).every(([propKey, propValue]) => {
        return (
          (__fromOwnerState && props.ownerState ? props.ownerState[propKey] : props[propKey]) ===
          propValue
        );
      });
    })
    .map(({ className }) => className);
  return variantClasses;
}

export default function styled(tag, options = {}) {
  const {
    displayName,
    classes = [],
    vars: cssVars = {},
    variants = [],
    name,
    slot,
    defaultProps = {},
  } = options;
  const identifierName = (slot ? `${name}${slot}` : name) ?? displayName;

  const StyledComponent = React.forwardRef(function StyledComponent(
    // eslint-disable-next-line react/prop-types
    { as, className, sx: __sx, style, ownerState, ...restProps },
    ref,
  ) {
    const Component = as ?? tag;
    const varStyles = Object.entries(cssVars).reduce((acc, [varId, [fn, isUnitLess]]) => {
      const value = fn(restProps);
      if (typeof value === 'string' || isUnitLess) {
        acc[`--${varId}`] = value;
      } else {
        acc[`--${varId}`] = `${value}px`;
      }
      return acc;
    }, {});

    // eslint-disable-next-line no-underscore-dangle
    if (!Component.__isStyled) {
      return React.createElement(Component, {
        ...restProps,
        className: clsx(
          classes,
          className,
          variants.length ? getVariantClasses({ ownerState, ...restProps }, variants) : [],
        ),
        style: {
          ...varStyles,
          ...style,
        },
        ref,
      });
    }

    return React.createElement(Component, {
      ownerState,
      ...restProps,
      className: clsx(
        classes,
        className,
        getVariantClasses({ ownerState, ...restProps }, variants),
      ),
      style: {
        ...varStyles,
        ...style,
      },
      ref,
    });
  });

  StyledComponent.displayName = `Styled(${identifierName ?? 'Component'})`;
  StyledComponent.defaultProps = defaultProps;
  StyledComponent.__isStyled = true;

  return StyledComponent;
}
