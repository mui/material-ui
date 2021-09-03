import * as React from 'react';
import { createStyled } from '@mui/system';

const styled = createStyled({});
type TestProps = {
  ownerState: {
    fullWidth: boolean;
  };
};
type TestClasses = {
  root: string;
  fullWidth: string;
};

// Example 1
const Button1 = styled<any, any, TestProps, TestClasses>('button', {
  name: 'MuiButton',
  slot: 'Root',
  overridesResolver: ({ ownerState }, styles) => [
    styles.root,
    ownerState.fullWidth && styles.fullWidth,
  ],
})({
  display: 'flex',
});

// Example 2
const Button2 = styled<any, any, TestProps, TestClasses>('button', {
  name: 'MuiButton',
  slot: 'Root',
  overridesResolver: ({ ownerState }, styles) => [
    // root1 does not exist in `TestClasses`
    // @ts-expect-error
    styles.root1,
    ownerState.fullWidth && styles.fullWidth,
  ],
})({
  display: 'flex',
});

// Example 3
const Button3 = styled<any, any, TestProps, TestClasses>('button', {
  name: 'MuiButton',
  slot: 'Root',
  overridesResolver: ({ ownerState }, styles) => [
    styles.root,
    // fullWidth1 does not exist in `TestProps`
    // @ts-expect-error
    ownerState.fullWidth1 && styles.fullWidth,
  ],
})({
  display: 'flex',
});
