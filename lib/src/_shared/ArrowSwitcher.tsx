import * as React from 'react';
import clsx from 'clsx';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { ArrowRightIcon } from './icons/ArrowRightIcon';
import { IconButton, IconButtonProps, makeStyles, useTheme } from '@material-ui/core';

export interface ExportedArrowSwitcherProps {
  /** Left arrow icon */
  leftArrowIcon?: React.ReactNode;
  /** Right arrow icon */
  rightArrowIcon?: React.ReactNode;
  /** Left arrow icon aria-label text */
  leftArrowButtonText?: string;
  /** Right arrow icon aria-label text */
  rightArrowButtonText?: string;
  /**
   * Props to pass to left arrow button
   * @type {Partial<IconButtonProps>}
   */
  leftArrowButtonProps?: Partial<IconButtonProps>;
  /**
   * Props to pass to right arrow button
   * @type {Partial<IconButtonProps>}
   */
  rightArrowButtonProps?: Partial<IconButtonProps>;
}

interface ArrowSwitcherProps extends ExportedArrowSwitcherProps {
  className?: string;
  isLeftDisabled: boolean;
  isRightDisabled: boolean;
  onLeftClick: () => void;
  onRightClick: () => void;
}

const useStyles = makeStyles(theme => ({
  iconButton: {
    zIndex: 1,
    backgroundColor: theme.palette.background.paper,
  },
  previousMonthButton: {
    marginRight: 24,
  },
}));

export const ArrowSwitcher: React.FC<ArrowSwitcherProps> = ({
  className,
  leftArrowButtonProps,
  leftArrowButtonText,
  rightArrowButtonProps,
  rightArrowButtonText,
  isLeftDisabled,
  isRightDisabled,
  onLeftClick,
  onRightClick,
  leftArrowIcon = <ArrowLeftIcon />,
  rightArrowIcon = <ArrowRightIcon />,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const isRtl = theme.direction === 'rtl';

  return (
    <div className={className}>
      <IconButton
        data-mui-test="previous-arrow-button"
        size="small"
        aria-label={leftArrowButtonText}
        {...leftArrowButtonProps}
        disabled={isLeftDisabled}
        onClick={onLeftClick}
        className={clsx(
          classes.iconButton,
          classes.previousMonthButton,
          leftArrowButtonProps?.className
        )}
      >
        {isRtl ? rightArrowIcon : leftArrowIcon}
      </IconButton>

      <IconButton
        data-mui-test="next-arrow-button"
        size="small"
        aria-label={rightArrowButtonText}
        {...rightArrowButtonProps}
        disabled={isRightDisabled}
        onClick={onRightClick}
        className={clsx(classes.iconButton, rightArrowButtonProps?.className)}
      >
        {isRtl ? leftArrowIcon : rightArrowIcon}
      </IconButton>
    </div>
  );
};
