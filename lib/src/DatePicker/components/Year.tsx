import * as React from 'react';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import { Theme, makeStyles } from '@material-ui/core/styles';

export interface YearProps {
  children: React.ReactNode;
  disabled?: boolean;
  onSelect: (value: any) => void;
  selected?: boolean;
  value: any;
  forwardedRef?: React.Ref<HTMLElement | null>;
}

export const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      height: theme.spacing(5),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      outline: 'none',
      '&:focus': {
        color: theme.palette.primary.main,
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
    yearSelected: {
      margin: '10px 0',
      fontWeight: theme.typography.fontWeightMedium,
    },
    yearDisabled: {
      pointerEvents: 'none',
      color: theme.palette.text.hint,
    },
  }),
  { name: 'MuiPickersYear' }
);

export const Year: React.FC<YearProps> = ({
  onSelect,
  forwardedRef,
  value,
  selected,
  disabled,
  children,
  ...other
}) => {
  const classes = useStyles();
  const handleClick = React.useCallback(() => onSelect(value), [onSelect, value]);

  return (
    <Typography
      role="button"
      component="div"
      tabIndex={disabled ? -1 : 0}
      onClick={handleClick}
      onKeyPress={handleClick}
      color={selected ? 'primary' : undefined}
      variant={selected ? 'h5' : 'subtitle1'}
      children={children}
      ref={forwardedRef}
      className={clsx(classes.root, {
        [classes.yearSelected]: selected,
        [classes.yearDisabled]: disabled,
      })}
      {...other}
    />
  );
};

Year.displayName = 'Year';

export default React.forwardRef<HTMLElement, YearProps>((props, ref) => (
  <Year {...props} forwardedRef={ref} />
));
