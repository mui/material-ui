import React from 'react';
import Divider from '../divider';
import {mergeStyles} from '../utils/styles';
import warning from 'warning';

const MenuDivider = React.createClass({

  propTypes: {
    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
  },

  getInitialState() {
    warning(false, '<MenuDivider /> has been deprecated. Please use the <Divider /> component.');
    return null;
  },

  getStyles() {
    return {
      root: {
        marginTop: 7,
        marginBottom: 8,
      },
    };
  },

  render() {
    const {
      style,
      ...other,
    } = this.props;

    const styles = this.getStyles();

    return <Divider {...this.props} style={mergeStyles(styles.root, style)} />;
  },
});

export default MenuDivider;
