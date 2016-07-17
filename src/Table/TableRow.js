import React, { PropTypes } from 'react';
import { createStyleSheet } from 'stylishly/lib/styleSheet';
import ClassNames from 'classnames';

export const styleSheet = createStyleSheet('TableRow', (theme) => {
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
    hover: {
      '&:hover': {
        background: theme.palette.background.contentFrame,
      },
    },
    selected: {
      background: theme.palette.background.appBar,
    },
  };
});

export default function TableRow(props, context) {
  const { className, children, hover, selected, ...other } = props;
  const { table, styleManager } = context;
  const classes = styleManager.render(styleSheet);

  const classNames = ClassNames(classes.root, {
    [classes.head]: table && table.head,
    [classes.footer]: table && table.footer,
    [classes.hover]: table && hover,
    [classes.selected]: table && selected,
  }, className);

  return (
    <tr className={classNames} {...other}>
      {children}
    </tr>
  );
}

TableRow.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  hover: PropTypes.bool,
  selected: PropTypes.bool,
};

TableRow.contextTypes = {
  table: PropTypes.object,
  styleManager: PropTypes.object.isRequired,
};
