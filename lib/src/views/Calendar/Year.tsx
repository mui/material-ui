import * as React from 'react';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import { onSpaceOrEnter } from '../../_helpers/utils';
import { makeStyles, fade } from '@material-ui/core/styles';
import { useCanAutoFocus } from '../../_shared/hooks/useCanAutoFocus';
import { WrapperVariantContext } from '../../wrappers/WrapperVariantContext';

export interface YearProps {
  children: React.ReactNode;
  disabled?: boolean;
  onSelect: (value: any) => void;
  selected: boolean;
  focused: boolean;
  value: any;
  allowKeyboardControl?: boolean;
  forwardedRef?: React.Ref<HTMLButtonElement>;
}

export const useStyles = makeStyles(
  theme => ({
    yearButtonContainer: {
      color: 'unset',
      backgroundColor: 'transparent',
      border: 'none',
      outline: 0,
      flexBasis: '33.3%',
      display: 'flex',
      justifyContent: 'center',
      padding: '8px 0',
    },
    yearButtonContainerDesktop: {
      flexBasis: '25%',
    },
    yearButton: {
      height: 36,
      width: 72,
      borderRadius: 16,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      outline: 'none',
      '&:focus, &:hover': {
        backgroundColor: fade(theme.palette.action.active, theme.palette.action.hoverOpacity),
      },
    },
    yearSelected: {
      color: theme.palette.getContrastText(theme.palette.primary.main),
      backgroundColor: theme.palette.primary.main,
      '&:focus, &:hover': {
        backgroundColor: theme.palette.primary.dark,
      },
    },
    yearDisabled: {
      pointerEvents: 'none',
      color: theme.palette.text.secondary,
    },
  }),
  { name: 'MuiPickersYear' }
);

export const Year: React.FC<YearProps> = ({
  allowKeyboardControl,
  children,
  disabled,
  focused,
  forwardedRef,
  onSelect,
  selected,
  value,
  ...other
}) => {
  const classes = useStyles();
  const canAutoFocus = useCanAutoFocus();
  const ref = React.useRef<HTMLSpanElement>(null);
  const wrapperVariant = React.useContext(WrapperVariantContext);

  React.useEffect(() => {
    if (canAutoFocus && focused && ref.current && !disabled && allowKeyboardControl) {
      ref.current.focus();
    }
  }, [allowKeyboardControl, canAutoFocus, disabled, focused]);

  return (
    <button
      ref={forwardedRef}
      disabled={disabled}
      data-mui-test="year"
      onClick={() => onSelect(value)}
      className={clsx(classes.yearButtonContainer, {
        [classes.yearButtonContainerDesktop]: wrapperVariant === 'desktop',
      })}
    >
      <Typography
        ref={ref}
        variant="subtitle1"
        data-mui-test={`year-${children}`}
        tabIndex={selected ? 0 : -1}
        color={selected ? 'primary' : undefined}
        onKeyDown={onSpaceOrEnter(() => onSelect(value))}
        className={clsx(classes.yearButton, {
          [classes.yearSelected]: selected,
          [classes.yearDisabled]: disabled,
        })}
        {...other}
      >
        {children}
      </Typography>
    </button>
  );
};

export default React.forwardRef<HTMLButtonElement, YearProps>((props, ref) => (
  <Year {...props} forwardedRef={ref} />
));
