// @flow

import React from 'react';
import type { Node, ElementType } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';

export const styles = (theme: Object) => ({
  root: {
    color: 'inherit',
    display: 'table-row',
    height: 48,
    '&:focus': {
      outline: 'none',
    },
    verticalAlign: 'middle',
  },
  head: {
    height: 56,
  },
  footer: {
    height: 56,
  },
  hover: {
    '&:hover': {
      background: theme.palette.background.contentFrame,
    },
  },
  selected: {
    background: theme.palette.background.appBar,
  },
});

export type Context = {
  table: Object,
};

type ProvidedProps = {
  classes: Object,
  /**
   * @ignore
   */
  theme?: Object,
};

export type Props = {
  /**
   * Other base element props.
   */
  [otherProp: string]: any,
  /**
   * Should be valid `<tr>` children such as `TableCell`.
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
  component: ElementType,
  /**
   * If `true`, the table row will shade on hover.
   */
  hover: boolean,
  /**
   * If `true`, the table row will have the selected shading.
   */
  selected: boolean,
};

/**
 * Will automatically set dynamic row height
 * based on the material table element parent (head, body, etc).
 */
class TableRow extends React.Component<ProvidedProps & Props> {
  static defaultProps = {
    hover: false,
    selected: false,
    component: ('tr': ElementType),
  };

  static contextTypes = {
    table: PropTypes.object,
  };

  context: Context;

  render() {
    const {
      classes,
      className: classNameProp,
      children,
      component: Component,
      hover,
      selected,
      ...other
    } = this.props;
    const { table } = this.context;

    const className = classNames(
      classes.root,
      {
        [classes.head]: table && table.head,
        [classes.footer]: table && table.footer,
        [classes.hover]: table && hover,
        [classes.selected]: table && selected,
      },
      classNameProp,
    );

    return (
      <Component className={className} {...other}>
        {children}
      </Component>
    );
  }
}

export default withStyles(styles, { name: 'MuiTableRow' })(TableRow);
