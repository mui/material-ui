import * as React from 'react';
import clsx from 'clsx';
import { MuiStyles, StyleRules, WithStyles, withStyles } from '@material-ui/core/styles';
import { CLOCK_WIDTH, CLOCK_HOUR_WIDTH } from './shared';

export interface ClockNumberProps {
  disabled: boolean;
  index: number;
  inner: boolean;
  label: string;
  selected: boolean;
  // TODO: spread to a `span`. What are the implications (generic role etc.)
  'aria-label': string;
}

export type ClockNumberClassKey = 'root' | 'selected' | 'disabled' | 'inner';

export const styles: MuiStyles<ClockNumberClassKey> = (theme): StyleRules<ClockNumberClassKey> => ({
  root: {
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
    '&$selected': {
      color: theme.palette.primary.contrastText,
    },
    '&$disabled': {
      pointerEvents: 'none',
      color: theme.palette.text.disabled,
    },
  },
  selected: {},
  disabled: {},
  inner: {
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
  },
});

/**
 * @ignore - internal component.
 */
const ClockNumber: React.FC<ClockNumberProps & WithStyles<typeof styles>> = (props) => {
  const { classes, disabled, index, inner, label, selected, ...other } = props;

  const angle = ((index % 12) / 12) * Math.PI * 2 - Math.PI / 2;
  const length = ((CLOCK_WIDTH - CLOCK_HOUR_WIDTH - 2) / 2) * (inner ? 0.65 : 1);
  const x = Math.round(Math.cos(angle) * length);
  const y = Math.round(Math.sin(angle) * length);

  const transformStyle = {
    transform: `translate(${x}px, ${y + (CLOCK_WIDTH - CLOCK_HOUR_WIDTH) / 2}px`,
  };

  return (
    <span
      className={clsx(classes.root, {
        [classes.selected]: selected,
        [classes.disabled]: disabled,
        [classes.inner]: inner,
      })}
      style={transformStyle}
      {...other}
    >
      {label}
    </span>
  );
};

export default withStyles(styles, { name: 'MuiInternalClockNumber' })(ClockNumber) as (
  props: ClockNumberProps,
) => JSX.Element;
