import * as React from 'react';
import { SnackbarUnstyledProps } from './SnackbarUnstyled.types';

const SnackbarUnstyled = (props: SnackbarUnstyledProps) => {
  const { component, components = {} } = props;

  const Root = component || components.Root || 'div';

  return <Root>abc</Root>;
};

export default SnackbarUnstyled;
