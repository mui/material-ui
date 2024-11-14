'use client';
import * as React from 'react';
import clsx from 'clsx';
import styled from '@mui/styled-engine';
import styleFunctionSx, { extendSxProp } from '../styleFunctionSx';
import useTheme from '../useTheme';

export default function createBox(options = {}) {
  const { themeId, defaultTheme, defaultClassName = 'MuiBox-root', generateClassName } = options;
  const BoxRoot = styled('div', {
    shouldForwardProp: (prop) => prop !== 'theme' && prop !== 'sx' && prop !== 'as',
  })(styleFunctionSx);

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
        theme={themeId ? theme[themeId] || theme : theme}
        {...other}
      />
    );
  });

  return Box;
}
