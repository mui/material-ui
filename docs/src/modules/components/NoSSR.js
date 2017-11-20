// @flow

import React from 'react';
import type { Node } from 'react';

const DefaultOnSSR = () => null;

type State = {
  canRender: boolean,
};

type Props = {
  children: Node,
};

class NoSSR extends React.Component<Props, State> {
  state = {
    canRender: false,
  };

  componentDidMount() {
    this.setState({ canRender: true }); // eslint-disable-line react/no-did-mount-set-state
  }

  render() {
    return this.state.canRender ? this.props.children : <DefaultOnSSR />;
  }
}

export default NoSSR;
