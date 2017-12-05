// @flow

import React from 'react';
import PropTypes from 'prop-types';
import type { ElementType, Node } from 'react';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import { capitalizeFirstLetter } from '../utils/helpers';
import { darken, fade, lighten } from '../styles/colorManipulator';

export type Context = {
  table: Object,
};

export type Padding = 'default' | 'checkbox' | 'dense' | 'none';

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
   * The table cell contents.
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
   * If `true`, content will align to the right.
   */
  numeric: boolean,
  /**
   * Sets the padding applied to the cell.
   */
  padding: Padding,
};

export const styles = (theme: Object) => ({
  root: {
    // Workaround for a rendering bug with spanned columns in Chrome 62.0.
    // Removes the alpha (sets it to 1), and lightens or darkens the theme color.
    borderBottom: `1px solid
    ${
      theme.palette.type === 'light'
        ? lighten(fade(theme.palette.text.lightDivider, 1), 0.925)
        : darken(fade(theme.palette.text.lightDivider, 1), 0.685)
    }`,
    textAlign: 'left',
  },
  numeric: {
    textAlign: 'right',
    flexDirection: 'row-reverse', // can be dynamically inherited at runtime by contents
  },
  head: {
    fontWeight: theme.typography.fontWeightMedium,
    position: 'relative', // Workaround for Tooltip positioning issue.
  },
  paddingDefault: {
    padding: `${theme.spacing.unit / 2}px ${theme.spacing.unit * 7}px ${theme.spacing.unit /
      2}px ${theme.spacing.unit * 3}px`,
    '&:last-child': {
      paddingRight: theme.spacing.unit * 3,
    },
  },
  paddingDense: {
    paddingRight: theme.spacing.unit * 3,
  },
  paddingCheckbox: {
    padding: '0 12px',
  },
  footer: {
    borderBottom: 0,
  },
});

class TableCell extends React.Component<ProvidedProps & Props> {
  static defaultProps = {
    numeric: false,
    padding: 'default',
  };

  static contextTypes = {
    table: PropTypes.object.isRequired,
  };

  context: Context;

  render() {
    const {
      classes,
      className: classNameProp,
      children,
      numeric,
      padding,
      component,
      ...other
    } = this.props;

    const { table } = this.context;
    let Component;
    if (component) {
      Component = component;
    } else {
      Component = table && table.head ? 'th' : 'td';
    }

    const className = classNames(
      classes.root,
      {
        [classes.numeric]: numeric,
        [classes[`padding${capitalizeFirstLetter(padding)}`]]:
          padding !== 'none' && padding !== 'default',
        [classes.paddingDefault]: padding !== 'none',
        [classes.head]: table && table.head,
        [classes.footer]: table && table.footer,
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

export default withStyles(styles, { name: 'MuiTableCell' })(TableCell);
