import * as React from 'react';
import clsx from 'clsx';

function useSx(sx, className, style) {
  const sxClass = typeof sx === 'string' ? sx : sx?.className;
  const sxVars = sx && typeof sx !== 'string' ? sx.vars : undefined;
  const varStyles = {};

  if (sxVars) {
    Object.entries(sxVars).forEach(([cssVariable, [value, isUnitLess]]) => {
      if (typeof value === 'string' || isUnitLess) {
        varStyles[`--${cssVariable}`] = value;
      } else {
        varStyles[`--${cssVariable}`] = `${value}px`;
      }
    });
  }

  return {
    className: clsx(sxClass, className),
    style: {
      ...varStyles,
      ...style,
    },
  };
}

/* eslint-disable-next-line react/prop-types */
export const ForwardSx = React.forwardRef(({ sx, sxComponent, className, style, ...rest }, ref) => {
  const Component = sxComponent;
  return <Component ref={ref} {...rest} {...useSx(sx, className, style)} />;
});
