import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import ArrowDownwardIcon from '../internal/svg-icons/ArrowDownward';
import withStyles from '../styles/withStyles';
import ButtonBase from '../ButtonBase';
import capitalize from '../utils/capitalize';

export const styles = (theme) => ({
  /* Styles applied to the root element. */
  root: {
    cursor: 'pointer',
    display: 'inline-flex',
    justifyContent: 'flex-start',
    flexDirection: 'inherit',
    alignItems: 'center',
    '&:focus': {
      color: theme.palette.text.secondary,
    },
    '&:hover': {
      color: theme.palette.text.secondary,
      '& $icon': {
        opacity: 0.5,
      },
    },
    '&$active': {
      color: theme.palette.text.primary,
      // && instead of & is a workaround for https://github.com/cssinjs/jss/issues/1045
      '&& $icon': {
        opacity: 1,
        color: theme.palette.text.secondary,
      },
    },
  },
  /* Pseudo-class applied to the root element if `active={true}`. */
  active: {},
  /* Styles applied to the icon component. */
  icon: {
    fontSize: 18,
    marginRight: 4,
    marginLeft: 4,
    opacity: 0,
    transition: theme.transitions.create(['opacity', 'transform'], {
      duration: theme.transitions.duration.shorter,
    }),
    userSelect: 'none',
  },
  /* Styles applied to the icon component if `direction="desc"`. */
  iconDirectionDesc: {
    transform: 'rotate(0deg)',
  },
  /* Styles applied to the icon component if `direction="asc"`. */
  iconDirectionAsc: {
    transform: 'rotate(180deg)',
  },
});

/**
 * A button based label for placing inside `TableCell` for column sorting.
 */
const TableSortLabel = React.forwardRef(function TableSortLabel(props, ref) {
  const {
    active = false,
    children,
    classes,
    className,
    direction = 'asc',
    hideSortIcon = false,
    IconComponent = ArrowDownwardIcon,
    ...other
  } = props;

  return (
    <ButtonBase
      className={clsx(classes.root, { [classes.active]: active }, className)}
      component="span"
      disableRipple
      ref={ref}
      {...other}
    >
      {children}
      {hideSortIcon && !active ? null : (
        <IconComponent
          className={clsx(classes.icon, classes[`iconDirection${capitalize(direction)}`])}
        />
      )}
    </ButtonBase>
  );
});

TableSortLabel.propTypes = {
  /**
   * If `true`, the label will have the active styling (should be true for the sorted column).
   */
  active: PropTypes.bool,
  /**
   * Label contents, the arrow will be appended automatically.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The current sort direction.
   */
  direction: PropTypes.oneOf(['asc', 'desc']),
  /**
   * Hide sort icon when active is false.
   */
  hideSortIcon: PropTypes.bool,
  /**
   * Sort icon to use.
   */
  IconComponent: PropTypes.elementType,
};

export default withStyles(styles, { name: 'MuiTableSortLabel' })(TableSortLabel);
