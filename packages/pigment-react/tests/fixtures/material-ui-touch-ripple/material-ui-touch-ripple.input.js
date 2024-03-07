import { styled, keyframes } from '@pigment-css/react';
import { touchRippleClasses } from '@mui/material/ButtonBase';

let _ = (t) => t,
  _t,
  _t2,
  _t3,
  _t4;

const DURATION = 550;
const OPACITY = 0.1;
const enterKeyframe = keyframes(
  _t ||
    (_t = _`
  0% {
    transform: scale(0);
    opacity: ${0};
  }

  100% {
    transform: scale(1);
    opacity: ${0};
  }
`),
  OPACITY,
  ({ theme }) => theme.opacity.translucent,
);
const exitKeyframe = keyframes(
  _t2 ||
    (_t2 = _`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`),
);
const pulsateKeyframe = keyframes(
  _t3 ||
    (_t3 = _`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`),
);

export const TouchRippleRipple = styled('span', {
  name: 'MuiTouchRipple',
  slot: 'Ripple',
})(
  _t4 ||
    (_t4 = _`
  opacity: 0;
  position: absolute;

  &.${0} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  &.${0} {
    animation-duration: ${0}ms;
  }

  & .${0} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${0} {
    opacity: 0;
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  & .${0} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${0};
    animation-duration: 2500ms;
    animation-timing-function: ${0};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`),
  touchRippleClasses.rippleVisible,
  enterKeyframe,
  DURATION,
  ({ theme }) => theme.transitions.easing.easeInOut,
  touchRippleClasses.ripplePulsate,
  ({ theme }) => theme.transitions.duration.shorter,
  touchRippleClasses.child,
  touchRippleClasses.childLeaving,
  exitKeyframe,
  DURATION,
  ({ theme }) => theme.transitions.easing.easeInOut,
  touchRippleClasses.childPulsate,
  pulsateKeyframe,
  ({ theme }) => theme.transitions.easing.easeInOut,
);
