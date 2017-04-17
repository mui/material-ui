// @flow weak

import { cloneElement, Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from '../utils/customPropTypes';

export const styleSheet = createStyleSheet('MuiListItemIcon', (theme) => {
  return {
    root: {
      height: 24,
      marginRight: 16,
      width: 24,
      color: theme.palette.action.active,
    },
  };
});

/**
 * A simple wrapper to apply `List` styles to an `Icon` or `SvgIcon`.
 * ```
 * <ListIcon>
 *   <Icon>
 * </ListIcon>
 * ```
 */
export default class ListItemIcon extends Component {
  render() {
    const {
      children,
      className: classNameProp,
      ...other
    } = this.props;
    const classes = this.context.styleManager.render(styleSheet);

    return cloneElement(children, {
      className: classNames(classes.root, classNameProp, children.props.className),
      ...other,
    });
  }
}

ListItemIcon.propTypes = {
  /**
   * The content of the component, normally `Icon`, `SvgIcon`,
   * or a `material-ui-icons` SVG icon component.
   */
  children: PropTypes.element.isRequired,
  /**
   * The CSS class name of the root element.
   */
  className: PropTypes.string,
};

ListItemIcon.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
