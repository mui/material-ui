import React, { PropTypes } from 'react';
import { createStyleSheet } from 'stylishly';
import ClassNames from 'classnames';

export const styleSheet = createStyleSheet('TableSortLabel', (theme) => {
  return {
    root: {
      cursor: 'pointer',
      display: 'inline-flex',
      justifyContent: 'flex-start',
      flexDirection: 'inherit',
      alignItems: 'center',
      '&:hover': {
        color: theme.palette.text.primary,
      },
      '& active': {
        color: theme.palette.text.primary,
        icon: {
          opacity: 1,
        },
      },
    },
    icon: {
      fontSize: 16,
      marginRight: 4,
      marginLeft: 4,
      opacity: 0,
      transition: theme.transitions.create(['opacity', 'transform'], '200ms'),
      userSelect: 'none',
    },
    desc: {
      transform: 'rotate(0deg)',
    },
    asc: {
      transform: 'rotate(180deg)',
    },
  };
});

export default function TableSortLabel(props, context) {
  const { active, className, children, direction, ...other } = props;
  const classes = context.styleManager.render(styleSheet, { group: 'mui' });
  const classNames = ClassNames(classes.root, {
    [classes.active]: active,
  }, className);
  const iconClasses = ClassNames(classes.icon, {
    [classes[direction]]: !!direction,
  }, 'material-icons');
  return (
    <span className={classNames} {...other} role="button">
      {children}
      <span className={iconClasses}>arrow_downward</span>
    </span>
  );
}

TableSortLabel.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.any,
  className: PropTypes.string,
  direction: PropTypes.string.isRequired,
};

TableSortLabel.defaultProps = {
  direction: 'desc',
};

TableSortLabel.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
