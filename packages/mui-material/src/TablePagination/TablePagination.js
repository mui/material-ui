'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import integerPropType from '@mui/utils/integerPropType';
import chainPropTypes from '@mui/utils/chainPropTypes';
import composeClasses from '@mui/utils/composeClasses';
import isHostComponent from '../utils/isHostComponent';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import InputBase from '../InputBase';
import MenuItem from '../MenuItem';
import Select from '../Select';
import TableCell from '../TableCell';
import Toolbar from '../Toolbar';
import TablePaginationActions from './TablePaginationActions';
import useId from '../utils/useId';
import tablePaginationClasses, { getTablePaginationUtilityClass } from './tablePaginationClasses';

const TablePaginationRoot = styled(TableCell, {
  name: 'MuiTablePagination',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})(
  memoTheme(({ theme }) => ({
    overflow: 'auto',
    color: (theme.vars || theme).palette.text.primary,
    fontSize: theme.typography.pxToRem(14),
    // Increase the specificity to override TableCell.
    '&:last-child': {
      padding: 0,
    },
  })),
);

const TablePaginationToolbar = styled(Toolbar, {
  name: 'MuiTablePagination',
  slot: 'Toolbar',
  overridesResolver: (props, styles) => ({
    [`& .${tablePaginationClasses.actions}`]: styles.actions,
    ...styles.toolbar,
  }),
})(
  memoTheme(({ theme }) => ({
    minHeight: 52,
    paddingRight: 2,
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
      minHeight: 52,
    },
    [theme.breakpoints.up('sm')]: {
      minHeight: 52,
      paddingRight: 2,
    },
    [`& .${tablePaginationClasses.actions}`]: {
      flexShrink: 0,
      marginLeft: 20,
    },
  })),
);

const TablePaginationSpacer = styled('div', {
  name: 'MuiTablePagination',
  slot: 'Spacer',
  overridesResolver: (props, styles) => styles.spacer,
})({
  flex: '1 1 100%',
});

const TablePaginationSelectLabel = styled('p', {
  name: 'MuiTablePagination',
  slot: 'SelectLabel',
  overridesResolver: (props, styles) => styles.selectLabel,
})(
  memoTheme(({ theme }) => ({
    ...theme.typography.body2,
    flexShrink: 0,
  })),
);

const TablePaginationSelect = styled(Select, {
  name: 'MuiTablePagination',
  slot: 'Select',
  overridesResolver: (props, styles) => ({
    [`& .${tablePaginationClasses.selectIcon}`]: styles.selectIcon,
    [`& .${tablePaginationClasses.select}`]: styles.select,
    ...styles.input,
    ...styles.selectRoot,
  }),
})({
  color: 'inherit',
  fontSize: 'inherit',
  flexShrink: 0,
  marginRight: 32,
  marginLeft: 8,
  [`& .${tablePaginationClasses.select}`]: {
    paddingLeft: 8,
    paddingRight: 24,
    textAlign: 'right',
    textAlignLast: 'right', // Align <select> on Chrome.
  },
});

const TablePaginationMenuItem = styled(MenuItem, {
  name: 'MuiTablePagination',
  slot: 'MenuItem',
  overridesResolver: (props, styles) => styles.menuItem,
})({});

const TablePaginationDisplayedRows = styled('p', {
  name: 'MuiTablePagination',
  slot: 'DisplayedRows',
  overridesResolver: (props, styles) => styles.displayedRows,
})(
  memoTheme(({ theme }) => ({
    ...theme.typography.body2,
    flexShrink: 0,
  })),
);

function defaultLabelDisplayedRows({ from, to, count }) {
  return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
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
const TablePagination = React.forwardRef(function TablePagination(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiTablePagination' });
  const {
    ActionsComponent = TablePaginationActions,
    backIconButtonProps,
    className,
    colSpan: colSpanProp,
    component = TableCell,
    count,
    disabled = false,
    getItemAriaLabel = defaultGetAriaLabel,
    labelDisplayedRows = defaultLabelDisplayedRows,
    labelRowsPerPage = 'Rows per page:',
    nextIconButtonProps,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    rowsPerPageOptions = [10, 25, 50, 100],
    SelectProps = {},
    showFirstButton = false,
    showLastButton = false,
    slotProps = {},
    slots = {},
    ...other
  } = props;

  const ownerState = props;
  const classes = useUtilityClasses(ownerState);

  const selectProps = slotProps?.select ?? SelectProps;

  const MenuItemComponent = selectProps.native ? 'option' : TablePaginationMenuItem;

  let colSpan;
  if (component === TableCell || component === 'td') {
    colSpan = colSpanProp || 1000; // col-span over everything
  }

  const selectId = useId(selectProps.id);
  const labelId = useId(selectProps.labelId);

  const getLabelDisplayedRowsTo = () => {
    if (count === -1) {
      return (page + 1) * rowsPerPage;
    }
    return rowsPerPage === -1 ? count : Math.min(count, (page + 1) * rowsPerPage);
  };

  return (
    <TablePaginationRoot
      colSpan={colSpan}
      ref={ref}
      as={component}
      ownerState={ownerState}
      className={clsx(classes.root, className)}
      {...other}
    >
      <TablePaginationToolbar className={classes.toolbar}>
        <TablePaginationSpacer className={classes.spacer} />
        {rowsPerPageOptions.length > 1 && (
          <TablePaginationSelectLabel className={classes.selectLabel} id={labelId}>
            {labelRowsPerPage}
          </TablePaginationSelectLabel>
        )}

        {rowsPerPageOptions.length > 1 && (
          <TablePaginationSelect
            variant="standard"
            {...(!selectProps.variant && { input: <InputBase /> })}
            value={rowsPerPage}
            onChange={onRowsPerPageChange}
            id={selectId}
            labelId={labelId}
            {...selectProps}
            classes={{
              ...selectProps.classes,
              // TODO v5 remove `classes.input`
              root: clsx(classes.input, classes.selectRoot, (selectProps.classes || {}).root),
              select: clsx(classes.select, (selectProps.classes || {}).select),
              // TODO v5 remove `selectIcon`
              icon: clsx(classes.selectIcon, (selectProps.classes || {}).icon),
            }}
            disabled={disabled}
          >
            {rowsPerPageOptions.map((rowsPerPageOption) => (
              <MenuItemComponent
                {...(!isHostComponent(MenuItemComponent) && {
                  ownerState,
                })}
                className={classes.menuItem}
                key={rowsPerPageOption.label ? rowsPerPageOption.label : rowsPerPageOption}
                value={rowsPerPageOption.value ? rowsPerPageOption.value : rowsPerPageOption}
              >
                {rowsPerPageOption.label ? rowsPerPageOption.label : rowsPerPageOption}
              </MenuItemComponent>
            ))}
          </TablePaginationSelect>
        )}

        <TablePaginationDisplayedRows className={classes.displayedRows}>
          {labelDisplayedRows({
            from: count === 0 ? 0 : page * rowsPerPage + 1,
            to: getLabelDisplayedRowsTo(),
            count: count === -1 ? -1 : count,
            page,
          })}
        </TablePaginationDisplayedRows>
        <ActionsComponent
          className={classes.actions}
          backIconButtonProps={backIconButtonProps}
          count={count}
          nextIconButtonProps={nextIconButtonProps}
          onPageChange={onPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          showFirstButton={showFirstButton}
          showLastButton={showLastButton}
          slotProps={slotProps.actions}
          slots={slots.actions}
          getItemAriaLabel={getItemAriaLabel}
          disabled={disabled}
        />
      </TablePaginationToolbar>
    </TablePaginationRoot>
  );
});

TablePagination.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The component used for displaying the actions.
   * Either a string to use a HTML element or a component.
   * @default TablePaginationActions
   */
  ActionsComponent: PropTypes.elementType,
  /**
   * Props applied to the back arrow [`IconButton`](/material-ui/api/icon-button/) component.
   *
   * This prop is an alias for `slotProps.actions.previousButton` and will be overriden by it if both are used.
   * @deprecated Use `slotProps.actions.previousButton` instead.
   */
  backIconButtonProps: PropTypes.object,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
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
   * The total number of rows.
   *
   * To enable server side pagination for an unknown number of items, provide -1.
   */
  count: integerPropType.isRequired,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current page.
   * This is important for screen reader users.
   *
   * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
   * @param {string} type The link or button type to format ('first' | 'last' | 'next' | 'previous').
   * @returns {string}
   * @default function defaultGetAriaLabel(type) {
   *   return `Go to ${type} page`;
   * }
   */
  getItemAriaLabel: PropTypes.func,
  /**
   * Customize the displayed rows label. Invoked with a `{ from, to, count, page }`
   * object.
   *
   * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
   * @default function defaultLabelDisplayedRows({ from, to, count }) {
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
   * Props applied to the next arrow [`IconButton`](/material-ui/api/icon-button/) element.
   *
   * This prop is an alias for `slotProps.actions.nextButton` and will be overriden by it if both are used.
   * @deprecated Use `slotProps.actions.nextButton` instead.
   */
  nextIconButtonProps: PropTypes.object,
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
   * Props applied to the rows per page [`Select`](/material-ui/api/select/) element.
   *
   * This prop is an alias for `slotProps.select` and will be overriden by it if both are used.
   * @deprecated Use `slotProps.select` instead.
   *
   * @default {}
   */
  SelectProps: PropTypes.object,
  /**
   * If `true`, show the first-page button.
   * @default false
   */
  showFirstButton: PropTypes.bool,
  /**
   * If `true`, show the last-page button.
   * @default false
   */
  showLastButton: PropTypes.bool,
  /**
   * The props used for each slot inside the TablePagination.
   * @default {}
   */
  slotProps: PropTypes.shape({
    actions: PropTypes.shape({
      firstButton: PropTypes.object,
      firstButtonIcon: PropTypes.object,
      lastButton: PropTypes.object,
      lastButtonIcon: PropTypes.object,
      nextButton: PropTypes.object,
      nextButtonIcon: PropTypes.object,
      previousButton: PropTypes.object,
      previousButtonIcon: PropTypes.object,
    }),
    select: PropTypes.object,
  }),
  /**
   * The components used for each slot inside the TablePagination.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    actions: PropTypes.shape({
      firstButton: PropTypes.elementType,
      firstButtonIcon: PropTypes.elementType,
      lastButton: PropTypes.elementType,
      lastButtonIcon: PropTypes.elementType,
      nextButton: PropTypes.elementType,
      nextButtonIcon: PropTypes.elementType,
      previousButton: PropTypes.elementType,
      previousButtonIcon: PropTypes.elementType,
    }),
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default TablePagination;
