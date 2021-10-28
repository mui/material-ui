import * as React from 'react';
import Typography from '@mui/material/Typography';
import { useTheme, styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
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
    leftArrowButton?: Record<string, any>;
    rightArrowButton?: Record<string, any>;
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

interface ArrowSwitcherProps
  extends ExportedArrowSwitcherProps,
    Omit<React.HTMLProps<HTMLDivElement>, 'ref'> {
  children?: React.ReactNode;
  isLeftDisabled: boolean;
  isLeftHidden?: boolean;
  isRightDisabled: boolean;
  isRightHidden?: boolean;
  onLeftClick: () => void;
  onRightClick: () => void;
}

const PickersArrowSwitcherRoot = styled('div')<{
  ownerState: ArrowSwitcherProps;
}>({
  display: 'flex',
});

const PickersArrowSwitcherSpacer = styled('div', { skipSx: true })<{
  ownerState: ArrowSwitcherProps;
}>(({ theme }) => ({
  width: theme.spacing(3),
}));

const PickersArrowSwitcherButton = styled(IconButton, { skipSx: true })<{
  ownerState: ArrowSwitcherProps;
}>(({ ownerState }) => ({
  ...(ownerState.hidden && {
    visibility: 'hidden',
  }),
}));

const PickersArrowSwitcher = React.forwardRef(function PickersArrowSwitcher(
  props: Omit<ArrowSwitcherProps, 'as'>,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    children,
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

  const leftArrowButtonProps = componentsProps.leftArrowButton || {};
  const LeftArrowIcon = components.LeftArrowIcon || ArrowLeftIcon;

  const rightArrowButtonProps = componentsProps.rightArrowButton || {};
  const RightArrowIcon = components.RightArrowIcon || ArrowRightIcon;

  const ownerState = props;

  return (
    <PickersArrowSwitcherRoot ref={ref} className={className} ownerState={ownerState} {...other}>
      <PickersArrowSwitcherButton
        as={components.LeftArrowButton}
        size="small"
        aria-label={leftArrowButtonText}
        title={leftArrowButtonText}
        disabled={isLeftDisabled}
        edge="end"
        onClick={onLeftClick}
        {...leftArrowButtonProps}
        className={leftArrowButtonProps.className}
        ownerState={{ ...ownerState, ...leftArrowButtonProps, hidden: isLeftHidden }}
      >
        {isRtl ? <RightArrowIcon /> : <LeftArrowIcon />}
      </PickersArrowSwitcherButton>
      {children ? (
        <Typography variant="subtitle1" component="span">
          {children}
        </Typography>
      ) : (
        <PickersArrowSwitcherSpacer ownerState={ownerState} />
      )}
      <PickersArrowSwitcherButton
        as={components.RightArrowButton}
        size="small"
        aria-label={rightArrowButtonText}
        title={rightArrowButtonText}
        edge="start"
        disabled={isRightDisabled}
        onClick={onRightClick}
        {...rightArrowButtonProps}
        className={rightArrowButtonProps.className}
        ownerState={{ ...ownerState, ...rightArrowButtonProps, hidden: isRightHidden }}
      >
        {isRtl ? <LeftArrowIcon /> : <RightArrowIcon />}
      </PickersArrowSwitcherButton>
    </PickersArrowSwitcherRoot>
  );
});

export default PickersArrowSwitcher;
