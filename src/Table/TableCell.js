import React, { PropTypes } from 'react';
import { createStyleSheet } from 'stylishly/lib/styleSheet';
import ClassNames from 'classnames';

export const styleSheet = createStyleSheet('TableCell', (theme) => {
  return {
    root: {
      borderBottom: `1px solid ${theme.palette.text.lightDivider}`,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      textAlign: 'left',
      '& numeric': {
        textAlign: 'right',
        flexDirection: 'row-reverse', // can be dynamically inherited at runtime by contents
      },
      '& head': {
        whiteSpace: 'pre',
      },
    },
    padding: {
      padding: '0 56px 0 24px',
      '&:last-child': {
        paddingRight: 24,
      },
      '& compact': {
        paddingRight: 24,
      },
      '& checkbox': {
        paddingLeft: 12,
        paddingRight: 0,
      },
    },
    footer: {},
  };
});

export default function TableCell(props, context) {
  const { className, children, compact, checkbox, numeric, padding, ...other } = props;
  const { table, styleManager } = context;
  const classes = styleManager.render(styleSheet);

  const component = table && table.head ? 'th' : 'td';

  const classNames = ClassNames(classes.root, {
    [classes.numeric]: numeric,
    [classes.compact]: compact,
    [classes.checkbox]: checkbox,
    [classes.padding]: padding,
    [classes.head]: table && table.head,
    [classes.footer]: table && table.footer,
  }, className);

  return React.createElement(component, {
    className: classNames,
    ...other,
  }, children);
}

TableCell.propTypes = {
  checkbox: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  compact: PropTypes.bool,
  numeric: PropTypes.bool,
  padding: PropTypes.bool,
};

TableCell.defaultProps = {
  padding: true,
};

TableCell.contextTypes = {
  table: PropTypes.object,
  styleManager: PropTypes.object.isRequired,
};
