/**
 * tests type interop between our components and popular higher-order components.
 *
 * It's a common pattern to use some form of Pick or Omit in hocs which don't have
 * a desired outcome when operating on union types.
 *
 * See https://github.com/Microsoft/TypeScript/issues/28339 for in-depth discussion
 */
import { createStyles, withStyles } from '@mui/styles';
import * as React from 'react';
import { Button } from '@mui/material';

// https://github.com/mui/material-ui/issues/14586
{
  const styles = createStyles({
    root: {
      color: 'red',
    },
  });

  const StyledButton = withStyles(styles)(Button);

  // @ts-expect-error undesired; caused by https://github.com/Microsoft/TypeScript/issues/26591
  <StyledButton component="a" />;

  // workaround
  const UnsafeStyledButton = withStyles({ root: { color: 'ref' } })(Button) as typeof Button;
  <UnsafeStyledButton component="a" />;
}
