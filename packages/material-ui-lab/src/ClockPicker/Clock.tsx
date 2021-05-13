import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import ClockPointer from './ClockPointer';
import { useUtils, MuiPickersAdapter } from '../internal/pickers/hooks/useUtils';
import { useGlobalKeyDown, keycode } from '../internal/pickers/hooks/useKeyDown';
import {
  WrapperVariantContext,
  IsStaticVariantContext,
} from '../internal/pickers/wrappers/WrapperVariantContext';
import { PickerSelectionState } from '../internal/pickers/hooks/usePickerState';
import { useMeridiemMode } from '../internal/pickers/hooks/date-helpers-hooks';
import { ClockView, getHours, getMinutes } from './shared';

export interface ClockProps<TDate> extends ReturnType<typeof useMeridiemMode> {
  allowKeyboardControl?: boolean;
  ampm: boolean;
  ampmInClock: boolean;
  children: readonly React.ReactNode[];
  date: TDate | null;
  getClockLabelText: (view: ClockView, time: TDate, adapter: MuiPickersAdapter<TDate>) => string;
  isTimeDisabled: (timeValue: number, type: ClockView) => boolean;
  minutesStep?: number;
  onChange: (value: number, isFinish?: PickerSelectionState) => void;
  type: ClockView;
  value: number;
}

const ClockRoot = styled(
  'div',
  {},
  { skipSx: true },
)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: theme.spacing(2),
}));

const ClockClock = styled(
  'div',
  {},
  { skipSx: true },
)({
  backgroundColor: 'rgba(0,0,0,.07)',
  borderRadius: '50%',
  height: 220,
  width: 220,
  flexShrink: 0,
  position: 'relative',
  pointerEvents: 'none',
});

const ClockSquareMask = styled(
  'div',
  {},
  { skipSx: true },
)({
  width: '100%',
  height: '100%',
  position: 'absolute',
  pointerEvents: 'auto',
  outline: 0,
  // Disable scroll capabilities.
  touchAction: 'none',
  userSelect: 'none',
  '@media (pointer: fine)': {
    cursor: 'pointer',
    borderRadius: '50%',
  },
  '&:active': {
    cursor: 'move',
  },
});

const ClockPin = styled(
  'div',
  {},
  { skipSx: true },
)(({ theme }) => ({
  width: 6,
  height: 6,
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
}));

const ClockAmButton = styled(
  IconButton,
  {},
  { skipSx: true },
)(({ theme, styleProps = {} }) => ({
  zIndex: 1,
  position: 'absolute',
  bottom: 8,
  left: 8,
  ...(styleProps.meridiemMode === 'am' && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
  }),
}));

const ClockPmButton = styled(
  IconButton,
  {},
  { skipSx: true },
)(({ theme, styleProps = {} }) => ({
  zIndex: 1,
  position: 'absolute',
  bottom: 8,
  right: 8,
  ...(styleProps.meridiemMode === 'pm' && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
  }),
}));

/**
 * @ignore - internal component.
 */
function Clock<TDate>(props: ClockProps<TDate>) {
  const {
    allowKeyboardControl,
    ampm,
    ampmInClock,
    children: numbersElementsArray,
    date,
    getClockLabelText,
    handleMeridiemChange,
    isTimeDisabled,
    meridiemMode,
    minutesStep = 1,
    onChange,
    type,
    value,
  } = props;

  // TODO: convert to simple assignment after the type error in defaultPropsHandler.js:60:6 is fixed
  const styleProps = { ...props };

  const utils = useUtils<TDate>();
  const isStatic = React.useContext(IsStaticVariantContext);
  const wrapperVariant = React.useContext(WrapperVariantContext);
  const isMoving = React.useRef(false);

  const isSelectedTimeDisabled = isTimeDisabled(value, type);
  const isPointerInner = !ampm && type === 'hours' && (value < 1 || value > 12);

  const handleValueChange = (newValue: number, isFinish: PickerSelectionState) => {
    if (isTimeDisabled(newValue, type)) {
      return;
    }

    onChange(newValue, isFinish);
  };

  const setTime = (event: any, isFinish: PickerSelectionState) => {
    let { offsetX, offsetY } = event;

    if (typeof offsetX === 'undefined') {
      const rect = event.target.getBoundingClientRect();

      offsetX = event.changedTouches[0].clientX - rect.left;
      offsetY = event.changedTouches[0].clientY - rect.top;
    }

    const newSelectedValue =
      type === 'seconds' || type === 'minutes'
        ? getMinutes(offsetX, offsetY, minutesStep)
        : getHours(offsetX, offsetY, Boolean(ampm));

    handleValueChange(newSelectedValue, isFinish);
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    isMoving.current = true;
    setTime(event, 'shallow');
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (isMoving.current) {
      setTime(event, 'finish');
      isMoving.current = false;
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    // MouseEvent.which is deprecated, but MouseEvent.buttons is not supported in Safari
    const isButtonPressed =
      // tslint:disable-next-line deprecation
      typeof event.buttons === 'undefined' ? event.nativeEvent.which === 1 : event.buttons === 1;

    if (isButtonPressed) {
      setTime(event.nativeEvent, 'shallow');
    }
  };

  const handleMouseUp = (event: React.MouseEvent) => {
    if (isMoving.current) {
      isMoving.current = false;
    }

    setTime(event.nativeEvent, 'finish');
  };

  const hasSelected = React.useMemo(() => {
    if (type === 'hours') {
      return true;
    }

    return value % 5 === 0;
  }, [type, value]);

  const keyboardControlStep = type === 'minutes' ? minutesStep : 1;
  useGlobalKeyDown(Boolean(allowKeyboardControl ?? !isStatic) && !isMoving.current, {
    [keycode.Home]: () => handleValueChange(0, 'partial'), // annulate both hours and minutes
    [keycode.End]: () => handleValueChange(type === 'minutes' ? 59 : 23, 'partial'),
    [keycode.ArrowUp]: () => handleValueChange(value + keyboardControlStep, 'partial'),
    [keycode.ArrowDown]: () => handleValueChange(value - keyboardControlStep, 'partial'),
  });

  return (
    <ClockRoot>
      <ClockClock>
        <ClockSquareMask
          role="menu"
          data-mui-test="clock"
          tabIndex={0}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        />
        {!isSelectedTimeDisabled && (
          <React.Fragment>
            <ClockPin />
            {date && (
              <ClockPointer
                type={type}
                value={value}
                isInner={isPointerInner}
                hasSelected={hasSelected}
                aria-live="polite"
                aria-label={getClockLabelText(type, date, utils)}
              />
            )}
          </React.Fragment>
        )}
        {numbersElementsArray}
      </ClockClock>
      {ampm && (wrapperVariant === 'desktop' || ampmInClock) && (
        <React.Fragment>
          <ClockAmButton
            data-mui-test="in-clock-am-btn"
            onClick={() => handleMeridiemChange('am')}
            disabled={meridiemMode === null}
            styleProps={styleProps}
          >
            <Typography variant="caption">AM</Typography>
          </ClockAmButton>
          <ClockPmButton
            disabled={meridiemMode === null}
            data-mui-test="in-clock-pm-btn"
            onClick={() => handleMeridiemChange('pm')}
            styleProps={styleProps}
          >
            <Typography variant="caption">PM</Typography>
          </ClockPmButton>
        </React.Fragment>
      )}
    </ClockRoot>
  );
}

export default Clock;
