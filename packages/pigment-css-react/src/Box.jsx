/* eslint-disable react/prop-types */
import * as React from 'react';

const Box = React.forwardRef(
  (
    {
      as = 'div',
      // Added to support compatibility with @mui/system
      component,
      /**
       * The type of the transformed sx prop is either a
       * "string" if the css passed was fully static or an
       * object with the following shape:
       * {
       *  className: string,
       *  vars: Record<string, [string | number, boolean]>
       * }
       */
      sx,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const Component = component ?? as;
    // eslint-disable-next-line react/prop-types
    const sxClass = typeof sx === 'string' ? sx : sx?.className;
    const classes = [className, sxClass].filter(Boolean).join(' ');
    // eslint-disable-next-line react/prop-types
    const sxVars = sx && typeof sx !== 'string' ? sx?.vars : {};
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

    const styles = {
      ...style,
      ...varStyles,
    };

    // eslint-disable-next-line react/jsx-filename-extension
    return <Component ref={ref} className={classes} style={styles} {...rest} />;
  },
);

export default Box;
