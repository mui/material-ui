import * as React from 'react';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import { createStyles, WithStyles, withStyles, Theme, useTheme } from '@material-ui/core/styles';
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';
import ArrowLeftIcon from '../svg-icons/ArrowLeft';
import ArrowRightIcon from '../svg-icons/ArrowRight';

export interface ExportedArrowSwitcherProps {
  /**
   * Left arrow icon.
   */
  leftArrowIcon?: React.ReactNode;
  /**
   * Right arrow icon.
   */
  rightArrowIcon?: React.ReactNode;
  /**
   * Left arrow icon aria-label text.
   */
  leftArrowButtonText?: string;
  /**
   * Right arrow icon aria-label text.
   */
  rightArrowButtonText?: string;
  /**
   * Props to pass to left arrow button.
   */
  leftArrowButtonProps?: Partial<IconButtonProps>;
  /**
   * Props to pass to right arrow button.
   */
  rightArrowButtonProps?: Partial<IconButtonProps>;
}

interface ArrowSwitcherProps extends ExportedArrowSwitcherProps, React.HTMLProps<HTMLDivElement> {
  isLeftDisabled: boolean;
  isLeftHidden?: boolean;
  isRightDisabled: boolean;
  isRightHidden?: boolean;
  onLeftClick: () => void;
  onRightClick: () => void;
  text?: string;
}

export const styles = (theme: Theme) =>
  createStyles({
    root: {},
    iconButton: {
      zIndex: 1,
      backgroundColor: theme.palette.background.paper,
    },
    previousMonthButtonMargin: {
      marginRight: 24,
    },
    hidden: {
      visibility: 'hidden',
    },
  });

export type PickersArrowSwitcherClassKey = keyof WithStyles<typeof styles>['classes'];

const PickersArrowSwitcher = React.forwardRef<
  HTMLDivElement,
  ArrowSwitcherProps & WithStyles<typeof styles>
>((props, ref) => {
  const {
    classes,
    className,
    isLeftDisabled,
    isLeftHidden,
    isRightDisabled,
    isRightHidden,
    leftArrowButtonProps,
    leftArrowButtonText,
    leftArrowIcon = <ArrowLeftIcon />,
    onLeftClick,
    onRightClick,
    rightArrowButtonProps,
    rightArrowButtonText,
    rightArrowIcon = <ArrowRightIcon />,
    text,
    ...other
  } = props;
  const theme = useTheme();
  const isRtl = theme.direction === 'rtl';

  return (
    <div className={clsx(classes.root, className)} ref={ref} {...other}>
      <IconButton
        size="small"
        aria-hidden={isLeftHidden}
        aria-label={leftArrowButtonText}
        {...leftArrowButtonProps}
        disabled={isLeftDisabled}
        onClick={onLeftClick}
        className={clsx(classes.iconButton, leftArrowButtonProps?.className, {
          [classes.hidden]: isLeftHidden,
          [classes.previousMonthButtonMargin]: !text,
        })}
      >
        {isRtl ? rightArrowIcon : leftArrowIcon}
      </IconButton>
      {text && (
        <Typography variant="subtitle1" display="inline">
          {text}
        </Typography>
      )}
      <IconButton
        size="small"
        aria-hidden={isRightHidden}
        aria-label={rightArrowButtonText}
        {...rightArrowButtonProps}
        disabled={isRightDisabled}
        onClick={onRightClick}
        className={clsx(classes.iconButton, rightArrowButtonProps?.className, {
          [classes.hidden]: isRightHidden,
        })}
      >
        {isRtl ? leftArrowIcon : rightArrowIcon}
      </IconButton>
    </div>
  );
});

export default withStyles(styles, { name: 'MuiPickersArrowSwitcher' })(
  React.memo(PickersArrowSwitcher),
);
