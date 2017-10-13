// @flow
// @inheritedComponent TableCell

import React from 'react';
import type { ElementType, Node } from 'react';
import withStyles from '../styles/withStyles';
import IconButton from '../IconButton';
import Input from '../Input';
import { MenuItem } from '../Menu';
import Select from '../Select';
import TableCell from './TableCell';
import Toolbar from '../Toolbar';
import Typography from '../Typography';
import KeyboardArrowLeft from '../svg-icons/KeyboardArrowLeft';
import KeyboardArrowRight from '../svg-icons/KeyboardArrowRight';

export const styles = (theme: Object) => ({
  root: {
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
  selectRoot: {
    marginRight: theme.spacing.unit * 4,
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
  actions: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

export type LabelDisplayedRowsArgs = {
  from: number,
  to: number,
  count: number,
  page: number,
};

type ProvidedProps = {
  classes: Object,
  component: ElementType,
  labelRowsPerPage: string,
  labelDisplayedRows: (paginationInfo: LabelDisplayedRowsArgs) => string,
  rowsPerPageOptions: number[],
  theme: Object,
};

export type Props = {
  /**
   * Useful to extend the style applied to components.
   */
  classes?: Object,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component?: ElementType,
  /**
   * @ignore
   */
  colSpan?: number,
  /**
   * The total number of rows.
   */
  count: number,
  /**
   * Useful to customize the displayed rows label.
   */
  labelDisplayedRows?: (paginationInfo: LabelDisplayedRowsArgs) => Node,
  /**
   * Useful to customize the rows per page label. Invoked with a `{ from, to, count, page }`
   * object.
   */
  labelRowsPerPage?: Node,
  /**
   * Callback fired when the page is changed. Invoked with two arguments: the event and the
   * page to show.
   */
  onChangePage: (event: SyntheticInputEvent<> | null, page: number) => void,
  /**
   * Callback fired when the number of rows per page is changed. Invoked with two arguments: the
   * event.
   */
  onChangeRowsPerPage: (event: SyntheticInputEvent<>) => void,
  /**
   * The zero-based index of the current page.
   */
  page: number,
  /**
   * The number of rows per page.
   */
  rowsPerPage: number,
  /**
   * Customizes the options of the rows per page select field.
   */
  rowsPerPageOptions?: number[],
  /**
   * @ignore
   */
  theme?: Object,
};

/**
 * A `TableRow` based component for placing inside `TableFooter` for pagination.
 */
class TablePagination extends React.Component<ProvidedProps & Props> {
  static defaultProps = {
    component: TableCell,
    labelRowsPerPage: 'Rows per page:',
    labelDisplayedRows: ({ from, to, count }) => `${from}-${to} of ${count}`,
    rowsPerPageOptions: [5, 10, 25],
  };

  componentWillReceiveProps({ count, onChangePage, rowsPerPage }) {
    const newLastPage = Math.max(0, Math.ceil(count / rowsPerPage) - 1);
    if (this.props.page > newLastPage) {
      onChangePage(null, newLastPage);
    }
  }

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  render() {
    const {
      classes,
      component: Component,
      colSpan: colSpanProp,
      count,
      labelDisplayedRows,
      labelRowsPerPage,
      onChangePage,
      onChangeRowsPerPage,
      page,
      rowsPerPage,
      rowsPerPageOptions,
      theme,
      ...other
    } = this.props;

    let colSpan;

    if (Component === TableCell || Component === 'td') {
      colSpan = colSpanProp || 9001; // col-span over everything
    }

    return (
      <Component className={classes.root} colSpan={colSpan} {...other}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.spacer} />
          <Typography type="caption" className={classes.caption}>
            {labelRowsPerPage}
          </Typography>
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
          <Typography type="caption" className={classes.caption}>
            {labelDisplayedRows({
              from: count === 0 ? 0 : page * rowsPerPage + 1,
              to: Math.min(count, (page + 1) * rowsPerPage),
              count,
              page,
            })}
          </Typography>
          <div className={classes.actions}>
            <IconButton onClick={this.handleBackButtonClick} disabled={page === 0}>
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
              onClick={this.handleNextButtonClick}
              disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            >
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
          </div>
        </Toolbar>
      </Component>
    );
  }
}

export default withStyles(styles, { withTheme: true, name: 'MuiTablePagination' })(TablePagination);
