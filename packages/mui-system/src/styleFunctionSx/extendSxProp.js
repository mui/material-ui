import clsx from 'clsx';
import { isPlainObject } from '@mui/utils/deepmerge';
import defaultSxConfig from './defaultSxConfig';

const splitProps = (props) => {
  const result = {
    systemProps: {},
    otherProps: {},
  };

  const config = props?.theme?.unstable_sxConfig ?? defaultSxConfig;

  Object.keys(props).forEach((prop) => {
    if (config[prop]) {
      result.systemProps[prop] = props[prop];
    } else {
      result.otherProps[prop] = props[prop];
    }
  });

  return result;
};

export default function extendSxProp(props) {
  const { sx: inSx, ...other } = props;
  const { systemProps, otherProps = {} } = splitProps(other);

  let finalSx;
  if (Array.isArray(inSx)) {
    finalSx = [systemProps, ...inSx];
  } else if (typeof inSx === 'function') {
    finalSx = (...args) => {
      const result = inSx(...args);
      if (!isPlainObject(result)) {
        return systemProps;
      }
      return { ...systemProps, ...result };
    };
  } else if (typeof inSx === 'string') {
    // Support for Pigment CSS string sx value
    otherProps.className = clsx(otherProps.className, inSx);
  } else if (typeof inSx === 'object' && (inSx.className || inSx.vars)) {
    const sxClass = typeof inSx === 'string' ? inSx : inSx?.className;
    const sxVars = inSx && typeof inSx !== 'string' ? inSx.vars : undefined;
    const sxVarsStyles = {};

    if (sxVars) {
      Object.entries(sxVars).forEach(([cssVariable, [value, isUnitLess]]) => {
        if (typeof value === 'string' || isUnitLess) {
          sxVarsStyles[`--${cssVariable}`] = value;
        } else {
          sxVarsStyles[`--${cssVariable}`] = `${value}px`;
        }
      });
    }

    // Support for Pigment CSS string sx value
    otherProps.style = { ...sxVarsStyles, ...otherProps.style };
    otherProps.className = clsx(otherProps.className, sxClass);
  } else {
    finalSx = { ...systemProps, ...inSx };
  }

  return {
    ...otherProps,
    sx: finalSx,
  };
}
