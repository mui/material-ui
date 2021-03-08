import * as React from 'react';

interface Props {
  /**
   * UI to render
   */
  children?: React.ReactNode;
}

function makeComponent() {
  return function Component(props: Props) {
    return <div>{props.children}</div>;
  };
}

// @typescript-to-proptypes-generate
const MyComponent = makeComponent();

export default MyComponent;
