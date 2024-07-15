'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { useRtl } from '@mui/system/RtlProvider';
import KeyboardArrowLeft from '../internal/svg-icons/KeyboardArrowLeft';
import KeyboardArrowRight from '../internal/svg-icons/KeyboardArrowRight';
import IconButton from '../IconButton';
import LastPageIconDefault from '../internal/svg-icons/LastPage';
import FirstPageIconDefault from '../internal/svg-icons/FirstPage';

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
    slots = {},
    slotProps = {},
    ...other
  } = props;

  const isRtl = useRtl();

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

  const FirstButton = slots.firstButton ?? IconButton;
  const LastButton = slots.lastButton ?? IconButton;
  const NextButton = slots.nextButton ?? IconButton;
  const PreviousButton = slots.previousButton ?? IconButton;
  const FirstButtonIcon = slots.firstButtonIcon ?? FirstPageIconDefault;
  const LastButtonIcon = slots.lastButtonIcon ?? LastPageIconDefault;
  const NextButtonIcon = slots.nextButtonIcon ?? KeyboardArrowRight;
  const PreviousButtonIcon = slots.previousButtonIcon ?? KeyboardArrowLeft;

  const FirstButtonSlot = isRtl ? LastButton : FirstButton;
  const PreviousButtonSlot = isRtl ? NextButton : PreviousButton;
  const NextButtonSlot = isRtl ? PreviousButton : NextButton;
  const LastButtonSlot = isRtl ? FirstButton : LastButton;

  const firstButtonSlotProps = isRtl ? slotProps.lastButton : slotProps.firstButton;
  const previousButtonSlotProps = isRtl ? slotProps.nextButton : slotProps.previousButton;
  const nextButtonSlotProps = isRtl ? slotProps.previousButton : slotProps.nextButton;
  const lastButtonSlotProps = isRtl ? slotProps.firstButton : slotProps.lastButton;

  return (
    <div ref={ref} {...other}>
      {showFirstButton && (
        <FirstButtonSlot
          onClick={handleFirstPageButtonClick}
          disabled={disabled || page === 0}
          aria-label={getItemAriaLabel('first', page)}
          title={getItemAriaLabel('first', page)}
          {...firstButtonSlotProps}
        >
          {isRtl ? (
            <LastButtonIcon {...slotProps.lastButtonIcon} />
          ) : (
            <FirstButtonIcon {...slotProps.firstButtonIcon} />
          )}
        </FirstButtonSlot>
      )}
      <PreviousButtonSlot
        onClick={handleBackButtonClick}
        disabled={disabled || page === 0}
        color="inherit"
        aria-label={getItemAriaLabel('previous', page)}
        title={getItemAriaLabel('previous', page)}
        {...(previousButtonSlotProps ?? backIconButtonProps)}
      >
        {isRtl ? (
          <NextButtonIcon {...slotProps.nextButtonIcon} />
        ) : (
          <PreviousButtonIcon {...slotProps.previousButtonIcon} />
        )}
      </PreviousButtonSlot>
      <NextButtonSlot
        onClick={handleNextButtonClick}
        disabled={disabled || (count !== -1 ? page >= Math.ceil(count / rowsPerPage) - 1 : false)}
        color="inherit"
        aria-label={getItemAriaLabel('next', page)}
        title={getItemAriaLabel('next', page)}
        {...(nextButtonSlotProps ?? nextIconButtonProps)}
      >
        {isRtl ? (
          <PreviousButtonIcon {...slotProps.previousButtonIcon} />
        ) : (
          <NextButtonIcon {...slotProps.nextButtonIcon} />
        )}
      </NextButtonSlot>
      {showLastButton && (
        <LastButtonSlot
          onClick={handleLastPageButtonClick}
          disabled={disabled || page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label={getItemAriaLabel('last', page)}
          title={getItemAriaLabel('last', page)}
          {...lastButtonSlotProps}
        >
          {isRtl ? (
            <FirstButtonIcon {...slotProps.firstButtonIcon} />
          ) : (
            <LastButtonIcon {...slotProps.lastButtonIcon} />
          )}
        </LastButtonSlot>
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
    firstButtonIcon: PropTypes.object,
    lastButton: PropTypes.object,
    lastButtonIcon: PropTypes.object,
    nextButton: PropTypes.object,
    nextButtonIcon: PropTypes.object,
    previousButton: PropTypes.object,
    previousButtonIcon: PropTypes.object,
  }),
  /**
   * The components used for each slot inside the TablePaginationActions.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    firstButton: PropTypes.elementType,
    firstButtonIcon: PropTypes.elementType,
    lastButton: PropTypes.elementType,
    lastButtonIcon: PropTypes.elementType,
    nextButton: PropTypes.elementType,
    nextButtonIcon: PropTypes.elementType,
    previousButton: PropTypes.elementType,
    previousButtonIcon: PropTypes.elementType,
  }),
};

export default TablePaginationActions;
