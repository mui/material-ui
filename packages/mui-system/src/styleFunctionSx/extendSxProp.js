import { isPlainObject } from '@mui/utils';
import { propToStyleFunction } from '../getThemeValue';

const splitProps = (props) => {
  const result = {
    systemProps: {},
    otherProps: {},
  };

  Object.keys(props).forEach((prop) => {
    if (propToStyleFunction[prop]) {
      result.systemProps[prop] = props[prop];
    } else {
      result.otherProps[prop] = props[prop];
    }
  });

  return result;
};

export default function extendSxProp(props) {
  const { sx: inSx, ...other } = props;
  const { systemProps, otherProps } = splitProps(other);

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
  } else {
    finalSx = { ...systemProps, ...inSx };
  }

  return {
    ...otherProps,
    sx: finalSx,
  };
}
