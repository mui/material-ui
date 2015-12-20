import React from 'react';
import {Mixins} from 'material-ui';
import muiThemeable from 'material-ui/lib/muiThemeable';
const {StylePropable} = Mixins;

let MobileTearSheet = React.createClass({
  mixins: [StylePropable],

  propTypes: {
    /**
     * The MUI Theme to use to render this component with.
     */
    _muiTheme: React.PropTypes.object.isRequired,

    children: React.PropTypes.node,
    height: React.PropTypes.number,
  },

  getDefaultProps() {
    return {
      height: 500,
    };
  },

  render() {

    let styles = {
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

MobileTearSheet = muiThemeable(MobileTearSheet);

export default MobileTearSheet;
