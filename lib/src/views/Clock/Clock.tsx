import * as React from 'react';
import * as PropTypes from 'prop-types';
import clsx from 'clsx';
import ClockPointer from './ClockPointer';
import { VIEW_HEIGHT } from '../../constants/dimensions';
import { ClockViewType } from '../../constants/ClockType';
import { MaterialUiPickersDate } from '../../typings/date';
import { getHours, getMinutes } from '../../_helpers/time-utils';
import { useMeridiemMode } from '../../TimePicker/TimePickerToolbar';
import { IconButton, Typography, makeStyles } from '@material-ui/core';
import { WrapperVariantContext } from '../../wrappers/WrapperVariantContext';

export interface ClockProps {
  date: MaterialUiPickersDate;
  type: ClockViewType;
  value: number;
  children: React.ReactElement<any>[];
  onDateChange: (date: MaterialUiPickersDate, isFinish?: boolean) => void;
  onChange: (value: number, isFinish?: boolean) => void;
  ampm?: boolean;
  minutesStep?: number;
  ampmInClock?: boolean;
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
      zIndex: 1,
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
  onDateChange,
  ampmInClock = false,
  value,
  children: numbersElementsArray,
  type,
  ampm,
  minutesStep,
  onChange,
}) => {
  const classes = useStyles();
  const wrapperVariant = React.useContext(WrapperVariantContext);
  const isMoving = React.useRef(false);
  const { meridiemMode, handleMeridiemChange } = useMeridiemMode(date, ampm, onDateChange);

  const isPointerInner = !ampm && type === 'hours' && (value < 1 || value > 12);

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

    onChange(value, isFinish);
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

        <div className={classes.pin} />

        <ClockPointer
          type={type}
          value={value}
          isInner={isPointerInner}
          hasSelected={hasSelected}
        />

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

// @ts-ignore
Clock.defaultProps = {
  ampm: PropTypes.bool,
  minutesStep: PropTypes.number,
};

Clock.displayName = 'Clock';

export default Clock;
