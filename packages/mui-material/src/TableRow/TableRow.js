'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { alpha } from '@mui/system/colorManipulator';
import Tablelvl2Context from '../Table/Tablelvl2Context';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import tableRowClasses, { getTableRowUtilityClass } from './tableRowClasses';

const useUtilityClasses = (ownerState) => {
  const { classes, selected, hover, head, footer } = ownerState;

  const slots = {
    root: ['root', selected && 'selected', hover && 'hover', head && 'head', footer && 'footer'],
  };

  return composeClasses(slots, getTableRowUtilityClass, classes);
};

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const TableRowRoot = styled('tr', {
  name: 'MuiTableRow',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.root, ownerState.head && styles.head, ownerState.footer && styles.footer];
  },
})
(memoTheme(({ theme }) => {
  return {
    color: 'inherit',
    display: 'table-row',
    verticalAlign: 'middle',
    outline: 0,
    [`&.${tableRowClasses.hover}:hover`]: {
      backgroundColor: (theme.vars || theme).palette.action.hover,
    },
    [`&.${tableRowClasses.selected}`]: {
      backgroundColor: theme.vars
        ? `rgba(${theme.vars.palette.primary.mainChannel} / ${clamp(
            theme.vars.palette.action.selectedOpacity,
            0,
            1
          )})`
        : alpha(
            theme.palette.primary.main,
            clamp(theme.palette.action.selectedOpacity, 0, 1)
          ),
      '&:hover': {
        backgroundColor: theme.vars
          ? `rgba(${theme.vars.palette.primary.mainChannel} / ${clamp(
              theme.vars.palette.action.selectedOpacity + theme.vars.palette.action.hoverOpacity,
              0,
              1
            )})`
          : alpha(
              theme.palette.primary.main,
              clamp(
                theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity,
                0,
                1
              )
            ),
      },
    },
  };
}));


const defaultComponent = 'tr';
/**
 * Will automatically set dynamic row height
 * based on the material table element parent (head, body, etc).
 */
const TableRow = React.forwardRef(function TableRow(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiTableRow' });
  const {
    className,
    component = defaultComponent,
    hover = false,
    selected = false,
    ...other
  } = props;
  const tablelvl2 = React.useContext(Tablelvl2Context);

  const ownerState = {
    ...props,
    component,
    hover,
    selected,
    head: tablelvl2 && tablelvl2.variant === 'head',
    footer: tablelvl2 && tablelvl2.variant === 'footer',
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <TableRowRoot
      as={component}
      ref={ref}
      className={clsx(classes.root, className)}
      role={component === defaultComponent ? null : 'row'}
      ownerState={ownerState}
      {...other}
    />
  );
});

TableRow.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Should be valid `<tr>` children such as `TableCell`.
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the table row will shade on hover.
   * @default false
   */
  hover: PropTypes.bool,
  /**
   * If `true`, the table row will have the selected shading.
   * @default false
   */
  selected: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default TableRow;
