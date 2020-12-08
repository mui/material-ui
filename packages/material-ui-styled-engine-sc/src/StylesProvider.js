import * as React from 'react';

// Dumb component that does nothin, but complies with the API exported from @material-ui/styled-engine
export function StyleProvider(props) {
  return <>{props.children}</>;
}
