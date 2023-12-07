'use client';
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
    disabled = false,
    getItemAriaLabel,
    nextIconButtonProps,
    onPageChange,
    page,
    rowsPerPage,
    showFirstButton,
    showLastButton,
    slotProps,
    ...other
  } = props;

  const theme = useTheme();

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div ref={ref} {...other}>
      {showFirstButton && (
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={disabled || page === 0}
          aria-label={getItemAriaLabel('first', page)}
          title={getItemAriaLabel('first', page)}
          {...(slotProps?.firstButton ?? {})}
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
      )}
      <IconButton
        onClick={handleBackButtonClick}
        disabled={disabled || page === 0}
        color="inherit"
        aria-label={getItemAriaLabel('previous', page)}
        title={getItemAriaLabel('previous', page)}
        {...(slotProps?.previousButton ?? backIconButtonProps)}
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={disabled || (count !== -1 ? page >= Math.ceil(count / rowsPerPage) - 1 : false)}
        color="inherit"
        aria-label={getItemAriaLabel('next', page)}
        title={getItemAriaLabel('next', page)}
        {...(slotProps?.nextButton ?? nextIconButtonProps)}
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      {showLastButton && (
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={disabled || page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label={getItemAriaLabel('last', page)}
          title={getItemAriaLabel('last', page)}
          {...(slotProps?.lastButton ?? {})}
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      )}
    </div>
  );
});

TablePaginationActions.propTypes = {
  /**
   * Props applied to the back arrow [`IconButton`](/material-ui/api/icon-button/) element.
   */
  backIconButtonProps: PropTypes.object,
  /**
   * The total number of rows.
   */
  count: PropTypes.number.isRequired,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current page.
   *
   * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
   *
   * @param {string} type The link or button type to format ('page' | 'first' | 'last' | 'next' | 'previous'). Defaults to 'page'.
   * @param {number} page The page number to format.
   * @returns {string}
   */
  getItemAriaLabel: PropTypes.func.isRequired,
  /**
   * Props applied to the next arrow [`IconButton`](/material-ui/api/icon-button/) element.
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
  /**
   * The props used for each slot inside the TablePaginationActions.
   * @default {}
   */
  slotProps: PropTypes.shape({
    firstButton: PropTypes.object,
    lastButton: PropTypes.object,
    nextButton: PropTypes.object,
    previousButton: PropTypes.object,
  }),
};

export default TablePaginationActions;
