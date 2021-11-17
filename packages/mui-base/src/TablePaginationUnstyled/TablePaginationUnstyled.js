import * as React from 'react';
import clsx from 'clsx';
import { unstable_useId as useId } from '@mui/utils';
import { appendOwnerState } from '../utils';
import composeClasses from '../composeClasses';
import TablePaginationActions from './TablePaginationActions';
import { getTablePaginationUtilityClass } from './tablePaginationClasses';

function defaultLabelDisplayedRows({ from, to, count }) {
  return `${from}-${to} of ${count !== -1 ? count : `more than ${to}`}`;
}

function defaultGetAriaLabel(type) {
  return `Go to ${type} page`;
}

const useUtilityClasses = (ownerState) => {
  const { classes } = ownerState;
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

  return composeClasses(slots, getTablePaginationUtilityClass, classes);
};

/**
 * A `TableCell` based component for placing inside `TableFooter` for pagination.
 */
const TablePagination = React.forwardRef(function TablePagination(props, ref) {
  const {
    component,
    components = {},
    componentsProps = {},
    ActionsComponent = TablePaginationActions,
    backIconButtonProps,
    className,
    colSpan: colSpanProp,
    count,
    getItemAriaLabel = defaultGetAriaLabel,
    labelDisplayedRows = defaultLabelDisplayedRows,
    labelRowsPerPage = 'Rows per page:',
    nextIconButtonProps,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    rowsPerPageOptions = [10, 25, 50, 100],
    isTableRow = () => true,
    ...other
  } = props;

  const ownerState = props;
  const classes = useUtilityClasses(ownerState);

  let colSpan;
  if (!component || component === 'td' || isTableRow()) {
    colSpan = colSpanProp || 1000; // col-span over everything
  }

  const getLabelDisplayedRowsTo = () => {
    if (count === -1) {
      return (page + 1) * rowsPerPage;
    }
    return rowsPerPage === -1 ? count : Math.min(count, (page + 1) * rowsPerPage);
  };

  const Root = components.Root ?? component ?? 'td';
  const rootProps = appendOwnerState(
    Root,
    { ...other, ...componentsProps.root },
    ownerState,
  );

  const Select = components.Select ?? 'select';
  const selectProps = appendOwnerState(
    Select,
    componentsProps.select,
    ownerState,
  );

  const Actions = components.Actions ?? TablePaginationActions; 
  const actionsProps = appendOwnerState(
    Actions,
    {
      page,
      rowsPerPage,
      count,
      onPageChange,
      ...componentsProps.actions,
    },
    ownerState,
  );

  const MenuItem = components.MenuItem ?? 'option'; 
  const menuItemProps = appendOwnerState(
    MenuItem,
    componentsProps.menuItem,
    ownerState,
  );

  const SelectLabel = components.SelectLabel ?? 'p';
  const selectLabelProps = appendOwnerState(
    SelectLabel,
    componentsProps.selectLabel,
    ownerState,
  );

  const DisplayedRows = components.DisplayedRows ?? 'p';
  const displayedRowsProps = appendOwnerState(
    DisplayedRows,
    componentsProps.displayedRows,
    ownerState,
  );

  const Toolbar = components.Toolbar ?? 'div';
  const toolbarProps = appendOwnerState(
    Toolbar,
    componentsProps.toolbar,
    ownerState,
  );

  const Spacer = components.Spacer ?? 'div';
  const spacerProps = appendOwnerState(
    Spacer,
    componentsProps.spacer,
    ownerState,
  );

  const selectId = useId(selectProps.id);
  const labelId = useId(selectProps.labelId);

  return (
    <Root
      colSpan={colSpan}
      ref={ref}
      {...rootProps}
      className={clsx(classes.root, rootProps.className, className)}
    >
      <Toolbar {...toolbarProps} className={classes.toolbar}>
        <Spacer {...spacerProps} className={classes.spacer} />
        {rowsPerPageOptions.length > 1 && (
          <SelectLabel {...selectLabelProps} className={classes.selectLabel} id={labelId}>
            {labelRowsPerPage}
          </SelectLabel>
        )}

        {rowsPerPageOptions.length > 1 && (
          <Select
            value={rowsPerPage}
            onChange={onRowsPerPageChange}
            id={selectId}
            aria-labelledby={labelId}
            {...selectProps}
          >
            {rowsPerPageOptions.map((rowsPerPageOption) => (
              <MenuItem
                {...menuItemProps}
                className={classes.menuItem}
                key={rowsPerPageOption.label ? rowsPerPageOption.label : rowsPerPageOption}
                value={rowsPerPageOption.value ? rowsPerPageOption.value : rowsPerPageOption}
              >
                {rowsPerPageOption.label ? rowsPerPageOption.label : rowsPerPageOption}
              </MenuItem>
            ))}
          </Select>
        )}

        <DisplayedRows {...displayedRowsProps} className={classes.displayedRows}>
          {labelDisplayedRows({
            from: count === 0 ? 0 : page * rowsPerPage + 1,
            to: getLabelDisplayedRowsTo(),
            count: count === -1 ? -1 : count,
            page,
          })}
        </DisplayedRows>
        <Actions
          {...actionsProps}
          className={classes.actions}
        />
      </Toolbar>
    </Root>
  );
});

export default TablePagination;
