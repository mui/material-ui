import React from 'react';
import PropTypes from 'prop-types';
import KeyboardArrowLeft from '../internal/svg-icons/KeyboardArrowLeft';
import KeyboardArrowRight from '../internal/svg-icons/KeyboardArrowRight';
import withTheme from '../styles/withTheme';
import IconButton from '../IconButton';

/**
 * @ignore - internal component.
 */
const TablePaginationActions = React.forwardRef(function TablePaginationActions(props, ref) {
  const {
    backIconButtonProps,
    count,
    nextIconButtonProps,
    onChangePage,
    page,
    rowsPerPage,
    theme,
    ...other
  } = props;

  const handleBackButtonClick = event => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = event => {
    onChangePage(event, page + 1);
  };

  return (
    <div ref={ref} {...other}>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        color="inherit"
        {...backIconButtonProps}
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        color="inherit"
        {...nextIconButtonProps}
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
    </div>
  );
});

TablePaginationActions.propTypes = {
  /**
   * Properties applied to the back arrow [`IconButton`](/api/icon-button/) element.
   */
  backIconButtonProps: PropTypes.object,
  /**
   * The total number of rows.
   */
  count: PropTypes.number.isRequired,
  /**
   * Properties applied to the next arrow [`IconButton`](/api/icon-button/) element.
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

export default withTheme(TablePaginationActions);
