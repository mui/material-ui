import * as React from 'react';
import clsx from 'clsx';
import { experimentalStyled } from '@material-ui/core/styles';
import {
  unstable_composeClasses as composeClasses,
  generateUtilityClass,
  generateUtilityClasses,
} from '@material-ui/unstyled';
import { CLOCK_WIDTH, CLOCK_HOUR_WIDTH } from './shared';

export interface ClockNumberProps extends React.HTMLAttributes<HTMLSpanElement> {
  // TODO: spread to a `span`. What are the implications (generic role etc.)
  'aria-label': string;
  classes?: Partial<typeof clockNumberClasses>;
  disabled: boolean;
  index: number;
  inner: boolean;
  label: string;
  selected: boolean;
}

export type ClockNumberClassKey = keyof typeof clockNumberClasses;

export function getClockNumberUtilityClass(slot: string) {
  return generateUtilityClass('MuiInternalClockNumber', slot);
}

export const clockNumberClasses = generateUtilityClasses('MuiInternalClockNumber', [
  'root',
  'selected',
  'disabled',
  'inner',
]);

const useUtilityClasses = (styleProps: ClockNumberProps) => {
  const { inner, selected, disabled, classes } = styleProps;

  const slots = {
    root: ['root', inner && 'inner', selected && 'selected', disabled && 'disabled'],
  };

  return composeClasses(slots, getClockNumberUtilityClass, classes);
};

const ClockNumberRoot = experimentalStyled(
  'span',
  {},
  {
    name: 'MuiInternalClockNumber',
    slot: 'Root',
    overridesResolver: (props, styles: Record<ClockNumberClassKey, object>) => {
      const { styleProps } = props;
      return {
        ...styles.root,
        ...(styleProps.inner && styles.inner),
      };
    },
  },
)(({ theme, styleProps = {} }) => ({
  width: CLOCK_HOUR_WIDTH,
  height: CLOCK_HOUR_WIDTH,
  position: 'absolute',
  left: `calc((100% - ${CLOCK_HOUR_WIDTH}px) / 2)`,
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  color: theme.palette.text.primary,
  '&:focused': {
    backgroundColor: theme.palette.background.paper,
  },
  [`&.${clockNumberClasses.selected}`]: {
    color: theme.palette.primary.contrastText,
  },
  [`&.${clockNumberClasses.disabled}`]: {
    pointerEvents: 'none',
    color: theme.palette.text.disabled,
  },
  ...(!!styleProps.inner && {
    ...(theme.typography.body2 as React.CSSProperties),
    color: theme.palette.text.secondary,
  }),
}));

/**
 * @ignore - internal component.
 */
function ClockNumber(props: ClockNumberProps) {
  const { className, disabled, index, inner, label, selected, ...other } = props;
  // TODO: convert to simple assignment after the type error in defaultPropsHandler.js:60:6 is fixed
  const styleProps = { ...props };

  const classes = useUtilityClasses(styleProps);

  const angle = ((index % 12) / 12) * Math.PI * 2 - Math.PI / 2;
  const length = ((CLOCK_WIDTH - CLOCK_HOUR_WIDTH - 2) / 2) * (inner ? 0.65 : 1);
  const x = Math.round(Math.cos(angle) * length);
  const y = Math.round(Math.sin(angle) * length);

  return (
    <ClockNumberRoot
      className={clsx(classes.root, className)}
      style={{
        transform: `translate(${x}px, ${y + (CLOCK_WIDTH - CLOCK_HOUR_WIDTH) / 2}px`,
      }}
      styleProps={styleProps}
      {...other}
    >
      {label}
    </ClockNumberRoot>
  );
}

export default ClockNumber;
