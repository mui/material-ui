// @flow weak

import { PropTypes, cloneElement, Component } from 'react';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from '../utils/customPropTypes';

export const styleSheet = createStyleSheet('MuiListItemIcon', () => {
  return {
    root: {
      height: 24,
      marginRight: 16,
      width: 24,
    },
    avatar: {
      height: 40,
      marginRight: 0,
      width: 40,
    },
    dense: {
      height: 32,
      marginRight: 8,
      width: 32,
    },
  };
});

export default class ListItemIcon extends Component {
  render() {
    const {
      avatar,
      dense,
      children,
      className: classNameProp,
      ...other
    } = this.props;
    const classes = this.context.styleManager.render(styleSheet);
    const className = classNames(classes.root, {
      [classes.avatar]: avatar,
      [classes.dense]: avatar && dense,
    }, classNameProp);

    return cloneElement(children, {
      className: classNames(className, children.props.className),
      ...other,
    });
  }
}

ListItemIcon.propTypes = {
  /**
   * Should icon be displayed as avatar.
   */
  avatar: PropTypes.bool,
  children: PropTypes.element.isRequired,
  /**
   * The CSS class name of the root element.
   */
  className: PropTypes.string,
  dense: PropTypes.bool,
};

ListItemIcon.defaultProps = {
  avatar: false,
  dense: false,
};

ListItemIcon.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
