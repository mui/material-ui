// @flow

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
import IconButton from '../IconButton';
import Input from '../Input';
import { MenuItem } from '../Menu';
import Select from '../Select';
import TableCell from './TableCell';
import TableRow from './TableRow';
import Toolbar from '../Toolbar';
import Typography from '../Typography';
import KeyboardArrowLeft from '../svg-icons/KeyboardArrowLeft';
import KeyboardArrowRight from '../svg-icons/KeyboardArrowRight';

export const styles = (theme: Object) => ({
  cell: {
    padding: '0 !important',
  },
  toolbar: {
    height: 56,
    minHeight: 56,
    paddingRight: 2,
  },
  spacer: {
    flex: '1 1 100%',
  },
  select: {
    marginLeft: theme.spacing.unit,
    width: 34,
    textAlign: 'right',
    paddingRight: 22,
    color: theme.palette.text.secondary,
    height: 32,
    lineHeight: '32px',
  },
  selectRoot: {
    marginRight: theme.spacing.unit * 4,
  },
  actions: {
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

/**
 * A `TableRow` based component for placing inside `TableFooter` for pagination.
 */
function TablePagination(props) {
  const {
    classes,
    className,
    count,
    labelDisplayedRows,
    labelRowsPerPage,
    onChangePage,
    onChangeRowsPerPage,
    page,
    rowsPerPage,
    rowsPerPageOptions,
    ...other
  } = props;

  return (
    <TableRow className={className} {...other}>
      <TableCell
        className={classes.cell}
        colSpan={9001} // col-span over everything
      >
        <Toolbar className={classes.toolbar}>
          <div className={classes.spacer} />
          <div>
            <Typography type="caption">{labelRowsPerPage}</Typography>
          </div>
          <Select
            classes={{ root: classes.selectRoot, select: classes.select }}
            input={<Input disableUnderline />}
            value={rowsPerPage}
            onChange={onChangeRowsPerPage}
          >
            {rowsPerPageOptions.map(rowsPerPageOption => (
              <MenuItem key={rowsPerPageOption} value={rowsPerPageOption}>
                {rowsPerPageOption}
              </MenuItem>
            ))}
          </Select>
          <div>
            <Typography type="caption">
              {labelDisplayedRows({
                from: page * rowsPerPage + 1,
                to: Math.min(count, (page + 1) * rowsPerPage),
                count,
                page,
              })}
            </Typography>
          </div>
          <div className={classes.actions}>
            <IconButton onClick={e => onChangePage(e, page - 1)} disabled={page === 0}>
              <KeyboardArrowLeft />
            </IconButton>
            <IconButton
              onClick={e => onChangePage(e, page + 1)}
              disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            >
              <KeyboardArrowRight />
            </IconButton>
          </div>
        </Toolbar>
      </TableCell>
    </TableRow>
  );
}

TablePagination.propTypes = {
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
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
   * Callback fired when the page is changed. Invoked with two arguments: the event and the
   * page to show.
   */
  onChangePage: PropTypes.func.isRequired,
  /**
   * Callback fired when the number of rows per page is changed. Invoked with two arguments: the
   * event.
   */
  onChangeRowsPerPage: PropTypes.func.isRequired,
  /**
   * The zero-based index of the current page.
   */
  page: PropTypes.number.isRequired,
  /**
   * The number of rows per page.
   */
  rowsPerPage: PropTypes.number.isRequired,
  /**
   * Customizes the options of the rows per page select field.
   */
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
};

TablePagination.defaultProps = {
  labelRowsPerPage: 'Rows per page:',
  labelDisplayedRows: ({ from, to, count }) => `${from}-${to} of ${count}`,
  rowsPerPageOptions: [5, 10, 25],
};

export default withStyles(styles, { name: 'TablePagination' })(TablePagination);
