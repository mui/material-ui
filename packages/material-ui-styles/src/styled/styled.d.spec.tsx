import * as React from 'react';
import { styled } from '@material-ui/styles';

function styledTest() {
  function styleFunction(props: {
    someStyleValue: number;
    theme: { palette: { primary: 'limegreen' } };
  }) {
    return {};
  }

  const StyledComponent = styled('div')(styleFunction);

  // prop 'theme' must not be required
  <StyledComponent someStyleValue={2} />;

  // Property 'palette' is missing in type '{}'
  <StyledComponent someStyleValue={2} theme={{}} />; // $ExpectError
}
