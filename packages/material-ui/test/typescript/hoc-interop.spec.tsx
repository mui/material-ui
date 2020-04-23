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
import TextField, { TextFieldVariant, TextFieldProps } from '@material-ui/core/TextField';
import emotionStyled from '@emotion/styled';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import styled from 'styled-components';

const outlineProps = {
  InputProps: { classes: { notchedOutline: 'notchedOutline' } },
};

// default behavior for standard variant
<TextField InputProps={{ classes: { root: 'root' } }} />;

// baseline behavior
<TextField variant="outlined" {...outlineProps} />;

// $ExpectError
<TextField variant="filled" {...outlineProps} />; // desired to throw
// $ExpectError
<TextField {...outlineProps} />;

// styled
{
  const StyledTextField = styled(TextField)``;
  <StyledTextField variant="outlined" {...outlineProps} />; // desired to pass
  // $ExpectError
  <StyledTextField variant="filled" {...outlineProps} />; // undesired, should throw
}

// @emotion/styled
{
  const StyledTextField = emotionStyled(TextField)``;
  <StyledTextField variant="outlined" {...outlineProps} />;
  // $ExpectError
  <StyledTextField variant="filled" {...outlineProps} />; // desired to throw
  // $ExpectError
  <StyledTextField {...outlineProps} />; // desired to throw
}

// react-router
{
  type RouterTextFieldProps = TextFieldProps<'outlined'> & RouteComponentProps;
  const RouterTextField: React.FunctionComponent<RouterTextFieldProps> = () => null;
  const TextFieldWithRouter = withRouter(RouterTextField);
  <TextFieldWithRouter variant="outlined" {...outlineProps} />;
  // $ExpectError
  <TextFieldWithRouter variant="filled" {...outlineProps} />; // desired
  // $ExpectError
  <TextFieldWithRouter {...outlineProps} />; // desired to throw
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
