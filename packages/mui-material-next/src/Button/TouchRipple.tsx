/* eslint-disable material-ui/mui-name-matches-component-name */
import * as React from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup } from 'react-transition-group';
import clsx from 'clsx';
import { keyframes, useThemeProps } from '@mui/system';
import styled from '@mui/material/styles/styled';
import { TouchRippleActions, TouchRippleProps } from './TouchRipple.types';
import Ripple from './Ripple';
import touchRippleClasses from './touchRippleClasses';

const DURATION = 550;
export const DELAY_RIPPLE = 80;

const enterKeyframe = keyframes`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }
  100% {
    transform: scale(1);
    opacity: 0.12;
  }
`;

const exitKeyframe = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export const TouchRippleRoot = styled('span', {
  name: 'PrivateTouchRipple',
  slot: 'Root',
})({
  overflow: 'hidden',
  pointerEvents: 'none',
  position: 'absolute',
  zIndex: 0,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  borderRadius: 'inherit',
});

// This `styled()` function invokes keyframes. `styled-components` only supports keyframes
// in string templates. Do not convert these styles in JS object as it will break.
export const TouchRippleRipple = styled(Ripple, {
  name: 'PrivateTouchRipple',
  slot: 'Ripple',
})`
  opacity: 0;
  position: absolute;
  &.${touchRippleClasses.rippleVisible} {
    opacity: 0.12;
    transform: scale(1);
    animation-name: ${enterKeyframe};
    animation-duration: ${DURATION}ms;
    animation-timing-function: ${({ theme }) => theme.transitions.easing.easeInOut};
  }
  & .${touchRippleClasses.child} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }
  & .${touchRippleClasses.childLeaving} {
    opacity: 0;
    animation-name: ${exitKeyframe};
    animation-duration: ${DURATION}ms;
    animation-timing-function: ${({ theme }) => theme.transitions.easing.easeInOut};
  }
`;

/**
 * @ignore - internal component.
 */
const TouchRipple = React.forwardRef<TouchRippleActions, TouchRippleProps>(function TouchRipple(
  inProps,
  ref,
) {
  const props = useThemeProps({ props: inProps, name: 'PrivateTouchRipple' });

  const { center: centerProp = false, classes = {}, className, ...other } = props;
  const [ripples, setRipples] = React.useState<React.ReactNode[]>([]);
  const nextKey = React.useRef(0);
  const rippleCallback = React.useRef<(() => void) | null>();

  React.useEffect(() => {
    if (rippleCallback.current) {
      rippleCallback.current();
      rippleCallback.current = null;
    }
  }, [ripples]);

  // Used to filter out mouse emulated events on mobile.
  const ignoringMouseDown = React.useRef(false);
  // We use a timer in order to only show the ripples for touch "click" like events.
  // We don't want to display the ripple for touch scroll events.
  const startTimer = React.useRef<ReturnType<typeof setTimeout>>();

  // This is the hook called once the previous timeout is ready.
  const startTimerCommit = React.useRef<(() => void) | null>(null);
  const container = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    return () => {
      clearTimeout(startTimer.current);
    };
  }, []);

  const startCommit = React.useCallback(
    (params: { rippleX: number; rippleY: number; rippleSize: number; cb: () => void }) => {
      const { rippleX, rippleY, rippleSize, cb } = params;

      setRipples((oldRipples) => [
        ...oldRipples,
        <TouchRippleRipple
          key={nextKey.current}
          classes={{
            ripple: clsx(classes.ripple, touchRippleClasses.ripple),
            rippleVisible: clsx(classes.rippleVisible, touchRippleClasses.rippleVisible),
            child: clsx(classes.child, touchRippleClasses.child),
            childLeaving: clsx(classes.childLeaving, touchRippleClasses.childLeaving),
          }}
          timeout={DURATION}
          rippleX={rippleX}
          rippleY={rippleY}
          rippleSize={rippleSize}
        />,
      ]);
      nextKey.current += 1;
      rippleCallback.current = cb;
    },
    [classes],
  );

  const start = React.useCallback<TouchRippleActions['start']>(
    (event, options = {}, cb = () => {}) => {
      const {
        center = centerProp,
        // @ts-ignore For test purposes
        fakeElement = false,
      } = options;

      if (event?.type === 'mousedown' && ignoringMouseDown.current) {
        ignoringMouseDown.current = false;
        return;
      }

      if (event?.type === 'touchstart') {
        ignoringMouseDown.current = true;
      }

      const element = fakeElement ? null : container.current;
      const rect = element
        ? element.getBoundingClientRect()
        : {
            width: 0,
            height: 0,
            left: 0,
            top: 0,
          };

      // Get the size of the ripple
      let rippleX: number;
      let rippleY: number;
      let rippleSize: number;

      if (
        center ||
        ((event as React.MouseEvent)?.clientX === 0 &&
          (event as React.MouseEvent)?.clientY === 0) ||
        (!(event as React.MouseEvent)?.clientX && !(event as React.TouchEvent)?.touches)
      ) {
        rippleX = Math.round(rect.width / 2);
        rippleY = Math.round(rect.height / 2);
      } else {
        const { clientX, clientY } =
          event && (event as React.TouchEvent).touches
            ? (event as React.TouchEvent).touches[0]
            : (event as React.MouseEvent);
        rippleX = Math.round(clientX - rect.left);
        rippleY = Math.round(clientY - rect.top);
      }

      if (center) {
        rippleSize = Math.max(rect.width, rect.height);

        // For some reason the animation is broken on Mobile Chrome if the size is even.
        if (rippleSize % 2 === 0) {
          rippleSize += 1;
        }
      } else {
        const sizeX =
          Math.max(Math.abs((element ? element.clientWidth : 0) - rippleX), rippleX) * 2 + 2;
        const sizeY =
          Math.max(Math.abs((element ? element.clientHeight : 0) - rippleY), rippleY) * 2 + 2;
        rippleSize = Math.sqrt(sizeX ** 2 + sizeY ** 2);
      }

      // Touche devices
      if ((event as React.TouchEvent)?.touches) {
        // check that this isn't another touchstart due to multitouch
        // otherwise we will only clear a single timer when unmounting while two
        // are running
        if (startTimerCommit.current === null) {
          // Prepare the ripple effect.
          startTimerCommit.current = () => {
            startCommit({ rippleX, rippleY, rippleSize, cb });
          };
          // Delay the execution of the ripple effect.
          startTimer.current = setTimeout(() => {
            if (startTimerCommit.current) {
              startTimerCommit.current();
              startTimerCommit.current = null;
            }
          }, DELAY_RIPPLE); // We have to make a tradeoff with this value.
        }
      } else {
        startCommit({ rippleX, rippleY, rippleSize, cb });
      }
    },
    [centerProp, startCommit],
  );

  const stop = React.useCallback<TouchRippleActions['stop']>((event, cb) => {
    clearTimeout(startTimer.current);

    // The touch interaction occurs too quickly.
    // We still want to show ripple effect.
    if (event?.type === 'touchend' && startTimerCommit.current) {
      startTimerCommit.current();
      startTimerCommit.current = null;
      startTimer.current = setTimeout(() => {
        stop(event, cb);
      });
      return;
    }

    startTimerCommit.current = null;

    setRipples((oldRipples) => {
      if (oldRipples.length > 0) {
        return oldRipples.slice(1);
      }
      return oldRipples;
    });
    rippleCallback.current = cb;
  }, []);

  React.useImperativeHandle(
    ref,
    () => ({
      start,
      stop,
    }),
    [start, stop],
  );

  return (
    <TouchRippleRoot
      className={clsx(classes.root, touchRippleClasses.root, className)}
      {...other}
      ref={container}
    >
      <TransitionGroup component={null} exit>
        {ripples}
      </TransitionGroup>
    </TouchRippleRoot>
  );
}) as React.ForwardRefExoticComponent<TouchRippleProps & React.RefAttributes<TouchRippleActions>>;

TouchRipple.propTypes = {
  /**
   * If `true`, the ripple starts at the center of the component
   * rather than at the point of interaction.
   */
  center: PropTypes.bool,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
};

export default TouchRipple;
