import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { chainPropTypes, integerPropType } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses, isHostComponent } from '@material-ui/unstyled';
import experimentalStyled, { shouldForwardProp } from '../styles/experimentalStyled';
import useThemeProps from '../styles/useThemeProps';
import InputBase from '../InputBase';
import MenuItem from '../MenuItem';
import Select from '../Select';
import TableCell from '../TableCell';
import Toolbar from '../Toolbar';
import Typography from '../Typography';
import PaginationActions from './TablePaginationActions';
import useId from '../utils/useId';
import { getTablePaginationUtilityClass } from './tablePaginationClasses';

const makeOverridesResolver = (slotName) => {
  return function overridesResolver(_, styles) {
    return styles[slotName];
  };
};

const TablePaginationRoot = experimentalStyled(
  TableCell,
  { shouldForwardProp: (prop) => shouldForwardProp(prop) || prop === 'classes' },
  { name: 'MuiTablePagination', slot: 'Root', overridesResolver: makeOverridesResolver('root') },
)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: theme.typography.pxToRem(14),
  overflow: 'auto',
  // Increase the specificity to override TableCell.
  '&:last-child': {
    padding: 0,
  },
}));

const TablePaginationToolbar = experimentalStyled(
  Toolbar,
  { shouldForwardProp: (prop) => shouldForwardProp(prop) || prop === 'classes' },
  {
    name: 'MuiTablePagination',
    slot: 'Toolbar',
    overridesResolver: makeOverridesResolver('toolbar'),
  },
)(({ theme }) => ({
  minHeight: 52,
  paddingRight: 2,
  [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
    minHeight: 52,
  },
  [theme.breakpoints.up('sm')]: {
    minHeight: 52,
    paddingRight: 2,
  },
}));

const Spacer = experimentalStyled(
  'div',
  {},
  {
    name: 'MuiTablePagination',
    slot: 'Spacer',
    overridesResolver: makeOverridesResolver('spacer'),
  },
)({
  flex: '1 1 100%',
});

const SelectLabel = experimentalStyled(
  Typography,
  { shouldForwardProp: (prop) => shouldForwardProp(prop) || prop === 'classes' },
  {
    name: 'MuiTablePagination',
    slot: 'SelectLabel',
    overridesResolver: makeOverridesResolver('selectLabel'),
  },
)({
  flexShrink: 0,
});

const TablePaginationSelect = experimentalStyled(
  Select,
  { shouldForwardProp: (prop) => shouldForwardProp(prop) || prop === 'classes' },
  {
    name: 'MuiTablePagination',
    slot: 'Select',
    overridesResolver: makeOverridesResolver('select'),
  },
)({
  paddingLeft: 8,
  paddingRight: 24,
  textAlign: 'right',
  textAlignLast: 'right', // Align <select> on Chrome.
});

const TablePaginationInput = experimentalStyled(
  InputBase,
  { shouldForwardProp: (prop) => shouldForwardProp(prop) || prop === 'classes' },
  { name: 'MuiTablePagination', slot: 'Input', overridesResolver: makeOverridesResolver('input') },
)({
  color: 'inherit',
  fontSize: 'inherit',
  flexShrink: 0,
  marginRight: 32,
  marginLeft: 8,
});

const TablePaginationMenuItem = experimentalStyled(
  MenuItem,
  { shouldForwardProp: (prop) => shouldForwardProp(prop) || prop === 'classes' },
  {
    name: 'MuiTablePagination',
    slot: 'MenuItem',
    overridesResolver: makeOverridesResolver('menuItem'),
  },
)();

const DisplayedRows = experimentalStyled(
  Typography,
  { shouldForwardProp: (prop) => shouldForwardProp(prop) || prop === 'classes' },
  {
    name: 'MuiTablePagination',
    slot: 'DisplayedRows',
    overridesResolver: makeOverridesResolver('displayedRows'),
  },
)({
  flexShrink: 0,
});

const TablePaginationActions = experimentalStyled(
  PaginationActions,
  { shouldForwardProp: (prop) => shouldForwardProp(prop) || prop === 'classes' },
  {
    name: 'MuiTablePagination',
    slot: 'PaginationActions',
    overridesResolver: makeOverridesResolver('actions'),
  },
)({
  flexShrink: 0,
  marginLeft: 20,
});

function defaultLabelDisplayedRows({ from, to, count }) {
  return `${from}-${to} of ${count !== -1 ? count : `more than ${to}`}`;
}

function defaultGetAriaLabel(type) {
  return `Go to ${type} page`;
}

const useUtilityClasses = (styleProps) => {
  const { classes } = styleProps;
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
    backIconButtonProps,
    className,
    colSpan: colSpanProp,
    components = {},
    componentsProps = {},
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
    SelectProps = {},
    showFirstButton = false,
    showLastButton = false,
    /* eslint-disable-next-line react/prop-types */
    isRtl,
    /* eslint-disable-next-line react/prop-types */
    theme,
    ...other
  } = props;

  const styleProps = {
    ...props,
  };

  const classes = useUtilityClasses(styleProps);

  const Root = components.Root || TablePaginationRoot;
  const ActionsComponent = components.Actions || TablePaginationActions;
  const MenuItemComponent = SelectProps.native
    ? 'option'
    : components.MenuItem || TablePaginationMenuItem;

  const rootProps = componentsProps.root || {};
  const actionsProps = componentsProps.actions || {};
  const menuItemProps = componentsProps.menuItem || {};

  let colSpan;
  if (Root === TablePaginationRoot || Root === 'td') {
    colSpan = colSpanProp || 1000; // col-span over everything
  }

  const selectId = useId(SelectProps.id);
  const labelId = useId(SelectProps.labelId);

  const getLabelDisplayedRowsTo = () => {
    if (count === -1) return (page + 1) * rowsPerPage;
    return rowsPerPage === -1 ? count : Math.min(count, (page + 1) * rowsPerPage);
  };

  return (
    <Root
      colSpan={colSpan}
      ref={ref}
      {...rootProps}
      {...(!isHostComponent(Root) && {
        styleProps: { ...styleProps, ...rootProps.styleProps },
        theme,
      })}
      {...other}
      className={clsx(classes.root, rootProps.className, className)}
    >
      <TablePaginationToolbar className={classes.toolbar}>
        <Spacer className={classes.spacer} />
        {rowsPerPageOptions.length > 1 && (
          <SelectLabel color="inherit" variant="body2" className={classes.selectLabel} id={labelId}>
            {labelRowsPerPage}
          </SelectLabel>
        )}

        {rowsPerPageOptions.length > 1 && (
          <TablePaginationSelect
            variant="standard"
            classes={{
              select: classes.select,
              icon: classes.selectIcon,
            }}
            input={
              <TablePaginationInput
                variant="outlined"
                className={clsx(classes.input, classes.selectRoot)}
              />
            }
            value={rowsPerPage}
            onChange={onRowsPerPageChange}
            id={selectId}
            labelId={labelId}
            {...SelectProps}
          >
            {rowsPerPageOptions.map((rowsPerPageOption) => (
              <MenuItemComponent
                {...menuItemProps}
                {...(!isHostComponent(MenuItemComponent) && {
                  styleProps: { ...styleProps, ...menuItemProps.styleProps },
                  theme,
                })}
                className={clsx(classes.menuItem, menuItemProps.className)}
                key={rowsPerPageOption.label ? rowsPerPageOption.label : rowsPerPageOption}
                value={rowsPerPageOption.value ? rowsPerPageOption.value : rowsPerPageOption}
              >
                {rowsPerPageOption.label ? rowsPerPageOption.label : rowsPerPageOption}
              </MenuItemComponent>
            ))}
          </TablePaginationSelect>
        )}

        <DisplayedRows color="inherit" variant="body2" className={classes.displayedRows}>
          {labelDisplayedRows({
            from: count === 0 ? 0 : page * rowsPerPage + 1,
            to: getLabelDisplayedRowsTo(),
            count: count === -1 ? -1 : count,
            page,
          })}
        </DisplayedRows>
        <ActionsComponent
          {...actionsProps}
          {...(!isHostComponent(ActionsComponent) && {
            styleProps: { ...styleProps, ...menuItemProps.styleProps },
            theme,
          })}
          className={clsx(classes.actions, actionsProps.className)}
          backIconButtonProps={backIconButtonProps}
          count={count}
          nextIconButtonProps={nextIconButtonProps}
          onPageChange={onPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          showFirstButton={showFirstButton}
          showLastButton={showLastButton}
          getItemAriaLabel={getItemAriaLabel}
        />
      </TablePaginationToolbar>
    </Root>
  );
});

TablePagination.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Props applied to the back arrow [`IconButton`](/api/icon-button/) component.
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
   * The components used for each slot inside the TablePagination.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Actions: PropTypes.elementType,
    MenuItem: PropTypes.elementType,
    Root: PropTypes.elementType,
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
  count: integerPropType.isRequired,
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current page.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   *
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
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   * @default function defaultLabelDisplayedRows({ from, to, count }) {
   *   return `${from}-${to} of ${count !== -1 ? count : `more than ${to}`}`;
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
   * Props applied to the next arrow [`IconButton`](/api/icon-button/) element.
   */
  nextIconButtonProps: PropTypes.object,
  /**
   * Callback fired when the page is changed.
   *
   * @param {object} event The event source of the callback.
   * @param {number} page The page selected.
   */
  onPageChange: PropTypes.func.isRequired,
  /**
   * Callback fired when the number of rows per page is changed.
   *
   * @param {object} event The event source of the callback.
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
        'Material-UI: The page prop of a TablePagination is out of range ' +
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
   * Props applied to the rows per page [`Select`](/api/select/) element.
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
  sx: PropTypes.object,
};

export default TablePagination;
