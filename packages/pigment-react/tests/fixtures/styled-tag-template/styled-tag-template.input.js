import { styled } from '@pigment-css/react';
import { touchRippleClasses } from '@mui/material/ButtonBase';

const DURATION = 550;

export const TouchRippleRipple = styled('span')`
  opacity: 0;
  position: absolute;

  &.${touchRippleClasses.rippleVisible} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${enterKeyframe};
    animation-duration: ${DURATION}ms;
    animation-timing-function: ${({ theme }) => theme.transitions.easing.easeInOut};
  }

  &.${touchRippleClasses.ripplePulsate} {
    animation-duration: ${({ theme }) => theme.transitions.duration.shorter}ms;
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

  & .${touchRippleClasses.childPulsate} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${pulsateKeyframe};
    animation-duration: 2500ms;
    animation-timing-function: ${({ theme }) => theme.transitions.easing.easeInOut};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`;
