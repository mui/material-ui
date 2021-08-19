import * as React from 'react';
import clsx from 'clsx';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import { styled } from '@material-ui/core/styles';
import { generateUtilityClasses } from '@material-ui/unstyled';

export interface PickersToolbarTextProps extends Omit<TypographyProps, 'classes'> {
  selected?: boolean;
  value: React.ReactNode;
}

const classes = generateUtilityClasses('PrivatePickersToolbarText', ['selected']);

const PickersToolbarTextRoot = styled(Typography, { skipSx: true })<{
  component?: React.ElementType;
}>(({ theme }) => ({
  transition: theme.transitions.create('color'),
  color: theme.palette.text.secondary,
  [`&.${classes.selected}`]: {
    color: theme.palette.text.primary,
  },
}));

const PickersToolbarText = React.forwardRef<HTMLSpanElement, PickersToolbarTextProps>(
  function PickersToolbarText(props, ref) {
    const { className, selected, value, ...other } = props;

    return (
      <PickersToolbarTextRoot
        ref={ref}
        className={clsx({ [classes.selected]: selected }, className)}
        component="span"
        {...other}
      >
        {value}
      </PickersToolbarTextRoot>
    );
  },
);

export default PickersToolbarText;
