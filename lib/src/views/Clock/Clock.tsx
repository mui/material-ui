import * as React from 'react';
import * as PropTypes from 'prop-types';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ClockPointer from './ClockPointer';
import { useUtils } from '../../_shared/hooks/useUtils';
import { VIEW_HEIGHT } from '../../constants/dimensions';
import { ClockViewType } from '../../constants/ClockType';
import { MaterialUiPickersDate } from '../../typings/date';
import { PickerOnChangeFn } from '../../_shared/hooks/useViews';
import { getHours, getMinutes } from '../../_helpers/time-utils';
import { useMeridiemMode } from '../../TimePicker/TimePickerToolbar';
import { useGlobalKeyDown, keycode } from '../../_shared/hooks/useKeyDown';
import { WrapperVariantContext } from '../../wrappers/WrapperVariantContext';

export interface ClockProps extends ReturnType<typeof useMeridiemMode> {
  date: MaterialUiPickersDate;
  type: ClockViewType;
  value: number;
  isTimeDisabled: (timeValue: number, type: ClockViewType) => boolean;
  children: React.ReactElement<any>[];
  onDateChange: PickerOnChangeFn;
  onChange: (value: number, isFinish?: boolean | symbol) => void;
  ampm?: boolean;
  minutesStep?: number;
  ampmInClock?: boolean;
  allowKeyboardControl?: boolean;
}

export const useStyles = makeStyles(
  theme => ({
    container: {
      display: 'flex',
      justifyContent: 'center',
      position: 'relative',
      minHeight: VIEW_HEIGHT,
      alignItems: 'center',
    },
    clock: {
      backgroundColor: 'rgba(0,0,0,.07)',
      borderRadius: '50%',
      height: 260,
      width: 260,
      position: 'relative',
      pointerEvents: 'none',
    },
    squareMask: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      pointerEvents: 'auto',
      outline: 'none',
      touchActions: 'none',
      userSelect: 'none',
      '&:active': {
        cursor: 'move',
      },
    },
    pin: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      backgroundColor: theme.palette.primary.main,
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
    amButton: {
      zIndex: 1,
      left: 8,
      position: 'absolute',
      bottom: 8,
    },
    pmButton: {
      zIndex: 1,
      position: 'absolute',
      bottom: 8,
      right: 8,
    },
    meridiemButtonSelected: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      '&:hover': {
        backgroundColor: theme.palette.primary.light,
      },
    },
  }),
  {
    name: 'MuiPickersClock',
  }
);

export const Clock: React.FC<ClockProps> = ({
  date,
  ampmInClock = false,
  value,
  children: numbersElementsArray,
  type,
  ampm,
  isTimeDisabled,
  minutesStep = 1,
  allowKeyboardControl,
  onChange,
  meridiemMode,
  handleMeridiemChange,
}) => {
  const utils = useUtils();
  const classes = useStyles();
  const wrapperVariant = React.useContext(WrapperVariantContext);
  const isMoving = React.useRef(false);

  const isSelectedTimeDisabled = isTimeDisabled(value, type);
  const isPointerInner = !ampm && type === 'hours' && (value < 1 || value > 12);

  const handleValueChange = (newValue: number, isFinish: boolean) => {
    if (isTimeDisabled(newValue, type)) {
      return;
    }

    onChange(newValue, isFinish);
  };

  const setTime = (e: any, isFinish = false) => {
    let { offsetX, offsetY } = e;

    if (typeof offsetX === 'undefined') {
      const rect = e.target.getBoundingClientRect();

      offsetX = e.changedTouches[0].clientX - rect.left;
      offsetY = e.changedTouches[0].clientY - rect.top;
    }

    const value =
      type === 'seconds' || type === 'minutes'
        ? getMinutes(offsetX, offsetY, minutesStep)
        : getHours(offsetX, offsetY, Boolean(ampm));

    handleValueChange(value, isFinish);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    isMoving.current = true;
    setTime(e);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isMoving.current) {
      setTime(e, true);
      isMoving.current = false;
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // MouseEvent.which is deprecated, but MouseEvent.buttons is not supported in Safari
    const isButtonPressed =
      typeof e.buttons === 'undefined' ? e.nativeEvent.which === 1 : e.buttons === 1;

    if (isButtonPressed) {
      setTime(e.nativeEvent, false);
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (isMoving.current) {
      isMoving.current = false;
    }

    setTime(e.nativeEvent, true);
  };

  const hasSelected = React.useMemo(() => {
    if (type === 'hours') {
      return true;
    }

    return value % 5 === 0;
  }, [type, value]);

  const keyboardControlStep = type === 'minutes' ? minutesStep : 1;
  useGlobalKeyDown(
    Boolean(allowKeyboardControl ?? wrapperVariant !== 'static') && !isMoving.current,
    {
      [keycode.Home]: () => handleValueChange(0, false), // annulate both hours and minutes
      [keycode.End]: () => handleValueChange(type === 'minutes' ? 59 : 23, false),
      [keycode.ArrowUp]: () => handleValueChange(value + keyboardControlStep, false),
      [keycode.ArrowDown]: () => handleValueChange(value - keyboardControlStep, false),
    }
  );

  return (
    <div className={classes.container}>
      <div className={classes.clock}>
        <div
          role="menu"
          tabIndex={-1}
          className={classes.squareMask}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        />

        {!isSelectedTimeDisabled && (
          <>
            <div className={classes.pin} />

            <ClockPointer
              type={type}
              value={value}
              isInner={isPointerInner}
              hasSelected={hasSelected}
              aria-live="polite"
              aria-label={`Selected time ${utils.format(date, 'fullTime')}`}
            />
          </>
        )}

        {numbersElementsArray}
      </div>

      {ampm && (wrapperVariant === 'desktop' || ampmInClock) && (
        <>
          <IconButton
            data-mui-test="in-clock-am-btn"
            onClick={() => handleMeridiemChange('am')}
            className={clsx(classes.amButton, {
              [classes.meridiemButtonSelected]: meridiemMode === 'am',
            })}
          >
            <Typography variant="caption">AM</Typography>
          </IconButton>
          <IconButton
            data-mui-test="in-clock-pm-btn"
            onClick={() => handleMeridiemChange('pm')}
            className={clsx(classes.pmButton, {
              [classes.meridiemButtonSelected]: meridiemMode === 'pm',
            })}
          >
            <Typography variant="caption">PM</Typography>
          </IconButton>
        </>
      )}
    </div>
  );
};

Clock.defaultProps = {
  ampm: PropTypes.bool,
  minutesStep: PropTypes.number,
} as any;

Clock.displayName = 'Clock';

export default Clock;
