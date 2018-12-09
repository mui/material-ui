import React from 'react';

function defer(Component) {
  class Defer extends React.Component {
    state = {
      mounted: false,
    };

    componentDidMount() {
      this.setState({ mounted: true });
    }

    render() {
      return <Component mounted={this.state.mounted} {...this.props} />;
    }
  }

  return Defer;
}

export default defer;
