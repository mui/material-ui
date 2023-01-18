import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { useThemeProps } from '../styles';
import { useColorInversion } from '../styles/ColorInversion';
import styled from '../styles/styled';
import { getTableUtilityClass } from './tableClasses';
import { TableProps, TableOwnerState, TableTypeMap } from './TableProps';
import typographyClasses from '../Typography/typographyClasses';
import { TypographyContext } from '../Typography/Typography';

const useUtilityClasses = (ownerState: TableOwnerState) => {
  const { size, variant, color, borderAxis, stickyHeader } = ownerState;
  const slots = {
    root: [
      'root',
      stickyHeader && 'stickyHeader',
      borderAxis && `borderAxis${capitalize(borderAxis)}`,
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
      size && `size${capitalize(size)}`,
    ],
  };

  return composeClasses(slots, getTableUtilityClass, {});
};

const tableSelector = {
  getColumn(col: number | string) {
    return `& tr *:nth-child(${col})`;
  },
  /**
   * Except last column
   */
  getColumnExceptLast() {
    return '& tr > *:not(:last-child)';
  },
  /**
   * Every cell in the table
   */
  getCell() {
    return '& th, & td';
  },
  /**
   * `th` cell of the table (could exist in the body)
   */
  getHeadCell() {
    return '& th';
  },
  /**
   * Only the cell of `thead`
   */
  getHeaderCell() {
    return '& thead th, & tr:first-of-type th';
  },
  /**
   * The body cell that contains data
   */
  getDataCell() {
    return '& td';
  },
  /**
   * The body cell either `td` or `th`
   */
  getBodyCell() {
    return `${this.getDataCell()}, & th[scope="row"]`;
  },
  getBodyRow(row?: number | string) {
    if (row === undefined) {
      return `& tbody tr`;
    }
    return `& tbody tr:nth-child(${row})`;
  },
};

const TableRoot = styled('table', {
  name: 'JoyTable',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: TableOwnerState }>(({ theme, ownerState }) => [
  {
    '--TableCell-borderColor': theme.vars.palette.divider,
    '--TableCell-headBackground': `var(--Sheet-background, ${theme.vars.palette.background.surface})`,
    ...(ownerState.size === 'sm' && {
      '--TableCell-height': '32px',
      '--TableCell-paddingX': '0.25rem',
      '--TableCell-paddingY': '0.25rem',
      fontSize: theme.vars.fontSize.xs,
    }),
    ...(ownerState.size === 'md' && {
      '--TableCell-height': '40px',
      '--TableCell-paddingX': '0.5rem',
      '--TableCell-paddingY': '0.375rem',
      fontSize: theme.vars.fontSize.sm,
    }),
    ...(ownerState.size === 'lg' && {
      '--TableCell-height': '48px',
      '--TableCell-paddingX': '0.75rem',
      '--TableCell-paddingY': '0.5rem',
      fontSize: theme.vars.fontSize.md,
    }),
    tableLayout: 'fixed',
    width: '100%',
    borderSpacing: '0px',
    borderCollapse: 'separate',
    ...theme.variants[ownerState.variant!]?.[ownerState.color!],
    '& caption': {
      color: theme.vars.palette.text.tertiary,
      padding: 'var(--TableCell-paddingY) var(--TableCell-paddingX)',
    },
    [tableSelector.getDataCell()]: {
      padding: 'var(--TableCell-paddingY) var(--TableCell-paddingX)',
      height: 'var(--TableCell-height)',
      borderColor: 'var(--TableCell-borderColor)', // must come after border bottom
    },
    [tableSelector.getHeadCell()]: {
      textAlign: 'left',
      padding: 'var(--TableCell-paddingY) var(--TableCell-paddingX)',
      backgroundColor: 'var(--TableCell-headBackground)',
      verticalAlign: 'bottom',
      height: 'var(--TableCell-height)',
      fontWeight: theme.vars.fontWeight.lg,
      borderColor: 'var(--TableCell-borderColor)', // must come after border bottom
      color: theme.vars.palette.text.secondary,
    },
  },
  (ownerState.borderAxis === 'x' || ownerState.borderAxis === 'both') && {
    [tableSelector.getHeaderCell()]: {
      borderBottomWidth: 2,
      borderBottomStyle: 'solid',
    },
    [tableSelector.getBodyCell()]: {
      borderBottomWidth: 1,
      borderBottomStyle: 'solid',
    },
  },
  (ownerState.borderAxis === 'y' || ownerState.borderAxis === 'both') && {
    [tableSelector.getColumnExceptLast()]: {
      borderRightWidth: 1,
      borderRightStyle: 'solid',
    },
  },
  ownerState.striped && {
    [tableSelector.getBodyRow(ownerState.striped)]: {
      backgroundColor: theme.vars.palette.background.level1,
    },
  },
  ownerState.hover && {
    [tableSelector.getBodyRow()]: {
      '&:hover': {
        backgroundColor: `var(--TableRow-hoverBackground, ${theme.vars.palette.background.level2})`,
      },
    },
  },
  ownerState.stickyHeader && {
    [tableSelector.getHeadCell()]: {
      position: 'sticky',
      top: 0,
    },
  },
  {
    // Typography integration
    [tableSelector.getCell()]: {
      [`& .${typographyClasses.noWrap}`]: {
        display: 'block',
      },
    },
  },
]);

const Table = React.forwardRef(function Table(inProps, ref) {
  const props = useThemeProps<typeof inProps & TableProps>({
    props: inProps,
    name: 'JoyTable',
  });

  const {
    className,
    component,
    children,
    borderAxis = 'x',
    size = 'md',
    variant = 'plain',
    color: colorProp,
    striped,
    stickyHeader = false,
    ...other
  } = props;
  const { getColor } = useColorInversion(variant);
  const color = getColor(colorProp, 'neutral');

  const ownerState = {
    ...props,
    borderAxis,
    component,
    size,
    color,
    variant,
    striped,
    stickyHeader,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <TypographyContext.Provider value>
      <TableRoot
        as={component}
        ownerState={ownerState}
        className={clsx(classes.root, className)}
        ref={ref}
        {...other}
      >
        {children}
      </TableRoot>
    </TypographyContext.Provider>
  );
}) as OverridableComponent<TableTypeMap>;

Table.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Used to render icon or text elements inside the Table if `src` is not set.
   * This can be an element, or just a string.
   */
  children: PropTypes.node,
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
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
} as any;

export default Table;
