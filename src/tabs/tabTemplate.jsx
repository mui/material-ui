import React from 'react';

class TabTemplate extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    selected: React.PropTypes.bool,
  };

  render() {
    const styles = {
      width: '100%',
      position: 'relative',
      textAlign: 'initial',
    };

    if (!this.props.selected) {
      styles.height = 0;
      styles.overflow = 'hidden';
    }

    return (
      <div style={styles}>
        {this.props.children}
      </div>
    );
  }
}

export default TabTemplate;
