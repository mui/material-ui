import * as React from 'react';
import { IconButtonProps } from '../IconButton/IconButton';
import { SvgIconProps } from '../SvgIcon';

export interface TablePaginationActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * This prop is an alias for `slotProps.previousButton` and will be overriden by it if both are used.
   * @deprecated Use `slotProps.previousButton` instead.
   */
  backIconButtonProps?: Partial<IconButtonProps>;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {};
  count: number;
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current page.
   * This is important for screen reader users.
   *
   * For localization purposes, you can use the provided [translations](https://mui.com/material-ui/guides/localization/).
   * @param {string} type The link or button type to format ('first' | 'last' | 'next' | 'previous').
   * @returns {string}
   */
  getItemAriaLabel: (type: 'first' | 'last' | 'next' | 'previous') => string;
  /**
   * This prop is an alias for `slotProps.nextButton` and will be overriden by it if both are used.
   * @deprecated Use `slotProps.nextButton` instead.
   */
  nextIconButtonProps?: Partial<IconButtonProps>;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void;
  page: number;
  rowsPerPage: number;
  showFirstButton: boolean;
  showLastButton: boolean;
  slotProps?: {
    firstButton?: Partial<IconButtonProps>;
    lastButton?: Partial<IconButtonProps>;
    nextButton?: Partial<IconButtonProps>;
    previousButton?: Partial<IconButtonProps>;
    firstButtonIcon?: Partial<SvgIconProps>;
    lastButtonIcon?: Partial<SvgIconProps>;
    nextButtonIcon?: Partial<SvgIconProps>;
    previousButtonIcon?: Partial<SvgIconProps>;
  };
  slots?: TablePaginationActionsSlots;
}

export interface TablePaginationActionsSlots {
  /**
   * The component that renders the first button.
   * @default IconButton
   */
  firstButton?: React.ElementType;
  /**
   * The component that renders the last button.
   * @default IconButton
   */
  lastButton?: React.ElementType;
  /**
   * The component that renders the next button.
   * @default IconButton
   */
  nextButton?: React.ElementType;
  /**
   * The component that renders the previous button.
   * @default IconButton
   */
  previousButton?: React.ElementType;
  /**
   * The component that renders the first button icon.
   * @default FirstPageIcon
   */
  firstButtonIcon?: React.ElementType;
  /**
   * The component that renders the last button icon.
   * @default LastPageIcon
   */
  lastButtonIcon?: React.ElementType;
  /**
   * The component that renders the next button icon.
   * @default KeyboardArrowRight
   */
  nextButtonIcon?: React.ElementType;
  /**
   * The component that renders the previous button icon.
   * @default KeyboardArrowLeft
   */
  previousButtonIcon?: React.ElementType;
}

declare const TablePaginationActions: React.JSXElementConstructor<TablePaginationActionsProps>;

export default TablePaginationActions;
