import * as React from 'react';
import { styled, StyledProps } from '@mui/styles';

function themeTest() {
  const style = (props: { value: number }) => ({});
  const styleWithTheme = (props: {
    value: number;
    theme: { palette: { primary: string } };
  }) => ({});
  const Component: React.FC<{ value: number }> = function Component() {
    return null;
  };
  const ComponentWithTheme: React.FC<{ theme: { zIndex: { [k: string]: number } } }> =
    function ComponentWithTheme() {
      return null;
    };

  const ComponentStyled = styled(Component)(style);
  const ComponentStyledWithTheme = styled(Component)(styleWithTheme);
  const ComponentWithThemeStyled = styled(ComponentWithTheme)(style);
  const ComponentWithThemeStyledWithTheme = styled(ComponentWithTheme)(styleWithTheme);

  // prop 'theme' must not be required
  <ComponentStyled value={1} />;
  <ComponentStyledWithTheme value={1} />;
  // @ts-expect-error property 'palette' is missing in type {}
  <ComponentStyledWithTheme value={1} theme={{}} />;
  // @ts-expect-error property 'theme' is missing in type ... (because the component requires it)
  <ComponentWithThemeStyled value={1} />;
  // @ts-expect-error property 'theme' is missing in
  <ComponentWithThemeStyledWithTheme value={1} />;
  // @ts-expect-error property 'zIndex' is missing in type ...
  <ComponentWithThemeStyledWithTheme value={1} theme={{ palette: { primary: '#333' } }} />;
  // @ts-expect-error property 'palette' is missing in type ...
  <ComponentWithThemeStyledWithTheme value={1} theme={{ zIndex: { appBar: 500 } }} />;
  <ComponentWithThemeStyledWithTheme
    value={1}
    theme={{ zIndex: { appBar: 500 }, palette: { primary: '#333' } }}
  />;

  const ComponentWithOptionalTheme: React.FC<{
    theme?: { zIndex: { [k: string]: number } };
  }> = function ComponentWithOptionalTheme() {
    return null;
  };
  const ComponentWithOptionalThemeStyledWithTheme = styled(ComponentWithOptionalTheme)(
    styleWithTheme,
  );

  // prop 'theme' must not be required
  <ComponentWithOptionalThemeStyledWithTheme value={1} />;
  // @ts-expect-error error: property 'palette' is missing in type {}
  <ComponentWithOptionalThemeStyledWithTheme value={1} theme={{}} />;
  // @ts-expect-error error: property 'zIndex' is missing in type ...
  <ComponentWithOptionalThemeStyledWithTheme value={1} theme={{ palette: { primary: '#333' } }} />;
}

function acceptanceTest() {
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
  // @ts-expect-error
  const nonExistingClassKey = <StyledButton classes={{ notRoot: 'additional-root-class' }} />;

  interface MyTheme {
    fontFamily: string;
  }
  const MyThemeInstance: MyTheme = {
    fontFamily: 'monospace',
  };
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
  const StyledMyComponent = styled<typeof MyComponent>(MyComponent)(
    ({ theme }: { theme: MyTheme }) => ({
      fontFamily: theme.fontFamily,
    }),
  );
  const StyledInferredPropsMyComponent = styled(MyComponent)(({ defaulted }) => ({
    content: defaulted,
  }));
  const renderedMyComponent = (
    <React.Fragment>
      <MyComponent className="test" />
      <StyledMyComponent theme={MyThemeInstance} />
      <StyledInferredPropsMyComponent defaulted="Hi!" />
    </React.Fragment>
  );
}
