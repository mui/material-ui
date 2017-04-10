// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from '../utils/customPropTypes';

export const styleSheet = createStyleSheet('MuiList', () => {
  return {
    root: {
      flex: '1 1 auto',
      overflow: 'auto',
      listStyle: 'none',
      margin: 0,
      padding: 0,
    },
    padding: {
      paddingTop: 8,
      paddingBottom: 8,
    },
    dense: {
      paddingTop: 4,
      paddingBottom: 4,
    },
    subheader: {
      paddingTop: 0,
    },
  };
});

/**
 * A material list root element.
 *
 * ```jsx
 * <List>
 *   <ListItem>....</ListItem>
 * </List>
 * ```
 */
export default class List extends Component {
  static propTypes = {
    /**
     * The content of the component.
     */
    children: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    /**
     * The component used for the root node.
     * Either a string to use a DOM element or a component.
     */
    component: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]),
    /**
     * If `true`, compact vertical padding designed for keyboard and mouse input will be used for
     * the list and list items. The property is available to descendant components as the
     * `dense` context.
     */
    dense: PropTypes.bool,
    /**
     * If `true`, vertical padding will be removed from the list.
     */
    disablePadding: PropTypes.bool,
    /**
     * @ignore
     */
    rootRef: PropTypes.func,
    /**
     * The content of the component, normally `ListItem`.
     */
    subheader: PropTypes.node,
  };

  static defaultProps = {
    component: 'div',
    dense: false,
    disablePadding: false,
  };

  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  static childContextTypes = {
    dense: PropTypes.bool,
  };

  getChildContext() {
    return {
      dense: this.props.dense,
    };
  }

  render() {
    const {
      className: classNameProp,
      component: ComponentProp,
      disablePadding,
      children,
      dense,
      subheader,
      rootRef,
      ...other
    } = this.props;
    const classes = this.context.styleManager.render(styleSheet);
    const className = classNames(classes.root, {
      [classes.dense]: dense,
      [classes.padding]: !disablePadding,
      [classes.subheader]: subheader,
    }, classNameProp);

    return (
      <ComponentProp ref={rootRef} className={className} {...other}>
        {subheader}
        {children}
      </ComponentProp>
    );
  }
}
