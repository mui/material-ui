// @inheritedComponent TableCell

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
import Input from '../Input';
import { MenuItem } from '../Menu';
import Select from '../Select';
import TableCell from './TableCell';
import Toolbar from '../Toolbar';
import Typography from '../Typography';
import TablePaginationActions from './TablePaginationActions';

export const styles = theme => ({
  root: {
    fontSize: theme.typography.pxToRem(12),
    // Increase the specificity to override TableCell.
    '&:last-child': {
      padding: 0,
    },
  },
  toolbar: {
    height: 56,
    minHeight: 56,
    paddingRight: 2,
  },
  spacer: {
    flex: '1 1 100%',
  },
  caption: {
    flexShrink: 0,
  },
  input: {
    fontSize: 'inherit',
    flexShrink: 0,
  },
  selectRoot: {
    marginRight: theme.spacing.unit * 4,
    marginLeft: theme.spacing.unit,
    color: theme.palette.text.secondary,
  },
  select: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit * 2,
  },
  selectIcon: {
    top: 1,
  },
  actions: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

/**
 * A `TableCell` based component for placing inside `TableFooter` for pagination.
 */
class TablePagination extends React.Component {
  // This logic would be better handled on userside.
  // However, we have it just in case.
  componentDidUpdate() {
    const { count, onChangePage, page, rowsPerPage } = this.props;
    const newLastPage = Math.max(0, Math.ceil(count / rowsPerPage) - 1);
    if (page > newLastPage) {
      onChangePage(null, newLastPage);
    }
  }

  render() {
    const {
      Actions,
      backIconButtonProps,
      classes,
      colSpan: colSpanProp,
      component: Component,
      count,
      labelDisplayedRows,
      labelRowsPerPage,
      nextIconButtonProps,
      onChangePage,
      onChangeRowsPerPage,
      page,
      rowsPerPage,
      rowsPerPageOptions,
      SelectProps,
      ...other
    } = this.props;

    let colSpan;

    if (Component === TableCell || Component === 'td') {
      colSpan = colSpanProp || 1000; // col-span over everything
    }

    return (
      <Component className={classes.root} colSpan={colSpan} {...other}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.spacer} />
          {rowsPerPageOptions.length > 1 && (
            <Typography variant="caption" className={classes.caption}>
              {labelRowsPerPage}
            </Typography>
          )}
          {rowsPerPageOptions.length > 1 && (
            <Select
              classes={{
                root: classes.selectRoot,
                select: classes.select,
                icon: classes.selectIcon,
              }}
              input={<Input className={classes.input} disableUnderline />}
              value={rowsPerPage}
              onChange={onChangeRowsPerPage}
              {...SelectProps}
            >
              {rowsPerPageOptions.map(rowsPerPageOption => (
                <MenuItem key={rowsPerPageOption} value={rowsPerPageOption}>
                  {rowsPerPageOption}
                </MenuItem>
              ))}
            </Select>
          )}
          <Typography variant="caption" className={classes.caption}>
            {labelDisplayedRows({
              from: count === 0 ? 0 : page * rowsPerPage + 1,
              to: Math.min(count, (page + 1) * rowsPerPage),
              count,
              page,
            })}
          </Typography>
          <Actions
            backIconButtonProps={backIconButtonProps}
            count={count}
            nextIconButtonProps={nextIconButtonProps}
            onChangePage={onChangePage}
            page={page}
            rowsPerPage={rowsPerPage}
          />
        </Toolbar>
      </Component>
    );
  }
}

TablePagination.propTypes = {
  /**
   * The component used for displaying the actions.
   * Either a string to use a DOM element or a component.
   */
  Actions: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  /**
   * Properties applied to the back arrow `IconButton` component.
   */
  backIconButtonProps: PropTypes.object,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  colSpan: PropTypes.number,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  /**
   * The total number of rows.
   */
  count: PropTypes.number.isRequired,
  /**
   * Useful to customize the displayed rows label.
   */
  labelDisplayedRows: PropTypes.func,
  /**
   * Useful to customize the rows per page label. Invoked with a `{ from, to, count, page }`
   * object.
   */
  labelRowsPerPage: PropTypes.node,
  /**
   * Properties applied to the next arrow `IconButton` element.
   */
  nextIconButtonProps: PropTypes.object,
  /**
   * Callback fired when the page is changed.
   *
   * @param {object} event The event source of the callback
   * @param {number} page The page selected
   */
  onChangePage: PropTypes.func.isRequired,
  /**
   * Callback fired when the number of rows per page is changed.
   *
   * @param {object} event The event source of the callback
   */
  onChangeRowsPerPage: PropTypes.func,
  /**
   * The zero-based index of the current page.
   */
  page: PropTypes.number.isRequired,
  /**
   * The number of rows per page.
   */
  rowsPerPage: PropTypes.number.isRequired,
  /**
   * Customizes the options of the rows per page select field. If less than two options are
   * available, no select field will be displayed.
   */
  rowsPerPageOptions: PropTypes.array,
  /**
   * Properties applied to the rows per page `Select` element.
   */
  SelectProps: PropTypes.object,
};

TablePagination.defaultProps = {
  Actions: TablePaginationActions,
  component: TableCell,
  labelDisplayedRows: ({ from, to, count }) => `${from}-${to} of ${count}`,
  labelRowsPerPage: 'Rows per page:',
  rowsPerPageOptions: [5, 10, 25],
};

export default withStyles(styles, { name: 'MuiTablePagination' })(TablePagination);
