import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_useId as useId, chainPropTypes, integerPropType } from '@mui/utils';
import { OverridableComponent } from '@mui/types';
import { appendOwnerState } from '../utils';
import composeClasses from '../composeClasses';
import isHostComponent from '../utils/isHostComponent';
import TablePaginationActionsUnstyled from './TablePaginationActionsUnstyled';
import { getTablePaginationUnstyledUtilityClass } from './tablePaginationUnstyledClasses';
import TablePaginationUnstyledProps, {
  LabelDisplayedRowsArgs,
  TablePaginationUnstyledTypeMap,
  ItemAriaLabelType,
} from './TablePaginationUnstyledProps';

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
 * - [Tables](https://mui.com/components/tables/)
 *
 * API:
 *
 * - [TablePaginationUnstyled API](https://mui.com/api/table-pagination-unstyled/)
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

    const Root = component ?? components.Root ?? 'td';
    const rootProps = appendOwnerState(Root, { ...other, ...componentsProps.root }, ownerState);

    const Select = components.Select ?? 'select';
    const selectProps = appendOwnerState(
      Select,
      {
        ...componentsProps.select,
        onChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
          onRowsPerPageChange && onRowsPerPageChange(e),
      },
      ownerState,
    );

    const Actions = components.Actions ?? TablePaginationActionsUnstyled;
    const actionsProps = appendOwnerState(
      Actions,
      {
        page,
        rowsPerPage,
        count,
        onPageChange,
        getItemAriaLabel,
        ...componentsProps.actions,
      },
      ownerState,
    );

    const MenuItem = components.MenuItem ?? 'option';
    const menuItemProps = appendOwnerState(MenuItem, componentsProps.menuItem, ownerState);

    const SelectLabel = components.SelectLabel ?? 'p';
    const selectLabelProps = appendOwnerState(SelectLabel, componentsProps.selectLabel, ownerState);

    const DisplayedRows = components.DisplayedRows ?? 'p';
    const displayedRowsProps = appendOwnerState(
      DisplayedRows,
      componentsProps.displayedRows,
      ownerState,
    );

    const Toolbar = components.Toolbar ?? 'div';
    const toolbarProps = appendOwnerState(Toolbar, componentsProps.toolbar, ownerState);

    const Spacer = components.Spacer ?? 'div';
    const spacerProps = appendOwnerState(Spacer, componentsProps.spacer, ownerState);

    const selectId = useId(selectProps.id);
    const labelId = useId(selectProps['aria-labelledby']);

    return (
      <Root
        colSpan={colSpan}
        ref={ref}
        {...rootProps}
        className={clsx(classes.root, rootProps.className, className)}
      >
        <Toolbar {...toolbarProps} className={clsx(classes.toolbar, toolbarProps?.className)}>
          <Spacer {...spacerProps} className={clsx(classes.spacer, toolbarProps?.spacer)} />
          {rowsPerPageOptions.length > 1 && (
            <SelectLabel
              {...selectLabelProps}
              className={clsx(classes.selectLabel, selectLabelProps?.className)}
              id={labelId}
            >
              {labelRowsPerPage}
            </SelectLabel>
          )}

          {rowsPerPageOptions.length > 1 && (
            <Select
              value={rowsPerPage}
              id={selectId}
              {...selectProps}
              aria-label={rowsPerPage}
              aria-labelledby={[labelId, selectId].filter(Boolean).join(' ') || undefined}
              className={clsx(classes.select, selectProps?.className)}
            >
              {rowsPerPageOptions.map((rowsPerPageOption) => (
                <MenuItem
                  {...menuItemProps}
                  className={clsx(classes.menuItem, menuItemProps?.className)}
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
              ))}
            </Select>
          )}

          <DisplayedRows
            {...displayedRowsProps}
            className={clsx(classes.displayedRows, displayedRowsProps?.className)}
          >
            {labelDisplayedRows({
              from: count === 0 ? 0 : page * rowsPerPage + 1,
              to: getLabelDisplayedRowsTo(),
              count: count === -1 ? -1 : count,
              page,
            })}
          </DisplayedRows>
          <Actions {...actionsProps} className={clsx(classes.actions, actionsProps?.className)} />
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
  componentsProps: PropTypes.object,
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
   * For localization purposes, you can use the provided [translations](/guides/localization/).
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
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   * @default function defaultLabelDisplayedRows({ from, to, count }: LabelDisplayedRowsArgs) {
   *   return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
   * }
   */
  labelDisplayedRows: PropTypes.func,
  /**
   * Customize the rows per page label.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
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
