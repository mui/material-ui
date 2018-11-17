import * as React from 'react';
import { Theme } from '@material-ui/core';
import { AppBarProps } from '@material-ui/core/AppBar';
import { getThemeProps } from '@material-ui/styles';
import styled, { StyledProps } from '@material-ui/styles/styled';

function testGetThemeProps(theme: Theme, props: AppBarProps): void {
  const overriddenProps: AppBarProps = getThemeProps({ name: 'MuiAppBar', props, theme });

  // AvatarProps not assignable to AppBarProps
  // $ExpectError
  const wronglyNamedProps: AppBarProps = getThemeProps({
    name: 'MuiAvatar',
    props,
    theme,
  });
}

{
  // styled
  const StyledButton = styled('button')({
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  });
  const renderedStyledButton = <StyledButton classes={{ root: 'additonal-root-class' }} />;
  // $ExpectError
  const nonExistingClassKey = <StyledButton classes={{ notRoot: 'additonal-root-class' }} />;

  interface MyTheme {
    fontFamily: string;
  }

  interface MyComponentProps extends StyledProps {
    defaulted: string;
  }
  class MyComponent extends React.Component<MyComponentProps> {
    static defaultProps = {
      defaulted: 'Hello, World!',
    };
    render() {
      const { className, defaulted } = this.props;
      return <div className={className}>Greeted?: {defaulted.startsWith('Hello')}</div>;
    }
  }
  const StyledMyComponent = styled<typeof MyComponent>(MyComponent)((theme: MyTheme) => ({
    fontFamily: theme.fontFamily,
  }));
  const renderedMyComponent = (
    <>
      <MyComponent className="test" />
      <StyledMyComponent />
    </>
  );
}
