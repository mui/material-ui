import * as React from 'react';
import { Theme } from '@material-ui/core';
import { AppBarProps } from '@material-ui/core/AppBar';
import { createStyled, createStyles, getThemeProps, makeStyles } from '@material-ui/styles';
import styled, { StyledProps } from '@material-ui/styles/styled';

// createStyled
{
  const Styled = createStyled(
    (theme: Theme) => ({
      root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: `0 ${theme.spacing.unit * 4}px`,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      },
    }),
    { withTheme: true },
  );

  const ValidRenderProps = () => {
    return (
      <Styled>
        {({ classes, theme }) => (
          <button type="button" className={classes.root}>
            Render props with a spacing of {theme.spacing.unit}
          </button>
        )}
      </Styled>
    );
  };

  const NoRenderProps = () => {
    // $ExpectError
    return <Styled>I didn't provide a function as a child :(</Styled>;
  };

  const IncompatibleTheme = () => {
    // Object literal may only specify known types
    // $ExpectError
    return <Styled theme={{ foo: 'bar' }}>{({ theme }) => theme.spacing.unit}</Styled>;
  };

  const unusedClassKey = createStyled({
    // `foo` does not exist on type Styles
    // $ExpectError
    foo: {},
  });
}

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

// makeStyles
{
  interface StyleProps {
    color?: 'blue' | 'red';
  }

  const styles = (theme: Theme) =>
    createStyles({
      root: (props: StyleProps) => ({
        backgroundColor: props.color || theme.palette.primary.main,
      }),
    });
  const useMyStyles = makeStyles(styles);

  interface MyComponentProps extends StyleProps {
    message: string;
  }

  const MyComponent = (props: MyComponentProps) => {
    const { color, message } = props;
    const classes = useMyStyles(props);
    // $ExpectError
    const invalidClasses = useMyStyles({ colourTypo: 'red' });
    // $ExpectError
    const undefinedClassName = classes.toot;

    return (
      <div className={classes.root}>
        {color}: {message}
      </div>
    );
  };

  // testing options
  makeStyles(styles, {
    flip: true,
    name: 'some-sheet',
    generateClassName: (_, sheet) => (sheet ? sheet.classes.root : 'no-sheet'),
  });
  makeStyles(styles, {
    // Property 'toot' does not exist on type 'Record<"root", string>'
    generateClassName: (_, sheet) => (sheet ? sheet.classes.toot : 'no-sheet'), // $ExpectError
  });
}

// styled
{
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
  // tslint:disable-next-line: no-empty-interface
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
