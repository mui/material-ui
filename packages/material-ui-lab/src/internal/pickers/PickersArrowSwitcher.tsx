import * as React from 'react';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import { MuiStyles, StyleRules, WithStyles, withStyles, useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ArrowLeftIcon from '../svg-icons/ArrowLeft';
import ArrowRightIcon from '../svg-icons/ArrowRight';

export interface ExportedArrowSwitcherProps {
  /**
   * The components used for each slot.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components?: {
    LeftArrowButton?: React.ElementType;
    LeftArrowIcon?: React.ElementType;
    RightArrowButton?: React.ElementType;
    RightArrowIcon?: React.ElementType;
  };
  /**
   * The props used for each slot inside.
   * @default {}
   */
  componentsProps?: {
    leftArrowButton?: any;
    rightArrowButton?: any;
  };
  /**
   * Left arrow icon aria-label text.
   */
  leftArrowButtonText?: string;
  /**
   * Right arrow icon aria-label text.
   */
  rightArrowButtonText?: string;
}

interface ArrowSwitcherProps extends ExportedArrowSwitcherProps, React.HTMLProps<HTMLDivElement> {
  children?: React.ReactNode;
  isLeftDisabled: boolean;
  isLeftHidden?: boolean;
  isRightDisabled: boolean;
  isRightHidden?: boolean;
  onLeftClick: () => void;
  onRightClick: () => void;
}
export type PickersArrowSwitcherClassKey = 'root' | 'spacer' | 'hidden';

export const styles: MuiStyles<PickersArrowSwitcherClassKey> = (
  theme,
): StyleRules<PickersArrowSwitcherClassKey> => ({
  root: {
    display: 'flex',
  },
  spacer: {
    width: theme.spacing(3),
  },
  hidden: {
    visibility: 'hidden',
  },
});

const PickersArrowSwitcher = React.forwardRef(function PickersArrowSwitcher(
  props: ArrowSwitcherProps & WithStyles<typeof styles>,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    children,
    classes,
    className,
    components = {},
    componentsProps = {},
    isLeftDisabled,
    isLeftHidden,
    isRightDisabled,
    isRightHidden,
    leftArrowButtonText,
    onLeftClick,
    onRightClick,
    rightArrowButtonText,
    ...other
  } = props;
  const theme = useTheme();
  const isRtl = theme.direction === 'rtl';

  const LeftArrowButton = components.LeftArrowButton || IconButton;
  const leftArrowButtonProps = componentsProps.leftArrowButton || {};
  const LeftArrowIcon = components.LeftArrowIcon || ArrowLeftIcon;

  const RightArrowButton = components.RightArrowButton || IconButton;
  const rightArrowButtonProps = componentsProps.rightArrowButton || {};
  const RightArrowIcon = components.RightArrowIcon || ArrowRightIcon;

  return (
    <div className={clsx(classes.root, className)} ref={ref} {...other}>
      <LeftArrowButton
        size="small"
        aria-label={leftArrowButtonText}
        title={leftArrowButtonText}
        disabled={isLeftDisabled}
        edge="end"
        onClick={onLeftClick}
        {...leftArrowButtonProps}
        className={clsx(leftArrowButtonProps.className, {
          [classes.hidden]: isLeftHidden,
        })}
      >
        {isRtl ? <RightArrowIcon /> : <LeftArrowIcon />}
      </LeftArrowButton>
      {children ? (
        <Typography variant="subtitle1" component="span">
          {children}
        </Typography>
      ) : (
        <div className={classes.spacer} />
      )}
      <RightArrowButton
        size="small"
        aria-label={rightArrowButtonText}
        title={rightArrowButtonText}
        edge="start"
        disabled={isRightDisabled}
        onClick={onRightClick}
        {...rightArrowButtonProps}
        className={clsx(rightArrowButtonProps.className, {
          [classes.hidden]: isRightHidden,
        })}
      >
        {isRtl ? <LeftArrowIcon /> : <RightArrowIcon />}
      </RightArrowButton>
    </div>
  );
});

export default React.memo(
  withStyles(styles, { name: 'PrivatePickersArrowSwitcher' })(PickersArrowSwitcher),
);
