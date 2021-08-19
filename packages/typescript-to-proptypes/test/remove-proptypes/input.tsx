import * as React from 'react';

interface Props {
  /**
   * UI to render
   */
  children?: React.ReactNode;
}

export default function Component(props: Props) {
  return <div>{props.children}</div>;
}
