// @flow

import React, { Component } from 'react';
import type { Element } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import createStyleSheet from '../styles/createStyleSheet';
import withStyles from '../styles/withStyles';

export const styleSheet = createStyleSheet('MuiList', theme => ({
  root: {
    flex: '1 1 auto',
    overflow: 'auto',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  padding: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  dense: {
    paddingTop: theme.spacing.unit / 2,
    paddingBottom: theme.spacing.unit / 2,
  },
  subheader: {
    paddingTop: 0,
  },
}));

type DefaultProps = {
  component: string,
  dense: boolean,
  disablePadding: boolean,
};

export type Props = DefaultProps & {
  /**
   * The content of the component.
   */
  children?: Element<*>,
  /**
   * Useful to extend the style applied to components.
   */
  classes: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component?: string | Function,
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input will be used for
   * the list and list items. The property is available to descendant components as the
   * `dense` context.
   */
  dense?: boolean,
  /**
   * If `true`, vertical padding will be removed from the list.
   */
  disablePadding?: boolean,
  /**
   * Use that property to pass a ref callback to the root component.
   */
  rootRef?: Function,
  /**
   * The content of the component, normally `ListItem`.
   */
  subheader?: Element<*>,
};

class List extends Component<DefaultProps, Props, void> {
  props: Props;
  static defaultProps: DefaultProps = {
    component: 'ul',
    dense: false,
    disablePadding: false,
  };

  getChildContext() {
    return {
      dense: this.props.dense,
    };
  }

  render() {
    const {
      classes,
      className: classNameProp,
      component: ComponentProp,
      disablePadding,
      children,
      dense,
      subheader,
      rootRef,
      ...other
    } = this.props;
    const className = classNames(
      classes.root,
      {
        [classes.dense]: dense && !disablePadding,
        [classes.padding]: !disablePadding,
        [classes.subheader]: subheader,
      },
      classNameProp,
    );

    return (
      <ComponentProp ref={rootRef} className={className} {...other}>
        {subheader}
        {children}
      </ComponentProp>
    );
  }
}

List.childContextTypes = {
  dense: PropTypes.bool,
};

export default withStyles(styleSheet)(List);
