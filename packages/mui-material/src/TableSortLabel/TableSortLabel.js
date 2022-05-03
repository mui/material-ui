import { unstable_composeClasses as composeClasses } from '@mui/base';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as React from 'react';
import ButtonBase from '../ButtonBase';
import ArrowDownwardIcon from '../internal/svg-icons/ArrowDownward';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import capitalize from '../utils/capitalize';
import tableSortLabelClasses, { getTableSortLabelUtilityClass } from './tableSortLabelClasses';

const useUtilityClasses = (ownerState) => {
  const { classes, direction, active } = ownerState;

  const slots = {
    root: ['root', active && 'active'],
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
})(({ theme }) => ({
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
    [`& .${tableSortLabelClasses.icon}`]: {
      opacity: 0.5,
    },
  },
  [`&.${tableSortLabelClasses.active}`]: {
    color: theme.palette.text.primary,
    [`& .${tableSortLabelClasses.icon}`]: {
      opacity: 1,
      color: theme.palette.text.secondary,
    },
  },
}));

const TableSortLabelIcon = styled('span', {
  name: 'MuiTableSortLabel',
  slot: 'Icon',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.icon, styles[`iconDirection${capitalize(ownerState.direction)}`]];
  },
})(({ theme, ownerState }) => ({
  fontSize: 18,
  marginRight: 4,
  marginLeft: 4,
  opacity: 0,
  transition: theme.transitions.create(['opacity', 'transform'], {
    duration: theme.transitions.duration.shorter,
  }),
  userSelect: 'none',
  ...(ownerState.direction === 'desc' && {
    transform: 'rotate(0deg)',
  }),
  ...(ownerState.direction === 'asc' && {
    transform: 'rotate(180deg)',
  }),
}));

/**
 * A button based label for placing inside `TableCell` for column sorting.
 */
const TableSortLabel = React.forwardRef(function TableSortLabel(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiTableSortLabel' });
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
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
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
    PropTypes.any,
    PropTypes.func,
    PropTypes.object,
    PropTypes.shape({
      '__@iterator@91': PropTypes.func.isRequired,
      concat: PropTypes.func.isRequired,
      entries: PropTypes.func.isRequired,
      every: PropTypes.func.isRequired,
      filter: PropTypes.func.isRequired,
      find: PropTypes.func.isRequired,
      findIndex: PropTypes.func.isRequired,
      flat: PropTypes.func.isRequired,
      flatMap: PropTypes.func.isRequired,
      forEach: PropTypes.func.isRequired,
      includes: PropTypes.func.isRequired,
      indexOf: PropTypes.func.isRequired,
      join: PropTypes.func.isRequired,
      keys: PropTypes.func.isRequired,
      lastIndexOf: PropTypes.func.isRequired,
      length: PropTypes.number.isRequired,
      map: PropTypes.func.isRequired,
      reduce: PropTypes.func.isRequired,
      reduceRight: PropTypes.func.isRequired,
      slice: PropTypes.func.isRequired,
      some: PropTypes.func.isRequired,
      toLocaleString: PropTypes.func.isRequired,
      toString: PropTypes.func.isRequired,
      values: PropTypes.func.isRequired,
    }),
  ]),
};

export default TableSortLabel;
