import * as React from 'react';

export interface Props {
  Foo?: React.ComponentType;
  Bar: React.ComponentType;
}

export default function Component(props: Props): React.JSX.Element;
