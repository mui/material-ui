/**
 * tests type interop between our components and popular higher-order components.
 *
 * It's a common pattern to use some form of Pick or Omit in hocs which don't have
 * a desired outcome when operating on union types.
 *
 * We use our TextField component since it has a union type as props
 *
 * See https://github.com/Microsoft/TypeScript/issues/28339 for in-depth discussion
 */
import { Button } from '@mui/material';
import { createStyles, withStyles } from '@mui/styles';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import emotionStyled from '@emotion/styled';
import * as React from 'react';
import styled from 'styled-components';

const filledProps = {
  InputProps: { classes: { inputAdornedStart: 'adorned' } },
};

// baseline behavior
<TextField variant="filled" {...filledProps} />;
// @ts-expect-error
<TextField {...filledProps} />; // desired to throw

// styled
{
  const StyledTextField = styled(TextField)``;
  <StyledTextField variant="filled" {...filledProps} />; // desired to pass
  // @ts-expect-error
  <StyledTextField {...filledProps} />; // undesired, should throw
}

// @emotion/styled
{
  const StyledTextField = emotionStyled(TextField)``;
  <StyledTextField variant="filled" {...filledProps} />;
  // @ts-expect-error
  <StyledTextField {...filledProps} />; // desired to throw
}

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
