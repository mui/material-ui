'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_useId as useId, chainPropTypes, integerPropType } from '@mui/utils';
import { PolymorphicComponent, useSlotProps, WithOptionalOwnerState } from '../utils';
import { unstable_composeClasses as composeClasses } from '../composeClasses';
import { isHostComponent } from '../utils/isHostComponent';
import { TablePaginationActions } from './TablePaginationActions';
import { getTablePaginationUtilityClass } from './tablePaginationClasses';
import {
  TablePaginationProps,
  LabelDisplayedRowsArgs,
  TablePaginationTypeMap,
  TablePaginationRootSlotProps,
  TablePaginationSelectSlotProps,
  TablePaginationActionsSlotProps,
  TablePaginationMenuItemSlotProps,
  TablePaginationSelectLabelSlotProps,
  TablePaginationDisplayedRowsSlotProps,
  TablePaginationToolbarSlotProps,
  TablePaginationSpacerSlotProps,
} from './TablePagination.types';
import { ItemAriaLabelType } from './common.types';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';

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

  return composeClasses(slots, useClassNamesOverride(getTablePaginationUtilityClass));
};

/**
 * A pagination for tables.
 *
 * Demos:
 *
 * - [Table Pagination](https://mui.com/base-ui/react-table-pagination/)
 *
 * API:
 *
 * - [TablePagination API](https://mui.com/base-ui/react-table-pagination/components-api/#table-pagination)
 */
const TablePagination = React.forwardRef(function TablePagination<
  RootComponentType extends React.ElementType,
>(props: TablePaginationProps<RootComponentType>, forwardedRef: React.ForwardedRef<Element>) {
  const {
    colSpan: colSpanProp,
    count,
    getItemAriaLabel = defaultGetAriaLabel,
    labelDisplayedRows = defaultLabelDisplayedRows,
    labelId: labelIdProp,
    labelRowsPerPage = 'Rows per page:',
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    rowsPerPageOptions = [10, 25, 50, 100],
    selectId: selectIdProp,
    slotProps = {},
    slots = {},
    ...other
  } = props;

  const ownerState = props;
  const classes = useUtilityClasses();

  let colSpan;
  const Root = slots.root ?? 'td';
  if (Root === 'td' || !isHostComponent(Root)) {
    colSpan = colSpanProp || 1000; // col-span over everything
  }

  const getLabelDisplayedRowsTo = () => {
    if (count === -1) {
      return (page + 1) * rowsPerPage;
    }
    return rowsPerPage === -1 ? count : Math.min(count, (page + 1) * rowsPerPage);
  };

  const selectId = useId(selectIdProp);
  const labelId = useId(labelIdProp);

  const rootProps: WithOptionalOwnerState<TablePaginationRootSlotProps> = useSlotProps({
    elementType: Root,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      colSpan,
      ref: forwardedRef,
    },
    ownerState,
    className: classes.root,
  });

  const Select = slots.select ?? 'select';
  const selectProps: WithOptionalOwnerState<TablePaginationSelectSlotProps> = useSlotProps({
    elementType: Select,
    externalSlotProps: slotProps.select,
    additionalProps: {
      value: rowsPerPage,
      id: selectId,
      onChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
        onRowsPerPageChange && onRowsPerPageChange(event),
      'aria-label': rowsPerPage.toString(),
      'aria-labelledby': [labelId, selectId].filter(Boolean).join(' ') || undefined,
    },
    ownerState,
    className: classes.select,
  });

  const Actions = slots.actions ?? TablePaginationActions;
  const actionsProps: WithOptionalOwnerState<TablePaginationActionsSlotProps> = useSlotProps({
    elementType: Actions,
    externalSlotProps: slotProps.actions,
    additionalProps: {
      page,
      rowsPerPage,
      count,
      onPageChange,
      getItemAriaLabel,
    },
    ownerState,
    className: classes.actions,
  });

  const MenuItem = slots.menuItem ?? 'option';
  const menuItemProps: WithOptionalOwnerState<TablePaginationMenuItemSlotProps> = useSlotProps({
    elementType: MenuItem,
    externalSlotProps: slotProps.menuItem,
    additionalProps: {
      value: undefined,
    },
    ownerState,
    className: classes.menuItem,
  });

  const SelectLabel = slots.selectLabel ?? 'p';
  const selectLabelProps: WithOptionalOwnerState<TablePaginationSelectLabelSlotProps> =
    useSlotProps({
      elementType: SelectLabel,
      externalSlotProps: slotProps.selectLabel,
      additionalProps: {
        id: labelId,
      },
      ownerState,
      className: classes.selectLabel,
    });

  const DisplayedRows = slots.displayedRows ?? 'p';
  const displayedRowsProps: WithOptionalOwnerState<TablePaginationDisplayedRowsSlotProps> =
    useSlotProps({
      elementType: DisplayedRows,
      externalSlotProps: slotProps.displayedRows,
      ownerState,
      className: classes.displayedRows,
    });

  const Toolbar = slots.toolbar ?? 'div';
  const toolbarProps: WithOptionalOwnerState<TablePaginationToolbarSlotProps> = useSlotProps({
    elementType: Toolbar,
    externalSlotProps: slotProps.toolbar,
    ownerState,
    className: classes.toolbar,
  });

  const Spacer = slots.spacer ?? 'div';
  const spacerProps: WithOptionalOwnerState<TablePaginationSpacerSlotProps> = useSlotProps({
    elementType: Spacer,
    externalSlotProps: slotProps.spacer,
    ownerState,
    className: classes.spacer,
  });

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
}) as PolymorphicComponent<TablePaginationTypeMap>;

TablePagination.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  colSpan: PropTypes.number,
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
   * Id of the label element within the pagination.
   */
  labelId: PropTypes.string,
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
        'MUI: The page prop of a TablePagination is out of range ' +
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
  /**
   * Id of the select element within the pagination.
   */
  selectId: PropTypes.string,
  /**
   * The props used for each slot inside the TablePagination.
   * @default {}
   */
  slotProps: PropTypes /* @typescript-to-proptypes-ignore */.shape({
    actions: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    displayedRows: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    menuItem: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    select: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    selectLabel: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    spacer: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    toolbar: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside the TablePagination.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    actions: PropTypes.elementType,
    displayedRows: PropTypes.elementType,
    menuItem: PropTypes.elementType,
    root: PropTypes.elementType,
    select: PropTypes.elementType,
    selectLabel: PropTypes.elementType,
    spacer: PropTypes.elementType,
    toolbar: PropTypes.elementType,
  }),
} as any;

export { TablePagination };
