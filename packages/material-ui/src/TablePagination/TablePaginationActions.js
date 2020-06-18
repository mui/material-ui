import * as React from 'react';
import PropTypes from 'prop-types';
import KeyboardArrowLeft from '../internal/svg-icons/KeyboardArrowLeft';
import KeyboardArrowRight from '../internal/svg-icons/KeyboardArrowRight';
import useTheme from '../styles/useTheme';
import IconButton from '../IconButton';
import LastPageIcon from '../internal/svg-icons/LastPage';
import FirstPageIcon from '../internal/svg-icons/FirstPage';

/**
 * @ignore - internal component.
 */
const TablePaginationActions = React.forwardRef(function TablePaginationActions(props, ref) {
  const {
    backIconButtonProps,
    count,
    getItemAriaLabel,
    nextIconButtonProps,
    onChangePage,
    page,
    rowsPerPage,
    showFirstButton,
    showLastButton,
    ...other
  } = props;

  const theme = useTheme();

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div ref={ref} {...other}>
      {showFirstButton && (
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label={getItemAriaLabel('first', page)}
          title={getItemAriaLabel('first', page)}
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
      )}
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        color="inherit"
        aria-label={getItemAriaLabel('previous', page)}
        title={getItemAriaLabel('previous', page)}
        {...backIconButtonProps}
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={count !== -1 ? page >= Math.ceil(count / rowsPerPage) - 1 : false}
        color="inherit"
        aria-label={getItemAriaLabel('next', page)}
        title={getItemAriaLabel('next', page)}
        {...nextIconButtonProps}
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      {showLastButton && (
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label={getItemAriaLabel('last', page)}
          title={getItemAriaLabel('last', page)}
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      )}
    </div>
  );
});

TablePaginationActions.propTypes = {
  /**
   * Props applied to the back arrow [`IconButton`](/api/icon-button/) element.
   */
  backIconButtonProps: PropTypes.object,
  /**
   * The total number of rows.
   */
  count: PropTypes.number.isRequired,
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current page.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   *
   * @param {string} type The link or button type to format ('page' | 'first' | 'last' | 'next' | 'previous'). Defaults to 'page'.
   * @param {number} page The page number to format.
   * @returns {string}
   */
  getItemAriaLabel: PropTypes.func.isRequired,
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
   * If `true`, show the first-page button.
   */
  showFirstButton: PropTypes.bool.isRequired,
  /**
   * If `true`, show the last-page button.
   */
  showLastButton: PropTypes.bool.isRequired,
};

export default TablePaginationActions;
