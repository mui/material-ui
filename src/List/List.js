// @flow

import React from 'react';
import type { ElementType, Node } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';

export const styles = (theme: Object) => ({
  root: {
    flex: '1 1 auto',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    position: 'relative',
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
});

type ProvidedProps = {
  classes: Object,
  component: ElementType,
};

export type Props = {
  /**
   * The content of the component.
   */
  children?: Node,
  /**
   * Useful to extend the style applied to components.
   */
  classes?: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component?: ElementType,
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
  subheader?: Node,
};

class List extends React.Component<ProvidedProps & Props> {
  static defaultProps = {
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
      <ComponentProp className={className} {...other} ref={rootRef}>
        {subheader}
        {children}
      </ComponentProp>
    );
  }
}

List.childContextTypes = {
  dense: PropTypes.bool,
};

export default withStyles(styles, { name: 'MuiList' })(List);
