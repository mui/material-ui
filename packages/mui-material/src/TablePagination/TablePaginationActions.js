import * as React from 'react';
import PropTypes from 'prop-types';
import useTheme from '../styles/useTheme';
import IconButton from '../IconButton';

/**
 * @ignore - internal component.
 */
const TablePaginationActions = React.forwardRef(function TablePaginationActions(props, ref) {
  const {
    backIconButtonProps,
    count,
    getItemAriaLabel,
    nextIconButtonProps,
    onPageChange,
    page,
    rowsPerPage,
    showFirstButton,
    showLastButton,
    slots,
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

  const LastIcon = slots.Last;
  const FirstIcon = slots.First;
  const PreviousIcon = slots.Previous;
  const NextIcon = slots.Next;

  return (
    <div ref={ref} {...other}>
      {showFirstButton && (
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label={getItemAriaLabel('first', page)}
          title={getItemAriaLabel('first', page)}
        >
          {theme.direction === 'rtl' ? (
            <LastIcon {...slotProps?.last} />
          ) : (
            <FirstIcon {...slotProps?.first} />
          )}
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
        {theme.direction === 'rtl' ? (
          <NextIcon {...slotProps?.next} />
        ) : (
          <PreviousIcon {...slotProps?.previous} />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={count !== -1 ? page >= Math.ceil(count / rowsPerPage) - 1 : false}
        color="inherit"
        aria-label={getItemAriaLabel('next', page)}
        title={getItemAriaLabel('next', page)}
        {...nextIconButtonProps}
      >
        {theme.direction === 'rtl' ? (
          <PreviousIcon {...slotProps?.previous} />
        ) : (
          <NextIcon {...slotProps?.next} />
        )}
      </IconButton>
      {showLastButton && (
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label={getItemAriaLabel('last', page)}
          title={getItemAriaLabel('last', page)}
        >
          {theme.direction === 'rtl' ? (
            <FirstIcon {...slotProps?.first} />
          ) : (
            <LastIcon {...slotProps?.last} />
          )}
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
   * The props used for each slot inside.
   *
   * This prop is an alias for the `componentsProps` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slotProps: PropTypes.shape({
    first: PropTypes.object,
    last: PropTypes.object,
    next: PropTypes.object,
    previous: PropTypes.object,
  }),
  /**
   * The components used for First, Last, Next & Previous item type
   *
   * This prop is an alias for the `components` prop, which will be deprecated in the future.
   *
   * @default {
   *   First: FirstPageIcon,
   *   Last: LastPageIcon,
   *   Next: KeyboardArrowRight,
   *   Previous: KeyboardArrowLeft,
   * }
   */
  slots: PropTypes.shape({
    First: PropTypes.elementType,
    Last: PropTypes.elementType,
    Next: PropTypes.elementType,
    Previous: PropTypes.elementType,
  }),
};

export default TablePaginationActions;
