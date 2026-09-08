'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { useRtl } from '@mui/system/RtlProvider';
import composeClasses from '@mui/utils/composeClasses';
import clsx from 'clsx';
import { styled } from '../zero-styled';
import { useDefaultProps } from '../DefaultPropsProvider';
import KeyboardArrowLeft from '../internal/svg-icons/KeyboardArrowLeft';
import KeyboardArrowRight from '../internal/svg-icons/KeyboardArrowRight';
import IconButton from '../IconButton';
import Tooltip from '../Tooltip';
import LastPageIconDefault from '../internal/svg-icons/LastPage';
import FirstPageIconDefault from '../internal/svg-icons/FirstPage';
import getActiveElement from '../utils/getActiveElement';
import ownerDocument from '../utils/ownerDocument';
import useEnhancedEffect from '../utils/useEnhancedEffect';
import useForkRef from '../utils/useForkRef';
import { getTablePaginationActionsUtilityClass } from './tablePaginationActionsClasses';

function isDisabled(button) {
  return button.disabled || button.getAttribute('aria-disabled') === 'true';
}

const useUtilityClasses = (ownerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getTablePaginationActionsUtilityClass, classes);
};

const TablePaginationActionsRoot = styled('div', {
  name: 'MuiTablePaginationActions',
  slot: 'Root',
})({});

const TablePaginationActions = React.forwardRef(function TablePaginationActions(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiTablePaginationActions' });

  const {
    className,
    count,
    disabled = false,
    getItemAriaLabel,
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

  const ownerState = props;

  const classes = useUtilityClasses(ownerState);

  const firstButtonRef = React.useRef(null);
  const previousButtonRef = React.useRef(null);
  const nextButtonRef = React.useRef(null);
  const lastButtonRef = React.useRef(null);
  const buttonRefs = [firstButtonRef, previousButtonRef, nextButtonRef, lastButtonRef];
  const focusedButtonRef = React.useRef(null);

  const handleFocus = (event) => {
    if (buttonRefs.some((buttonRef) => buttonRef.current === event.target)) {
      focusedButtonRef.current = event.target;
    }
    other.onFocus?.(event);
  };

  const handleBlur = (event) => {
    // Disabling a focused button can blur it before the layout effect runs.
    if (!isDisabled(event.target) || event.relatedTarget != null) {
      focusedButtonRef.current = null;
    }
    other.onBlur?.(event);
  };

  useEnhancedEffect(() => {
    const focusedButton = focusedButtonRef.current;
    if (!focusedButton || !isDisabled(focusedButton)) {
      return;
    }

    focusedButtonRef.current = null;
    const document = ownerDocument(focusedButton);
    const activeElement = getActiveElement(document);
    if (
      activeElement != null &&
      activeElement !== focusedButton &&
      activeElement !== document.body &&
      activeElement !== document.documentElement
    ) {
      return;
    }

    const buttons = buttonRefs.map((buttonRef) => buttonRef.current).filter(Boolean);
    const focusedIndex = buttons.indexOf(focusedButton);
    if (focusedIndex === -1) {
      return;
    }

    // Slot props can disable actions independently, so the opposite action may also be disabled.
    // Search outward for the nearest enabled button, preferring the following button on a tie.
    for (let distance = 1; distance < buttons.length; distance += 1) {
      const nextButton = [buttons[focusedIndex + distance], buttons[focusedIndex - distance]].find(
        (button) => button && !isDisabled(button) && button.tabIndex >= 0,
      );
      if (nextButton) {
        nextButton.focus();
        return;
      }
    }
  });

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

  const { title: firstButtonTitle = getItemAriaLabel('first', page), ...firstButtonSlotProps } =
    (isRtl ? slotProps.lastButton : slotProps.firstButton) ?? {};
  const {
    title: previousButtonTitle = getItemAriaLabel('previous', page),
    ...previousButtonSlotProps
  } = (isRtl ? slotProps.nextButton : slotProps.previousButton) ?? {};
  const { title: nextButtonTitle = getItemAriaLabel('next', page), ...nextButtonSlotProps } =
    (isRtl ? slotProps.previousButton : slotProps.nextButton) ?? {};
  const { title: lastButtonTitle = getItemAriaLabel('last', page), ...lastButtonSlotProps } =
    (isRtl ? slotProps.firstButton : slotProps.lastButton) ?? {};

  const handleFirstButtonRef = useForkRef(firstButtonRef, firstButtonSlotProps.ref);
  const handlePreviousButtonRef = useForkRef(previousButtonRef, previousButtonSlotProps.ref);
  const handleNextButtonRef = useForkRef(nextButtonRef, nextButtonSlotProps.ref);
  const handleLastButtonRef = useForkRef(lastButtonRef, lastButtonSlotProps.ref);

  return (
    <TablePaginationActionsRoot
      ref={ref}
      className={clsx(classes.root, className)}
      {...other}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {showFirstButton && (
        <Tooltip title={firstButtonTitle}>
          <FirstButtonSlot
            onClick={handleFirstPageButtonClick}
            disabled={disabled || page === 0}
            aria-label={getItemAriaLabel('first', page)}
            {...firstButtonSlotProps}
            ref={handleFirstButtonRef}
          >
            {isRtl ? (
              <LastButtonIcon {...slotProps.lastButtonIcon} />
            ) : (
              <FirstButtonIcon {...slotProps.firstButtonIcon} />
            )}
          </FirstButtonSlot>
        </Tooltip>
      )}
      <Tooltip title={previousButtonTitle}>
        <PreviousButtonSlot
          onClick={handleBackButtonClick}
          disabled={disabled || page === 0}
          color="inherit"
          aria-label={getItemAriaLabel('previous', page)}
          {...previousButtonSlotProps}
          ref={handlePreviousButtonRef}
        >
          {isRtl ? (
            <NextButtonIcon {...slotProps.nextButtonIcon} />
          ) : (
            <PreviousButtonIcon {...slotProps.previousButtonIcon} />
          )}
        </PreviousButtonSlot>
      </Tooltip>
      <Tooltip title={nextButtonTitle}>
        <NextButtonSlot
          onClick={handleNextButtonClick}
          disabled={disabled || (count !== -1 ? page >= Math.ceil(count / rowsPerPage) - 1 : false)}
          color="inherit"
          aria-label={getItemAriaLabel('next', page)}
          {...nextButtonSlotProps}
          ref={handleNextButtonRef}
        >
          {isRtl ? (
            <PreviousButtonIcon {...slotProps.previousButtonIcon} />
          ) : (
            <NextButtonIcon {...slotProps.nextButtonIcon} />
          )}
        </NextButtonSlot>
      </Tooltip>
      {showLastButton && (
        <Tooltip title={lastButtonTitle}>
          <LastButtonSlot
            onClick={handleLastPageButtonClick}
            disabled={disabled || page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label={getItemAriaLabel('last', page)}
            {...lastButtonSlotProps}
            ref={handleLastButtonRef}
          >
            {isRtl ? (
              <FirstButtonIcon {...slotProps.firstButtonIcon} />
            ) : (
              <LastButtonIcon {...slotProps.lastButtonIcon} />
            )}
          </LastButtonSlot>
        </Tooltip>
      )}
    </TablePaginationActionsRoot>
  );
});

TablePaginationActions.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: PropTypes.node,
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
  count: PropTypes.number.isRequired,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current page.
   * This is important for screen reader users.
   *
   * For localization purposes, you can use the provided [translations](https://mui.com/material-ui/guides/localization/).
   * @param {string} type The link or button type to format ('first' | 'last' | 'next' | 'previous').
   * @returns {string}
   */
  getItemAriaLabel: PropTypes.func.isRequired,
  /**
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * @ignore
   */
  onPageChange: PropTypes.func.isRequired,
  /**
   * @ignore
   */
  page: PropTypes.number.isRequired,
  /**
   * @ignore
   */
  rowsPerPage: PropTypes.number.isRequired,
  /**
   * @ignore
   */
  showFirstButton: PropTypes.bool.isRequired,
  /**
   * @ignore
   */
  showLastButton: PropTypes.bool.isRequired,
  /**
   * @ignore
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
   * @ignore
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
