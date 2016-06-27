import React, {Component, PropTypes} from 'react';
import {createStyleSheet} from 'stylishly/lib/styleSheet';
import ClassNames from 'classnames';

export const styleSheet = createStyleSheet('TableRow', () => {
  return {
    root: {
      height: 48,
    },
    head: {
      height: 64,
    },
    footer: {
      height: 56,
    },
  };
});

export default class TableRow extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  static contextTypes = {
    table: PropTypes.object,
    styleManager: PropTypes.object.isRequired,
  };

  render() {
    const {className, children, ...other} = this.props;
    const {table, styleManager} = this.context;
    const classes = styleManager.render(styleSheet);

    const classNames = ClassNames(classes.root, {
      [classes.head]: table && table.head,
      [classes.footer]: table && table.footer,
    }, className);

    return (
      <tr className={classNames} {...other}>
        {children}
      </tr>
    );
  }
}
