import * as React from 'react';
import clsx from 'clsx';
import { experimentalStyled, Theme } from '@material-ui/core/styles';
import {
  unstable_composeClasses as composeClasses,
  generateUtilityClass,
  generateUtilityClasses,
} from '@material-ui/unstyled';
import { SxProps } from '@material-ui/system';
import { ThemeContext } from '@material-ui/private-theming';
import { ClockView, CLOCK_WIDTH, CLOCK_HOUR_WIDTH } from './shared';

export type ClockPointerClassKey = keyof typeof clockPointerClasses;

type DivProps = JSX.IntrinsicElements['div'];
export interface ClockPointerProps extends DivProps {
  classes?: typeof clockPointerClasses;
  hasSelected: boolean;
  isInner: boolean;
  sx?: SxProps<Theme>;
  type: ClockView;
  value: number;
}

export function getClockPointerUtilityClass(slot: string) {
  return generateUtilityClass('MuiClockPointer', slot);
}

export const clockPointerClasses = generateUtilityClasses('MuiClockPointer', [
  'root',
  'thumb',
  'animateTransform',
  'noPoint',
]);

type StyleProps = ClockPointerProps & ClockPointer['state'];

const getUtilityClasses = (styleProps: StyleProps) => {
  const { hasSelected, toAnimateTransform, classes } = styleProps;

  const slots = {
    root: ['root', toAnimateTransform && 'animateTransform'],
    thumb: ['thumb', hasSelected && 'noPoint'],
  };

  return composeClasses(slots, getClockPointerUtilityClass, classes);
};

const ClockPointerRoot = experimentalStyled(
  'div',
  {},
  {
    name: 'MuiClockPointer',
    slot: 'Root',
    overridesResolver: (props, styles: Record<ClockPointerClassKey, object>) => {
      const { styleProps } = props;
      return {
        ...styles.root,
        ...(styleProps.toAnimateTransform && styles.animateTransform),
      };
    },
  },
)(({ theme, styleProps = {} }) => ({
  width: 2,
  backgroundColor: theme.palette.primary.main,
  position: 'absolute',
  left: 'calc(50% - 1px)',
  bottom: '50%',
  transformOrigin: 'center bottom 0px',
  ...(!!styleProps.toAnimateTransform && {
    transition: theme.transitions.create(['transform', 'height']),
  }),
}));

const ClockPointerThumb = experimentalStyled(
  'div',
  {},
  {
    name: 'MuiClockPointer',
    slot: 'Thumb',
    overridesResolver: (props, styles: Record<ClockPointerClassKey, object>) => {
      const { styleProps } = props;
      return {
        ...styles.thumb,
        ...(styleProps.hasSelected && styles.noPoint),
      };
    },
  },
)(({ theme, styleProps = {} }) => ({
  width: 4,
  height: 4,
  backgroundColor: theme.palette.primary.contrastText,
  borderRadius: '50%',
  position: 'absolute',
  top: -21,
  left: `calc(50% - ${CLOCK_HOUR_WIDTH / 2}px)`,
  border: `${(CLOCK_HOUR_WIDTH - 4) / 2}px solid ${theme.palette.primary.main}`,
  boxSizing: 'content-box',
  ...(!!styleProps.hasSelected && {
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
    const theme = this.context;
    const { className, hasSelected, isInner, type, value, ...other } = this.props;

    const styleProps = { ...this.props, ...this.state };
    const classes = getUtilityClasses(styleProps);

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
        className={clsx(classes.root, className)}
        styleProps={styleProps}
        theme={theme}
        {...other}
      >
        <ClockPointerThumb className={classes.thumb} styleProps={styleProps} theme={theme} />
      </ClockPointerRoot>
    );
  }
}

ClockPointer.contextType = ThemeContext;

export default ClockPointer;
