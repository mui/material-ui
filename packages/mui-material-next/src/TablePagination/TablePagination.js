import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_useId as useId, chainPropTypes, integerPropType } from '@mui/utils';
import { unstable_composeClasses as composeClasses, appendOwnerState } from '@mui/base';
import BaseTablePagination from '@mui/base/TablePagination';
import { styled, useThemeProps } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TableCell from '@mui/material/TableCell';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import LastPageIcon from '@mui/material/internal/svg-icons/LastPage';
import FirstPageIcon from '@mui/material/internal/svg-icons/FirstPage';
import KeyboardArrowLeft from '@mui/material/internal/svg-icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/material/internal/svg-icons/KeyboardArrowRight';
import tablePaginationClasses, { getTablePaginationUtilityClass } from './tablePaginationClasses';

// This component is needed as the IconButton does not merge the ownerState
// coming from props. This results in the prop overriding the internal ownerState
const CustomIconButton = React.forwardRef((props, ref) => {
  // eslint-disable-next-line react/prop-types
  const { ownerState, ...other } = props;
  return <IconButton ref={ref} {...other} />;
});

const TablePaginationRoot = styled('td', {
  name: 'MuiTablePagination',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})(({ theme }) => ({
  overflow: 'auto',
  color: theme.palette.text.primary,
  fontSize: theme.typography.pxToRem(14),
  // Increase the specificity to override TableCell.
  '&:last-child': {
    padding: 0,
  },
}));

const TablePaginationToolbar = styled(Toolbar, {
  name: 'MuiTablePagination',
  slot: 'Toolbar',
  overridesResolver: (props, styles) => ({
    [`& .${tablePaginationClasses.actions}`]: styles.actions,
    ...styles.toolbar,
  }),
})(({ theme }) => ({
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
}));

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
})(({ theme }) => ({
  ...theme.typography.body2,
  flexShrink: 0,
}));

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
})(({ theme }) => ({
  ...theme.typography.body2,
  flexShrink: 0,
}));

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
  const props = useThemeProps({ props: inProps, name: 'MuiTablePagination' });
  const {
    ActionsComponent,
    backIconButtonProps,
    className,
    component = TableCell,
    nextIconButtonProps,
    SelectProps = {},
    showFirstButton = false,
    showLastButton = false,
    ...other
  } = props;

  const ownerState = props;
  const classes = useUtilityClasses(ownerState);

  const MenuItemComponent = SelectProps.native ? 'option' : TablePaginationMenuItem;

  const selectId = useId(SelectProps.id);
  const labelId = useId(SelectProps['aria-labelledby']);

  const rootProps = appendOwnerState(TablePaginationRoot, {}, ownerState);
  const actionsProps = appendOwnerState(ActionsComponent, {}, ownerState);
  const selectProps = appendOwnerState(TablePaginationSelect, SelectProps, ownerState);
  const menuItemProps = appendOwnerState(MenuItemComponent, {}, ownerState);
  const displayedRowsProps = appendOwnerState(TablePaginationDisplayedRows, {}, ownerState);
  const selectLabelProps = appendOwnerState(TablePaginationSelectLabel, {}, ownerState);
  const spacerProps = appendOwnerState(TablePaginationSpacer, {}, ownerState);
  const toolbarProps = appendOwnerState(TablePaginationToolbar, {}, ownerState);

  return (
    <BaseTablePagination
      slots={{
        root: TablePaginationRoot,
        actions: ActionsComponent,
        toolbar: TablePaginationToolbar,
        spacer: TablePaginationSpacer,
        selectLabel: TablePaginationSelectLabel,
        select: TablePaginationSelect,
        menuItem: MenuItemComponent,
        displayedRows: TablePaginationDisplayedRows,
      }}
      slotProps={{
        root: {
          as: component,
          ...rootProps,
        },
        actions: {
          slots: {
            firstButton: CustomIconButton,
            lastButton: CustomIconButton,
            nextButton: CustomIconButton,
            backButton: CustomIconButton,
            lastPageIcon: LastPageIcon,
            firstPageIcon: FirstPageIcon,
            nextPageIcon: KeyboardArrowRight,
            backPageIcon: KeyboardArrowLeft,
          },
          slotProps: {
            backButton: backIconButtonProps,
            nextButton: nextIconButtonProps,
          },
          showFirstButton,
          showLastButton,
          className: classes.actions,
          ownerState,
          ...actionsProps,
        },
        select: {
          variant: 'standard',
          input: <InputBase />,
          ...selectProps,
          ...(SelectProps.native ? {} : { labelId }),
          'aria-labelledby': labelId,
          className: clsx(classes.select, SelectProps.className),
          classes: {
            ...SelectProps.classes,
            root: clsx(classes.selectRoot, (SelectProps.classes || {}).root),
            select: clsx(classes.select, (SelectProps.classes || {}).select),
          },
        },
        menuItem: {
          className: classes.menuItem,
          ...menuItemProps,
        },
        displayedRows: {
          className: classes.displayedRows,
          ...displayedRowsProps,
        },
        selectLabel: {
          className: classes.selectLabel,
          ...selectLabelProps,
        },
        spacer: {
          className: classes.spacer,
          ...spacerProps,
        },
        toolbar: {
          className: classes.toolbar,
          ...toolbarProps,
        },
      }}
      selectId={selectId}
      labelId={labelId}
      ref={ref}
      {...other}
      className={clsx(classes.root, className)}
    />
  );
});

TablePagination.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The component used for displaying the actions.
   * Either a string to use a HTML element or a component.
   * @default TablePaginationActions
   */
  ActionsComponent: PropTypes.elementType,
  /**
   * Props applied to the back arrow [`IconButton`](/material-ui/api/icon-button/) component.
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
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default TablePagination;
