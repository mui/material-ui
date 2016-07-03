import React, {Component, PropTypes} from 'react';

const requireDemos = require.context('../demos', true, /\.js$/);

export default class Demo extends Component {
  static propTypes = {
    demo: PropTypes.string,
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.demo !== this.props.demo;
  }

  render() {
    const DemoComponent = requireDemos(`./${this.props.demo}`).default;
    return <DemoComponent />;
  }
}
