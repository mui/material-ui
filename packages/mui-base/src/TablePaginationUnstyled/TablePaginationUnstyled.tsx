import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_useId as useId, chainPropTypes, integerPropType } from '@mui/utils';
import { OverridableComponent } from '@mui/types';
import { appendOwnerState, WithOptionalOwnerState } from '../utils';
import composeClasses from '../composeClasses';
import isHostComponent from '../utils/isHostComponent';
import TablePaginationActionsUnstyled from './TablePaginationActionsUnstyled';
import { getTablePaginationUnstyledUtilityClass } from './tablePaginationUnstyledClasses';
import {
  TablePaginationUnstyledProps,
  LabelDisplayedRowsArgs,
  TablePaginationUnstyledTypeMap,
  ItemAriaLabelType,
  TablePaginationUnstyledRootSlotProps,
  TablePaginationUnstyledSelectSlotProps,
  TablePaginationUnstyledActionsSlotProps,
  TablePaginationUnstyledMenuItemSlotProps,
  TablePaginationUnstyledSelectLabelSlotProps,
  TablePaginationUnstyledDisplayedRowsSlotProps,
  TablePaginationUnstyledToolbarSlotProps,
  TablePaginationUnstyledSpacerSlotProps,
} from './TablePaginationUnstyled.types';

function defaultLabelDisplayedRows({ from, to, count }: LabelDisplayedRowsArgs) {
  return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
}

function defaultGetAriaLabel(type: ItemAriaLabelType) {
  return `Go to ${type} page`;
}

const useUtilityClasses = () => {
  const slots = {
    root: ['root'],
    toolbar: ['toolbar'],
    spacer: ['spacer'],
    selectLabel: ['selectLabel'],
    select: ['select'],
    input: ['input'],
    selectIcon: ['selectIcon'],
    menuItem: ['menuItem'],
    displayedRows: ['displayedRows'],
    actions: ['actions'],
  };

  return composeClasses(slots, getTablePaginationUnstyledUtilityClass, {});
};

/**
 * A pagination for tables.
 *
 * Demos:
 *
 * - [Table pagination](https://mui.com/base/react-table-pagination/)
 *
 * API:
 *
 * - [TablePaginationUnstyled API](https://mui.com/base/api/table-pagination-unstyled/)
 */
const TablePaginationUnstyled = React.forwardRef<unknown, TablePaginationUnstyledProps>(
  function TablePaginationUnstyled(props, ref) {
    const {
      component,
      components = {},
      componentsProps = {},
      className,
      colSpan: colSpanProp,
      count,
      getItemAriaLabel = defaultGetAriaLabel,
      labelDisplayedRows = defaultLabelDisplayedRows,
      labelRowsPerPage = 'Rows per page:',
      onPageChange,
      onRowsPerPageChange,
      page,
      rowsPerPage,
      rowsPerPageOptions = [10, 25, 50, 100],
      ...other
    } = props;

    const ownerState = props;
    const classes = useUtilityClasses();

    let colSpan;
    if (!component || component === 'td' || !isHostComponent(component)) {
      colSpan = colSpanProp || 1000; // col-span over everything
    }

    const getLabelDisplayedRowsTo = () => {
      if (count === -1) {
        return (page + 1) * rowsPerPage;
      }
      return rowsPerPage === -1 ? count : Math.min(count, (page + 1) * rowsPerPage);
    };

    const selectId = useId(componentsProps.select?.id);
    const labelId = useId(componentsProps.select?.['aria-labelledby']);

    const Root = component ?? components.Root ?? 'td';
    const rootProps: WithOptionalOwnerState<TablePaginationUnstyledRootSlotProps> =
      appendOwnerState(
        Root,
        {
          colSpan,
          ref,
          ...other,
          ...componentsProps.root,
          className: clsx(classes.root, componentsProps.root?.className, className),
        },
        ownerState,
      );

    const Select = components.Select ?? 'select';
    const selectProps: WithOptionalOwnerState<TablePaginationUnstyledSelectSlotProps> =
      appendOwnerState(
        Select,
        {
          value: rowsPerPage,
          id: selectId,
          ...componentsProps.select,
          onChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
            onRowsPerPageChange && onRowsPerPageChange(e),
          'aria-label': rowsPerPage.toString(),
          'aria-labelledby': [labelId, selectId].filter(Boolean).join(' ') || undefined,
          className: clsx(classes.select, componentsProps.select?.className),
        },
        ownerState,
      );

    const Actions = components.Actions ?? TablePaginationActionsUnstyled;
    const actionsProps: WithOptionalOwnerState<TablePaginationUnstyledActionsSlotProps> =
      appendOwnerState(
        Actions,
        {
          page,
          rowsPerPage,
          count,
          onPageChange,
          getItemAriaLabel,
          ...componentsProps.actions,
          className: clsx(classes.actions, componentsProps.actions?.className),
        },
        ownerState,
      );

    const MenuItem = components.MenuItem ?? 'option';
    const menuItemProps: WithOptionalOwnerState<TablePaginationUnstyledMenuItemSlotProps> =
      appendOwnerState(
        MenuItem,
        {
          ...componentsProps.menuItem,
          className: clsx(classes.menuItem, componentsProps.menuItem?.className),
          value: undefined,
        },
        ownerState,
      );

    const SelectLabel = components.SelectLabel ?? 'p';
    const selectLabelProps: WithOptionalOwnerState<TablePaginationUnstyledSelectLabelSlotProps> =
      appendOwnerState(
        SelectLabel,
        {
          ...componentsProps.selectLabel,
          className: clsx(classes.selectLabel, componentsProps.selectLabel?.className),
          id: labelId,
        },
        ownerState,
      );

    const DisplayedRows = components.DisplayedRows ?? 'p';
    const displayedRowsProps: WithOptionalOwnerState<TablePaginationUnstyledDisplayedRowsSlotProps> =
      appendOwnerState(
        DisplayedRows,
        {
          ...componentsProps.displayedRows,
          className: clsx(classes.displayedRows, componentsProps.displayedRows?.className),
        },
        ownerState,
      );

    const Toolbar = components.Toolbar ?? 'div';
    const toolbarProps: WithOptionalOwnerState<TablePaginationUnstyledToolbarSlotProps> =
      appendOwnerState(
        Toolbar,
        {
          ...componentsProps.toolbar,
          className: clsx(classes.toolbar, componentsProps.toolbar?.className),
        },
        ownerState,
      );

    const Spacer = components.Spacer ?? 'div';
    const spacerProps: WithOptionalOwnerState<TablePaginationUnstyledSpacerSlotProps> =
      appendOwnerState(
        Spacer,
        {
          ...componentsProps.spacer,
          className: clsx(classes.spacer, componentsProps.spacer?.className),
        },
        ownerState,
      );

    return (
      <Root {...rootProps}>
        <Toolbar {...toolbarProps}>
          <Spacer {...spacerProps} />
          {rowsPerPageOptions.length > 1 && (
            <SelectLabel {...selectLabelProps}>{labelRowsPerPage}</SelectLabel>
          )}

          {rowsPerPageOptions.length > 1 && (
            <Select {...selectProps}>
              {rowsPerPageOptions.map(
                (rowsPerPageOption: number | { label: string; value: number }) => (
                  <MenuItem
                    {...menuItemProps}
                    key={
                      typeof rowsPerPageOption !== 'number' && rowsPerPageOption.label
                        ? rowsPerPageOption.label
                        : rowsPerPageOption
                    }
                    value={
                      typeof rowsPerPageOption !== 'number' && rowsPerPageOption.value
                        ? rowsPerPageOption.value
                        : rowsPerPageOption
                    }
                  >
                    {typeof rowsPerPageOption !== 'number' && rowsPerPageOption.label
                      ? rowsPerPageOption.label
                      : rowsPerPageOption}
                  </MenuItem>
                ),
              )}
            </Select>
          )}

          <DisplayedRows {...displayedRowsProps}>
            {labelDisplayedRows({
              from: count === 0 ? 0 : page * rowsPerPage + 1,
              to: getLabelDisplayedRowsTo(),
              count: count === -1 ? -1 : count,
              page,
            })}
          </DisplayedRows>
          <Actions {...actionsProps} />
        </Toolbar>
      </Root>
    );
  },
) as OverridableComponent<TablePaginationUnstyledTypeMap>;

TablePaginationUnstyled.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * @ignore
   */
  colSpan: PropTypes.number,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The components used for each slot inside the TablePagination.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Actions: PropTypes.elementType,
    DisplayedRows: PropTypes.elementType,
    MenuItem: PropTypes.elementType,
    Root: PropTypes.elementType,
    Select: PropTypes.elementType,
    SelectLabel: PropTypes.elementType,
    Spacer: PropTypes.elementType,
    Toolbar: PropTypes.elementType,
  }),
  /**
   * The props used for each slot inside the TablePagination.
   * @default {}
   */
  componentsProps: PropTypes.shape({
    actions: PropTypes.object,
    displayedRows: PropTypes.object,
    menuItem: PropTypes.object,
    root: PropTypes.object,
    select: PropTypes.object,
    selectLabel: PropTypes.object,
    spacer: PropTypes.object,
    toolbar: PropTypes.object,
  }),
  /**
   * The total number of rows.
   *
   * To enable server side pagination for an unknown number of items, provide -1.
   */
  count: PropTypes.number.isRequired,
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current page.
   * This is important for screen reader users.
   *
   * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
   * @param {string} type The link or button type to format ('first' | 'last' | 'next' | 'previous').
   * @returns {string}
   * @default function defaultGetAriaLabel(type: ItemAriaLabelType) {
   *   return `Go to ${type} page`;
   * }
   */
  getItemAriaLabel: PropTypes.func,
  /**
   * Customize the displayed rows label. Invoked with a `{ from, to, count, page }`
   * object.
   *
   * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
   * @default function defaultLabelDisplayedRows({ from, to, count }: LabelDisplayedRowsArgs) {
   *   return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
   * }
   */
  labelDisplayedRows: PropTypes.func,
  /**
   * Customize the rows per page label.
   *
   * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
   * @default 'Rows per page:'
   */
  labelRowsPerPage: PropTypes.node,
  /**
   * Callback fired when the page is changed.
   *
   * @param {React.MouseEvent<HTMLButtonElement> | null} event The event source of the callback.
   * @param {number} page The page selected.
   */
  onPageChange: PropTypes.func.isRequired,
  /**
   * Callback fired when the number of rows per page is changed.
   *
   * @param {React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>} event The event source of the callback.
   */
  onRowsPerPageChange: PropTypes.func,
  /**
   * The zero-based index of the current page.
   */
  page: chainPropTypes(integerPropType.isRequired, (props) => {
    const { count, page, rowsPerPage } = props;

    if (count === -1) {
      return null;
    }

    const newLastPage = Math.max(0, Math.ceil(count / rowsPerPage) - 1);
    if (page < 0 || page > newLastPage) {
      return new Error(
        'MUI: The page prop of a TablePaginationUnstyled is out of range ' +
          `(0 to ${newLastPage}, but page is ${page}).`,
      );
    }
    return null;
  }),
  /**
   * The number of rows per page.
   *
   * Set -1 to display all the rows.
   */
  rowsPerPage: integerPropType.isRequired,
  /**
   * Customizes the options of the rows per page select field. If less than two options are
   * available, no select field will be displayed.
   * Use -1 for the value with a custom label to show all the rows.
   * @default [10, 25, 50, 100]
   */
  rowsPerPageOptions: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
      }),
    ]).isRequired,
  ),
} as any;

export default TablePaginationUnstyled;
