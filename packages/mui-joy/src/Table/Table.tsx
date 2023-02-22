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
import { TypographyInheritContext } from '../Typography/Typography';

const useUtilityClasses = (ownerState: TableOwnerState) => {
  const { size, variant, color, borderAxis, stickyHeader, noWrap, hoverRow } = ownerState;
  const slots = {
    root: [
      'root',
      stickyHeader && 'stickyHeader',
      noWrap && 'noWrap',
      hoverRow && 'hoverRow',
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
    if (typeof col === 'number' && col < 0) {
      return `& tr > *:nth-last-child(${Math.abs(col)})`;
    }
    return `& tr > *:nth-child(${col})`;
  },
  /**
   * Except first column
   */
  getColumnExceptFirst() {
    return '& tr > *:not(:first-child)';
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
    return '& thead th';
  },
  getHeaderCellOfRow(row: number | string) {
    return `& thead tr:nth-child(${row}) th`;
  },
  getBottomHeaderCell() {
    return '& thead th:not([colspan])';
  },
  getHeaderNestedFirstColumn() {
    return '& thead tr:not(:first-of-type) th:not([colspan]):first-child';
  },
  /**
   * The body cell that contains data
   */
  getDataCell() {
    return '& td';
  },
  getDataCellExceptLastRow() {
    return '& tr:not(:last-child) > td';
  },
  /**
   * The body cell either `td` or `th`
   */
  getBodyCellExceptLastRow() {
    return `${this.getDataCellExceptLastRow()}, & tr:not(:last-child) > th[scope="row"]`;
  },
  getBodyCellOfRow(row: number | string) {
    if (typeof row === 'number' && row < 0) {
      return `& tbody tr:nth-last-child(${Math.abs(row)}) td, & tbody tr:nth-last-child(${Math.abs(
        row,
      )}) th[scope="row"]`;
    }
    return `& tbody tr:nth-child(${row}) td, & tbody tr:nth-child(${row}) th[scope="row"]`;
  },
  getBodyRow(row?: number | string) {
    if (row === undefined) {
      return `& tbody tr`;
    }
    return `& tbody tr:nth-child(${row})`;
  },
  getFooterCell() {
    return '& tfoot th, & tfoot td';
  },
};

const TableRoot = styled('table', {
  name: 'JoyTable',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: TableOwnerState }>(({ theme, ownerState }) => {
  const variantStyle = theme.variants[ownerState.variant!]?.[ownerState.color!];
  return [
    {
      '--Table-headerUnderlineThickness': '2px',
      '--TableCell-borderColor': variantStyle?.borderColor ?? theme.vars.palette.divider,
      '--TableCell-headBackground': `var(--Sheet-background, ${theme.vars.palette.background.surface})`,
      ...(ownerState.size === 'sm' && {
        '--private_TableCell-height': 'var(--TableCell-height, 32px)',
        '--TableCell-paddingX': '0.25rem',
        '--TableCell-paddingY': '0.25rem',
        fontSize: theme.vars.fontSize.xs,
      }),
      ...(ownerState.size === 'md' && {
        '--private_TableCell-height': 'var(--TableCell-height, 40px)',
        '--TableCell-paddingX': '0.5rem',
        '--TableCell-paddingY': '0.375rem',
        fontSize: theme.vars.fontSize.sm,
      }),
      ...(ownerState.size === 'lg' && {
        '--private_TableCell-height': 'var(--TableCell-height, 48px)',
        '--TableCell-paddingX': '0.75rem',
        '--TableCell-paddingY': '0.5rem',
        fontSize: theme.vars.fontSize.md,
      }),
      tableLayout: 'fixed',
      width: '100%',
      borderSpacing: '0px',
      borderCollapse: 'separate',
      color: theme.vars.palette.text.primary,
      ...theme.variants[ownerState.variant!]?.[ownerState.color!],
      '& caption': {
        color: theme.vars.palette.text.tertiary,
        padding: 'calc(2 * var(--TableCell-paddingY)) var(--TableCell-paddingX)',
      },
      [tableSelector.getDataCell()]: {
        padding: 'var(--TableCell-paddingY) var(--TableCell-paddingX)',
        height: 'var(--private_TableCell-height)',
        borderColor: 'var(--TableCell-borderColor)', // must come after border bottom
        backgroundColor: 'var(--TableCell-dataBackground)', // use `background-color` in case the Sheet has gradient background
        ...(ownerState.noWrap && {
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        }),
      },
      [tableSelector.getHeadCell()]: {
        textAlign: 'left',
        padding: 'var(--TableCell-paddingY) var(--TableCell-paddingX)',
        backgroundColor: 'var(--TableCell-headBackground)', // use `background-color` in case the Sheet has gradient background
        height: 'var(--private_TableCell-height)',
        fontWeight: theme.vars.fontWeight.lg,
        borderColor: 'var(--TableCell-borderColor)',
        color: theme.vars.palette.text.secondary,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
      },
      [tableSelector.getHeaderCell()]: {
        verticalAlign: 'bottom',
        // Automatic radius adjustment with Sheet
        '&:first-child': {
          borderTopLeftRadius: 'var(--TableCell-cornerRadius, var(--unstable_action-radius))',
        },
        '&:last-child': {
          borderTopRightRadius: 'var(--TableCell-cornerRadius, var(--unstable_action-radius))',
        },
      },
      '& tfoot tr > *': {
        backgroundColor: `var(--TableCell-footBackground, ${theme.vars.palette.background.level1})`,
        // Automatic radius adjustment with Sheet
        '&:first-child': {
          borderBottomLeftRadius: 'var(--TableCell-cornerRadius, var(--unstable_action-radius))',
        },
        '&:last-child': {
          borderBottomRightRadius: 'var(--TableCell-cornerRadius, var(--unstable_action-radius))',
        },
      },
    },
    (ownerState.borderAxis?.startsWith('x') || ownerState.borderAxis?.startsWith('both')) && {
      // insert border between rows
      [tableSelector.getHeaderCell()]: {
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
      },
      [tableSelector.getBottomHeaderCell()]: {
        borderBottomWidth: 'var(--Table-headerUnderlineThickness)',
        borderBottomStyle: 'solid',
      },
      [tableSelector.getBodyCellExceptLastRow()]: {
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
      },
      [tableSelector.getFooterCell()]: {
        borderTopWidth: 1,
        borderTopStyle: 'solid',
      },
    },
    (ownerState.borderAxis?.startsWith('y') || ownerState.borderAxis?.startsWith('both')) && {
      // insert border between columns
      [`${tableSelector.getColumnExceptFirst()}, ${tableSelector.getHeaderNestedFirstColumn()}`]: {
        borderLeftWidth: 1,
        borderLeftStyle: 'solid',
      },
    },
    (ownerState.borderAxis === 'x' || ownerState.borderAxis === 'both') && {
      // insert border at the top of header and bottom of body
      [tableSelector.getHeaderCellOfRow(1)]: {
        borderTopWidth: 1,
        borderTopStyle: 'solid',
      },
      [tableSelector.getBodyCellOfRow(-1)]: {
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
      },
      [tableSelector.getFooterCell()]: {
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
      },
    },
    (ownerState.borderAxis === 'y' || ownerState.borderAxis === 'both') && {
      // insert border on the left of first column and right of the last column
      [tableSelector.getColumn(1)]: {
        borderLeftWidth: 1,
        borderLeftStyle: 'solid',
      },
      [tableSelector.getColumn(-1)]: {
        borderRightWidth: 1,
        borderRightStyle: 'solid',
      },
    },
    ownerState.stripe && {
      [tableSelector.getBodyRow(ownerState.stripe)]: {
        // For customization, a table cell can look for this variable with a fallback value.
        background: `var(--TableRow-stripeBackground, ${theme.vars.palette.background.level1})`,
        color: theme.vars.palette.text.primary,
      },
    },
    ownerState.hoverRow && {
      [tableSelector.getBodyRow()]: {
        '&:hover': {
          background: `var(--TableRow-hoverBackground, ${theme.vars.palette.background.level2})`,
        },
      },
    },
    ownerState.stickyHeader && {
      // The column header
      [tableSelector.getHeadCell()]: {
        position: 'sticky',
        top: 0,
      },
      [tableSelector.getHeaderCell()]: {
        zIndex: theme.vars.zIndex.table,
      },
      [tableSelector.getHeaderCellOfRow(2)]: {
        // support upto 2 rows for the sticky header
        top: 'var(--private_TableCell-height)',
      },
    },
  ];
});
/**
 *
 * Demos:
 *
 * - [Table](https://mui.com/joy-ui/react-table/)
 *
 * API:
 *
 * - [Table API](https://mui.com/joy-ui/api/table/)
 */
const Table = React.forwardRef(function Table(inProps, ref) {
  const props = useThemeProps<typeof inProps & TableProps>({
    props: inProps,
    name: 'JoyTable',
  });

  const {
    className,
    component,
    children,
    borderAxis = 'xBetween',
    hoverRow = false,
    noWrap = false,
    size = 'md',
    variant = 'plain',
    color: colorProp = 'neutral',
    stripe,
    stickyHeader = false,
    ...other
  } = props;
  const { getColor } = useColorInversion(variant);
  const color = getColor(inProps.color, colorProp);

  const ownerState = {
    ...props,
    borderAxis,
    hoverRow,
    noWrap,
    component,
    size,
    color,
    variant,
    stripe,
    stickyHeader,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <TypographyInheritContext.Provider value>
      <TableRoot
        as={component}
        ownerState={ownerState}
        className={clsx(classes.root, className)}
        ref={ref}
        {...other}
      >
        {children}
      </TableRoot>
    </TypographyInheritContext.Provider>
  );
}) as OverridableComponent<TableTypeMap>;

Table.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The axis to display a border on the table cell.
   * @default 'xBetween'
   */
  borderAxis: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['both', 'bothBetween', 'none', 'x', 'xBetween', 'y', 'yBetween']),
    PropTypes.string,
  ]),
  /**
   * Children of the table
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'neutral'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['danger', 'info', 'neutral', 'primary', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the table row will shade on hover.
   * @default false
   */
  hoverRow: PropTypes.bool,
  /**
   * If `true`, the body cells will not wrap, but instead will truncate with a text overflow ellipsis.
   *
   * Note: Header cells are always truncated with overflow ellipsis.
   *
   * @default false
   */
  noWrap: PropTypes.bool,
  /**
   * The size of the component.
   * It accepts theme values between 'sm' and 'lg'.
   * @default 'md'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['sm', 'md', 'lg']),
    PropTypes.string,
  ]),
  /**
   * Set the header sticky.
   *
   * ⚠️ It doesn't work with IE11.
   * @default false
   */
  stickyHeader: PropTypes.bool,
  /**
   * The odd or even row of the table body will have subtle background color.
   */
  stripe: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['odd', 'even']),
    PropTypes.string,
  ]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
   * @default 'plain'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

export default Table;
