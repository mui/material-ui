import { isPlainObject } from '@mui/utils/deepmerge';
import defaultSxConfig from './defaultSxConfig';

const splitProps = (props: any) => {
  const result = {
    systemProps: {} as any,
    otherProps: {} as any,
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

export default function extendSxProp(props: any): any {
  const { sx: inSx, ...other } = props;
  const { systemProps, otherProps } = splitProps(other);

  let finalSx;
  if (Array.isArray(inSx)) {
    finalSx = [systemProps, ...inSx];
  } else if (typeof inSx === 'function') {
    finalSx = (...args: any[]) => {
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
