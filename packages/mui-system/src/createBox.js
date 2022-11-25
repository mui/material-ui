import * as React from 'react';
import clsx from 'clsx';
import styled from '@mui/styled-engine';
import defaultStyleFunctionSx, { extendSxProp } from './styleFunctionSx';

function isEmpty(obj) {
  return obj === undefined || obj === null || Object.keys(obj).length === 0;
}

export default function createBox(options = {}) {
  const {
    defaultTheme,
    defaultClassName = 'MuiBox-root',
    generateClassName,
    styleFunctionSx = defaultStyleFunctionSx,
  } = options;
  const BoxRoot = styled('div', {
    shouldForwardProp: (prop) => prop !== 'theme' && prop !== 'sx' && prop !== 'as',
  })((args) => styleFunctionSx({ ...args, theme: isEmpty(args.theme) ? defaultTheme : args.theme }));

  const Box = React.forwardRef(function Box(inProps, ref) {
    const { className, component = 'div', ...other } = extendSxProp(inProps);

    return (
      <BoxRoot
        as={component}
        ref={ref}
        className={clsx(
          className,
          generateClassName ? generateClassName(defaultClassName) : defaultClassName,
        )}
        {...other}
      />
    );
  });

  return Box;
}
