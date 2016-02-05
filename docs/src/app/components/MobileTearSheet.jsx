import React from 'react';
import {StylePropable} from 'material-ui/lib/mixins';

const MobileTearSheet = React.createClass({

  propTypes: {
    children: React.PropTypes.node,
    height: React.PropTypes.number,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [
    StylePropable,
  ],

  getDefaultProps() {
    return {
      height: 500,
    };
  },

  render() {
    const styles = {
      root: {
        float: 'left',
        marginBottom: 24,
        marginRight: 24,
        width: 360,
      },
      container: {
        border: 'solid 1px #d9d9d9',
        borderBottom: 'none',
        height: this.props.height,
        overflow: 'hidden',
      },
      bottomTear: {
        display: 'block',
        position: 'relative',
        marginTop: -10,
        width: 360,
      },
    };

    return (
      <div style={this.prepareStyles(styles.root)}>
        <div style={this.prepareStyles(styles.container)}>
          {this.props.children}
        </div>
        <img style={this.prepareStyles(styles.bottomTear)} src="images/bottom-tear.svg" />
      </div>
    );
  },

});

export default MobileTearSheet;
