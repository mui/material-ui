import * as React from 'react';
import { styled } from '@material-ui/core/styles';
import { ClockView, CLOCK_WIDTH, CLOCK_HOUR_WIDTH } from './shared';

export interface ClockPointerProps extends React.HTMLAttributes<HTMLDivElement> {
  hasSelected: boolean;
  isInner: boolean;
  type: ClockView;
  value: number;
}

const ClockPointerRoot = styled('div', { skipSx: true })<{
  styleProps: ClockPointerProps & ClockPointer['state'];
}>(({ theme, styleProps }) => ({
  width: 2,
  backgroundColor: theme.palette.primary.main,
  position: 'absolute',
  left: 'calc(50% - 1px)',
  bottom: '50%',
  transformOrigin: 'center bottom 0px',
  ...(styleProps.toAnimateTransform && {
    transition: theme.transitions.create(['transform', 'height']),
  }),
}));

const ClockPointerThumb = styled('div', { skipSx: true })<{
  styleProps: ClockPointerProps & ClockPointer['state'];
}>(({ theme, styleProps }) => ({
  width: 4,
  height: 4,
  backgroundColor: theme.palette.primary.contrastText,
  borderRadius: '50%',
  position: 'absolute',
  top: -21,
  left: `calc(50% - ${CLOCK_HOUR_WIDTH / 2}px)`,
  border: `${(CLOCK_HOUR_WIDTH - 4) / 2}px solid ${theme.palette.primary.main}`,
  boxSizing: 'content-box',
  ...(styleProps.hasSelected && {
    backgroundColor: theme.palette.primary.main,
  }),
}));

/**
 * @ignore - internal component.
 */
class ClockPointer extends React.Component<ClockPointerProps> {
  static getDerivedStateFromProps = (
    nextProps: ClockPointerProps,
    state: ClockPointer['state'],
  ) => {
    if (nextProps.type !== state.previousType) {
      return {
        toAnimateTransform: true,
        previousType: nextProps.type,
      };
    }

    return {
      toAnimateTransform: false,
      previousType: nextProps.type,
    };
  };

  state = {
    toAnimateTransform: false,
    previousType: undefined,
  };

  render() {
    const { className, hasSelected, isInner, type, value, ...other } = this.props;

    const styleProps = { ...this.props, ...this.state };

    const getAngleStyle = () => {
      const max = type === 'hours' ? 12 : 60;
      let angle = (360 / max) * value;

      if (type === 'hours' && value > 12) {
        angle -= 360; // round up angle to max 360 degrees
      }

      return {
        height: Math.round((isInner ? 0.26 : 0.4) * CLOCK_WIDTH),
        transform: `rotateZ(${angle}deg)`,
      };
    };

    return (
      <ClockPointerRoot
        style={getAngleStyle()}
        className={className}
        styleProps={styleProps}
        {...other}
      >
        <ClockPointerThumb styleProps={styleProps} />
      </ClockPointerRoot>
    );
  }
}

export default ClockPointer;
