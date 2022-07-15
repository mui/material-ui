import * as React from 'react';
import clsx from 'clsx';
import styled from '@mui/styled-engine';
import defaultStyleFunctionSx, { extendSxProp } from './styleFunctionSx';
import useTheme from './useTheme';

export default function createBox(options = {}) {
  const {
    defaultTheme,
    defaultClassName = 'MuiBox-root',
    generateClassName,
    styleFunctionSx = defaultStyleFunctionSx,
  } = options;
  const BoxRoot = styled('div')(styleFunctionSx);

  const Box = React.forwardRef(function Box(inProps, ref) {
    const theme = useTheme(defaultTheme);
    const { className, component = 'div', ...other } = extendSxProp(inProps);

    return (
      <BoxRoot
        as={component}
        ref={ref}
        className={clsx(
          className,
          generateClassName ? generateClassName(defaultClassName) : defaultClassName,
        )}
        theme={theme}
        {...other}
      />
    );
  });

  return Box;
}
