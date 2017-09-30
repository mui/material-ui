// @flow

import React from 'react';
import type { ElementType, Node } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';

export const styles = (theme: Object) => ({
  root: {
    fontSize: 12,
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.text.secondary,
  },
});

type ProvidedProps = {
  classes: Object,
  component: ElementType,
};

export type Props = {
  /**
   * The content of the component, normally `TableRow`.
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
};

class TableHead extends React.Component<ProvidedProps & Props> {
  static defaultProps = {
    component: 'thead',
  };

  getChildContext() {
    // eslint-disable-line class-methods-use-this
    return {
      table: {
        head: true,
      },
    };
  }

  render() {
    const {
      classes,
      className: classNameProp,
      children,
      component: ComponentProp,
      ...other
    } = this.props;
    const className = classNames(classes.root, classNameProp);

    return (
      <ComponentProp className={className} {...other}>
        {children}
      </ComponentProp>
    );
  }
}

TableHead.childContextTypes = {
  table: PropTypes.object,
};

export default withStyles(styles, { name: 'MuiTableHead' })(TableHead);
