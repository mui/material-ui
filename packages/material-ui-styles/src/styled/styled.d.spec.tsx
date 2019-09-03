import * as React from 'react';
import { styled } from '@material-ui/styles';

function styledTest() {
  const style = (props: { value: number }) => ({});
  const styleWithTheme = (props: {
    value: number;
    theme: { palette: { primary: string } };
  }) => ({});
  const Component: React.FC = () => null;
  const ComponentWithTheme: React.FC<{ theme: { zIndex: { [k: string]: number } } }> = () => null;

  const ComponentStyled = styled(Component)(style);
  const ComponentStyledWithTheme = styled(Component)(styleWithTheme);
  const ComponentWithThemeStyled = styled(ComponentWithTheme)(style);
  const ComponentWithThemeStyledWithTheme = styled(ComponentWithTheme)(styleWithTheme);

  // prop 'theme' must not be required
  <ComponentStyled value={1} />;
  <ComponentStyledWithTheme value={1} />;
  // error: property 'palette' is missing in type {}
  <ComponentStyledWithTheme value={1} theme={{}} />; // $ExpectError
  // error: property 'theme' is missing in type ... (because the component requires it)
  <ComponentWithThemeStyled value={1} />; // $ExpectError
  <ComponentWithThemeStyledWithTheme value={1} />; // $ExpectError
  // error: property 'zIndex' is missing in type ...
  <ComponentWithThemeStyledWithTheme value={1} theme={{ palette: { primary: '#333' } }} />; // $ExpectError
  // error: property 'palette' is missing in type ...
  <ComponentWithThemeStyledWithTheme value={1} theme={{ zIndex: { appBar: 500 } }} />; // $ExpectError
  <ComponentWithThemeStyledWithTheme
    value={1}
    theme={{ zIndex: { appBar: 500 }, palette: { primary: '#333' } }}
  />;

  const ComponentWithOptionalTheme: React.FC<{
    theme?: { zIndex: { [k: string]: number } };
  }> = () => null;
  const ComponentWithOptionalThemeStyledWithTheme = styled(ComponentWithOptionalTheme)(
    styleWithTheme,
  );

  // prop 'theme' must not be required
  <ComponentWithOptionalThemeStyledWithTheme value={1} />;
  // error: property 'palette' is missing in type {}
  <ComponentWithOptionalThemeStyledWithTheme value={1} theme={{}} />; // $ExpectError
  // error: property 'zIndex' is missing in type ...
  <ComponentWithOptionalThemeStyledWithTheme value={1} theme={{ palette: { primary: '#333' } }} />; // $ExpectError
}
