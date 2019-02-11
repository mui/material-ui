import * as React from 'react';
import { Theme } from '@material-ui/core';
import { AppBarProps } from '@material-ui/core/AppBar';
import { getThemeProps, ThemeProvider } from '@material-ui/styles';
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
  const renderedStyledButton = <StyledButton classes={{ root: 'additional-root-class' }} />;
  // $ExpectError
  const nonExistingClassKey = <StyledButton classes={{ notRoot: 'additional-root-class' }} />;

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
  const StyledMyComponent = styled(MyComponent)((theme: MyTheme) => ({
    fontFamily: theme.fontFamily,
  }));
  const renderedMyComponent = (
    <>
      <MyComponent className="test" />
      <StyledMyComponent />
    </>
  );

  // will not catch type mismatch
  interface ClassNumberProps {
    className: number;
  }
  styled(({ className }: ClassNumberProps) => <div>{className.toFixed(2)}</div>)({});
}

{
  // ThemeProvider
  interface CustomTheme {
    myCustomColor: string;
  }

  const theme: CustomTheme = {
    myCustomColor: 'red',
  };

  const renderCustomThemeProviders = (
    <>
      <ThemeProvider theme={theme}>
        <div />
        <ThemeProvider theme={(outerTheme: CustomTheme) => ({ myCustomColor: 'green' })}>
          <div />
        </ThemeProvider>
      </ThemeProvider>
    </>
  );

  const renderWrongCustomThemeProviders = (
    // $ExpectError
    <ThemeProvider theme={(outerTheme: CustomTheme) => ({ myExtraColor: 'green' })}>
      <div />
    </ThemeProvider>
  );
}
