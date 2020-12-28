import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { createStyles, WithStyles, Theme, withStyles } from '@material-ui/core/styles';
import ClockPointer from './ClockPointer';
import { useUtils, MuiPickersAdapter } from '../internal/pickers/hooks/useUtils';
import { VIEW_HEIGHT } from '../internal/pickers/constants/dimensions';
import { ClockViewType } from '../internal/pickers/constants/ClockType';
import { getHours, getMinutes } from '../internal/pickers/time-utils';
import { useGlobalKeyDown, keycode } from '../internal/pickers/hooks/useKeyDown';
import {
  WrapperVariantContext,
  IsStaticVariantContext,
} from '../internal/pickers/wrappers/WrapperVariantContext';
import { PickerSelectionState } from '../internal/pickers/hooks/usePickerState';
import { useMeridiemMode } from '../internal/pickers/hooks/date-helpers-hooks';

export interface ClockProps<TDate> extends ReturnType<typeof useMeridiemMode> {
  date: TDate | null;
  type: ClockViewType;
  value: number;
  isTimeDisabled: (timeValue: number, type: ClockViewType) => boolean;
  children: React.ReactNode[];
  onChange: (value: number, isFinish?: PickerSelectionState) => void;
  ampm?: boolean;
  minutesStep?: number;
  ampmInClock?: boolean;
  allowKeyboardControl?: boolean;
  getClockLabelText: <TDate>(
    view: 'hours' | 'minutes' | 'seconds',
    time: TDate,
    adapter: MuiPickersAdapter<TDate>,
  ) => string;
}

export const styles = (theme: Theme) =>
  createStyles({
    root: {
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
      outline: 0,
      // Disable scroll capabilities.
      touchAction: 'none',
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
  });

export type ClockClassKey = keyof WithStyles<typeof styles>['classes'];

/**
 * @ignore - internal component.
 */
function Clock<TDate>(props: ClockProps<TDate> & WithStyles<typeof styles>) {
  const {
    allowKeyboardControl,
    ampm,
    ampmInClock = false,
    children: numbersElementsArray,
    classes,
    date,
    handleMeridiemChange,
    isTimeDisabled,
    meridiemMode,
    minutesStep = 1,
    onChange,
    type,
    value,
    getClockLabelText,
  } = props;

  const utils = useUtils();
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

  const setTime = (e: any, isFinish: PickerSelectionState) => {
    let { offsetX, offsetY } = e;

    if (typeof offsetX === 'undefined') {
      const rect = e.target.getBoundingClientRect();

      offsetX = e.changedTouches[0].clientX - rect.left;
      offsetY = e.changedTouches[0].clientY - rect.top;
    }

    const newSelectedValue =
      type === 'seconds' || type === 'minutes'
        ? getMinutes(offsetX, offsetY, minutesStep)
        : getHours(offsetX, offsetY, Boolean(ampm));

    handleValueChange(newSelectedValue, isFinish);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    isMoving.current = true;
    setTime(e, 'shallow');
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isMoving.current) {
      setTime(e, 'finish');
      isMoving.current = false;
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // MouseEvent.which is deprecated, but MouseEvent.buttons is not supported in Safari
    const isButtonPressed =
      // tslint:disable-next-line deprecation
      typeof e.buttons === 'undefined' ? e.nativeEvent.which === 1 : e.buttons === 1;

    if (isButtonPressed) {
      setTime(e.nativeEvent, 'shallow');
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (isMoving.current) {
      isMoving.current = false;
    }

    setTime(e.nativeEvent, 'finish');
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
    <div className={classes.root}>
      <div className={classes.clock}>
        <div
          role="menu"
          data-mui-test="clock"
          tabIndex={-1}
          className={classes.squareMask}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        />
        {!isSelectedTimeDisabled && (
          <React.Fragment>
            <div className={classes.pin} />
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
      </div>
      {ampm && (wrapperVariant === 'desktop' || ampmInClock) && (
        <React.Fragment>
          <IconButton
            data-mui-test="in-clock-am-btn"
            onClick={() => handleMeridiemChange('am')}
            disabled={meridiemMode === null}
            className={clsx(classes.amButton, {
              [classes.meridiemButtonSelected]: meridiemMode === 'am',
            })}
          >
            <Typography variant="caption">AM</Typography>
          </IconButton>
          <IconButton
            disabled={meridiemMode === null}
            data-mui-test="in-clock-pm-btn"
            onClick={() => handleMeridiemChange('pm')}
            className={clsx(classes.pmButton, {
              [classes.meridiemButtonSelected]: meridiemMode === 'pm',
            })}
          >
            <Typography variant="caption">PM</Typography>
          </IconButton>
        </React.Fragment>
      )}
    </div>
  );
}

Clock.propTypes = {
  ampm: PropTypes.bool,
  minutesStep: PropTypes.number,
} as any;

export default withStyles(styles, {
  name: 'MuiClock',
})(Clock) as <TDate>(props: ClockProps<TDate>) => JSX.Element;
