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
import { Button, withStyles, createStyles } from '@material-ui/core';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import emotionStyled from '@emotion/styled';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import styled from 'styled-components';

const filledProps = {
  InputProps: { classes: { inputAdornedStart: 'adorned' } },
};

// baseline behavvior
<TextField variant="filled" {...filledProps} />;
// $ExpectError
<TextField {...filledProps} />; // desired

// styled
{
  const StyledTextField = styled(TextField)``;
  <StyledTextField variant="filled" {...filledProps} />;
  // $ExpectError
  <StyledTextField {...filledProps} />; // desired
}

// @emotion/styled
{
  const StyledTextField = emotionStyled(TextField)``;
  // $ExpectError
  <StyledTextField variant="filled" {...filledProps} />; // undesired
  // $ExpectError
  <StyledTextField {...filledProps} />; // desired
}

// react-router
{
  type RouterTextFieldProps = TextFieldProps & RouteComponentProps;
  const RouterTextField: React.FunctionComponent<RouterTextFieldProps> = () => null;
  const TextFieldWithRouter = withRouter(RouterTextField);
  <TextFieldWithRouter variant="filled" {...filledProps} />;
  // $ExpectError
  <TextFieldWithRouter {...filledProps} />; // desired
}

// https://github.com/mui-org/material-ui/issues/14586
{
  const styles = createStyles({
    root: {
      color: 'red',
    },
  });

  const StyledButton = withStyles(styles)(Button);

  // undesired; caused by https://github.com/Microsoft/TypeScript/issues/26591
  <StyledButton component="a" />; // $ExpectError

  // workaround
  const UnsafeStyledButton = withStyles({ root: { color: 'ref' } })(Button) as typeof Button;
  <UnsafeStyledButton component="a" />;
}
