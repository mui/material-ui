import React from 'react';
import PropTypes from 'prop-types';
import KeyboardArrowLeft from '../internal/svg-icons/KeyboardArrowLeft';
import KeyboardArrowRight from '../internal/svg-icons/KeyboardArrowRight';
import withStyles from '../styles/withStyles';
import IconButton from '../IconButton';

export const styles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

/**
 * @ignore - internal component.
 */
class TablePaginationActions extends React.Component {
  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  render() {
    const {
      backIconButtonProps,
      classes,
      count,
      nextIconButtonProps,
      onChangePage,
      page,
      rowsPerPage,
      theme,
      ...other
    } = this.props;

    return (
      <div className={classes.root} {...other}>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          {...backIconButtonProps}
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          {...nextIconButtonProps}
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  /**
   * Properties applied to the back arrow `IconButton` component.
   */
  backIconButtonProps: PropTypes.object,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * The total number of rows.
   */
  count: PropTypes.number.isRequired,
  /**
   * Properties applied to the next arrow `IconButton` component.
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
   * The zero-based index of the current page.
   */
  page: PropTypes.number.isRequired,
  /**
   * The number of rows per page.
   */
  rowsPerPage: PropTypes.number.isRequired,
  /**
   * @ignore
   */
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { name: 'MuiTablePaginationActions', withTheme: true })(
  TablePaginationActions,
);
