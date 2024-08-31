'use client';
import composeClasses from '@mui/utils/composeClasses';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as React from 'react';
import ButtonBase from '../ButtonBase';
import ArrowDownwardIcon from '../internal/svg-icons/ArrowDownward';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import capitalize from '../utils/capitalize';
import tableSortLabelClasses, { getTableSortLabelUtilityClass } from './tableSortLabelClasses';

const useUtilityClasses = (ownerState) => {
  const { classes, direction, active } = ownerState;

  const slots = {
    root: ['root', active && 'active', `direction${capitalize(direction)}`],
    icon: ['icon', `iconDirection${capitalize(direction)}`],
  };

  return composeClasses(slots, getTableSortLabelUtilityClass, classes);
};

const TableSortLabelRoot = styled(ButtonBase, {
  name: 'MuiTableSortLabel',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.root, ownerState.active && styles.active];
  },
})(
  memoTheme(({ theme }) => ({
    cursor: 'pointer',
    display: 'inline-flex',
    justifyContent: 'flex-start',
    flexDirection: 'inherit',
    alignItems: 'center',
    '&:focus': {
      color: (theme.vars || theme).palette.text.secondary,
    },
    '&:hover': {
      color: (theme.vars || theme).palette.text.secondary,
      [`& .${tableSortLabelClasses.icon}`]: {
        opacity: 0.5,
      },
    },
    [`&.${tableSortLabelClasses.active}`]: {
      color: (theme.vars || theme).palette.text.primary,
      [`& .${tableSortLabelClasses.icon}`]: {
        opacity: 1,
        color: (theme.vars || theme).palette.text.secondary,
      },
    },
  })),
);

const TableSortLabelIcon = styled('span', {
  name: 'MuiTableSortLabel',
  slot: 'Icon',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.icon, styles[`iconDirection${capitalize(ownerState.direction)}`]];
  },
})(
  memoTheme(({ theme }) => ({
    fontSize: 18,
    marginRight: 4,
    marginLeft: 4,
    opacity: 0,
    transition: theme.transitions.create(['opacity', 'transform'], {
      duration: theme.transitions.duration.shorter,
    }),
    userSelect: 'none',
    variants: [
      {
        props: {
          direction: 'desc',
        },
        style: {
          transform: 'rotate(0deg)',
        },
      },
      {
        props: {
          direction: 'asc',
        },
        style: {
          transform: 'rotate(180deg)',
        },
      },
    ],
  })),
);

/**
 * A button based label for placing inside `TableCell` for column sorting.
 */
const TableSortLabel = React.forwardRef(function TableSortLabel(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiTableSortLabel' });
  const {
    active = false,
    children,
    className,
    direction = 'asc',
    hideSortIcon = false,
    IconComponent = ArrowDownwardIcon,
    ...other
  } = props;

  const ownerState = {
    ...props,
    active,
    direction,
    hideSortIcon,
    IconComponent,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <TableSortLabelRoot
      className={clsx(classes.root, className)}
      component="span"
      disableRipple
      ownerState={ownerState}
      ref={ref}
      {...other}
    >
      {children}
      {hideSortIcon && !active ? null : (
        <TableSortLabelIcon
          as={IconComponent}
          className={clsx(classes.icon)}
          ownerState={ownerState}
        />
      )}
    </TableSortLabelRoot>
  );
});

TableSortLabel.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, the label will have the active styling (should be true for the sorted column).
   * @default false
   */
  active: PropTypes.bool,
  /**
   * Label contents, the arrow will be appended automatically.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The current sort direction.
   * @default 'asc'
   */
  direction: PropTypes.oneOf(['asc', 'desc']),
  /**
   * Hide sort icon when active is false.
   * @default false
   */
  hideSortIcon: PropTypes.bool,
  /**
   * Sort icon to use.
   * @default ArrowDownwardIcon
   */
  IconComponent: PropTypes.elementType,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default TableSortLabel;
