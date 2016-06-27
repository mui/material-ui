import React, {Component, PropTypes} from 'react';
import {createStyleSheet} from 'stylishly/lib/styleSheet';
import ClassNames from 'classnames';

export const styleSheet = createStyleSheet('TableCell', (theme) => {
  return {
    root: {
      borderBottom: `1px solid ${theme.palette.text.lightDivider}`,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      padding: '0 56px 0 24px',
      '&:last-child': {
        paddingRight: 24,
      },
      '& compact': {
        paddingRight: 24,
      },
      textAlign: 'left',
    },
    numeric: {
      textAlign: 'right',
    },
    head: {
      whiteSpace: 'pre',
    },
    footer: {},
  };
});

export default class TableCell extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    compact: PropTypes.bool,
    numeric: PropTypes.bool,
  };

  static contextTypes = {
    table: PropTypes.object,
    styleManager: PropTypes.object.isRequired,
  };

  render() {
    const {className, children, compact, numeric, ...other} = this.props;
    const {table, styleManager} = this.context;
    const classes = styleManager.render(styleSheet);

    const el = table && table.head ? 'th' : 'td';

    const classNames = ClassNames(classes.root, {
      [classes.numeric]: numeric,
      [classes.compact]: compact,
      [classes.head]: table && table.head,
      [classes.footer]: table && table.footer,
    }, className);

    return React.createElement(el, {
      className: classNames,
      ...other,
    }, children);
  }
}
