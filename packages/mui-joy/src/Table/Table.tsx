'use client';
import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { useThemeProps } from '../styles';

import styled from '../styles/styled';
import { getTableUtilityClass } from './tableClasses';
import { TableProps, TableOwnerState, TableTypeMap } from './TableProps';
import { TypographyInheritContext } from '../Typography/Typography';
import useSlot from '../utils/useSlot';

const useUtilityClasses = (ownerState: TableOwnerState) => {
  const { size, variant, color, borderAxis, stickyHeader, stickyFooter, noWrap, hoverRow } =
    ownerState;
  const slots = {
    root: [
      'root',
      stickyHeader && 'stickyHeader',
      stickyFooter && 'stickyFooter',
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
  /**
   * According to https://www.w3.org/TR/2014/REC-html5-20141028/tabular-data.html#the-tr-element,
   * `tr` can only have `td | th` as children, so using :first-of-type is better than :first-child to prevent emotion SSR warning
   */
  getColumnExceptFirst() {
    return '& tr > *:not(:first-of-type), & tr > th + td, & tr > td + th';
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
    return `& thead tr:nth-of-type(${row}) th`;
  },
  getBottomHeaderCell() {
    return '& thead th:not([colspan])';
  },
  getHeaderNestedFirstColumn() {
    return '& thead tr:not(:first-of-type) th:not([colspan]):first-of-type';
  },
  /**
   * The body cell that contains data
   */
  getDataCell() {
    return '& td';
  },
  getDataCellExceptLastRow() {
    return '& tr:not(:last-of-type) > td';
  },
  /**
   * The body cell either `td` or `th`
   */
  getBodyCellExceptLastRow() {
    return `${this.getDataCellExceptLastRow()}, & tr:not(:last-of-type) > th[scope="row"]`;
  },
  getBodyCellOfRow(row: number | string) {
    if (typeof row === 'number' && row < 0) {
      return `& tbody tr:nth-last-of-type(${Math.abs(
        row,
      )}) td, & tbody tr:nth-last-of-type(${Math.abs(row)}) th[scope="row"]`;
    }
    return `& tbody tr:nth-of-type(${row}) td, & tbody tr:nth-of-type(${row}) th[scope="row"]`;
  },
  getBodyRow(row?: number | string) {
    if (row === undefined) {
      return `& tbody tr`;
    }
    return `& tbody tr:nth-of-type(${row})`;
  },
  getFooterCell() {
    return '& tfoot th, & tfoot td';
  },
  getFooterFirstRowCell() {
    return `& tfoot tr:not(:last-of-type) th, & tfoot tr:not(:last-of-type) td`;
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
        '--unstable_TableCell-height': 'var(--TableCell-height, 32px)',
        '--TableCell-paddingX': '0.25rem',
        '--TableCell-paddingY': '0.25rem',
      }),
      ...(ownerState.size === 'md' && {
        '--unstable_TableCell-height': 'var(--TableCell-height, 40px)',
        '--TableCell-paddingX': '0.5rem',
        '--TableCell-paddingY': '0.375rem',
      }),
      ...(ownerState.size === 'lg' && {
        '--unstable_TableCell-height': 'var(--TableCell-height, 48px)',
        '--TableCell-paddingX': '0.75rem',
        '--TableCell-paddingY': '0.5rem',
      }),
      tableLayout: 'fixed',
      width: '100%',
      borderSpacing: '0px',
      borderCollapse: 'separate',
      borderRadius: 'var(--TableCell-cornerRadius, var(--unstable_actionRadius))',
      ...theme.typography[`body-${({ sm: 'xs', md: 'sm', lg: 'md' } as const)[ownerState.size!]}`],
      ...theme.variants[ownerState.variant!]?.[ownerState.color!],
      '& caption': {
        color: theme.vars.palette.text.tertiary,
        padding: 'calc(2 * var(--TableCell-paddingY)) var(--TableCell-paddingX)',
      },
      [tableSelector.getDataCell()]: {
        padding: 'var(--TableCell-paddingY) var(--TableCell-paddingX)',
        height: 'var(--unstable_TableCell-height)',
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
        height: 'var(--unstable_TableCell-height)',
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
        '&:first-of-type': {
          borderTopLeftRadius: 'var(--TableCell-cornerRadius, var(--unstable_actionRadius))',
        },
        '&:last-of-type': {
          borderTopRightRadius: 'var(--TableCell-cornerRadius, var(--unstable_actionRadius))',
        },
      },
      '& tfoot tr > *': {
        backgroundColor: `var(--TableCell-footBackground, ${theme.vars.palette.background.level1})`,
        // Automatic radius adjustment with Sheet
        '&:first-of-type': {
          borderBottomLeftRadius: 'var(--TableCell-cornerRadius, var(--unstable_actionRadius))',
        },
        '&:last-of-type': {
          borderBottomRightRadius: 'var(--TableCell-cornerRadius, var(--unstable_actionRadius))',
        },
      },
    } as const,
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
      '& tr > *:first-of-type': {
        borderLeftWidth: 1,
        borderLeftStyle: 'solid',
      },
      '& tr > *:last-of-type:not(:first-of-type)': {
        borderRightWidth: 1,
        borderRightStyle: 'solid',
      },
    },
    ownerState.stripe && {
      [tableSelector.getBodyRow(ownerState.stripe)]: {
        // For customization, a table cell can look for this variable with a fallback value.
        background: `var(--TableRow-stripeBackground, ${theme.vars.palette.background.level2})`,
        color: theme.vars.palette.text.primary,
      },
    },
    ownerState.hoverRow && {
      [tableSelector.getBodyRow()]: {
        '&:hover': {
          background: `var(--TableRow-hoverBackground, ${theme.vars.palette.background.level3})`,
        },
      },
    },
    ownerState.stickyHeader && {
      // The column header
      [tableSelector.getHeaderCell()]: {
        position: 'sticky',
        top: 0,
        zIndex: theme.vars.zIndex.table,
      },
      [tableSelector.getHeaderCellOfRow(2)]: {
        // support upto 2 rows for the sticky header
        top: 'var(--unstable_TableCell-height)',
      },
    },
    ownerState.stickyFooter && {
      // The column header
      [tableSelector.getFooterCell()]: {
        position: 'sticky',
        bottom: 0,
        zIndex: theme.vars.zIndex.table,
        color: theme.vars.palette.text.secondary,
        fontWeight: theme.vars.fontWeight.lg,
      },
      [tableSelector.getFooterFirstRowCell()]: {
        // support upto 2 rows for the sticky footer
        bottom: 'var(--unstable_TableCell-height)',
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
    color = 'neutral',
    stripe,
    stickyHeader = false,
    stickyFooter = false,
    slots = {},
    slotProps = {},
    ...other
  } = props;

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
    stickyFooter,
  };

  const classes = useUtilityClasses(ownerState);
  const externalForwardedProps = { ...other, component, slots, slotProps };

  const [SlotRoot, rootProps] = useSlot('root', {
    ref,
    className: clsx(classes.root, className),
    elementType: TableRoot,
    externalForwardedProps,
    ownerState,
  });

  return (
    <TypographyInheritContext.Provider value>
      <SlotRoot {...rootProps}>{children}</SlotRoot>
    </TypographyInheritContext.Provider>
  );
}) as OverridableComponent<TableTypeMap>;

Table.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
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
    PropTypes.oneOf(['danger', 'neutral', 'primary', 'success', 'warning']),
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
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType,
  }),
  /**
   * If `true`, the footer always appear at the bottom of the overflow table.
   * @default false
   */
  stickyFooter: PropTypes.bool,
  /**
   * If `true`, the header always appear at the top of the overflow table.
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
