import * as React from 'react';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import { makeStyles, fade } from '@material-ui/core/styles';
import { onSpaceOrEnter } from '../../_helpers/utils';
import { WrapperVariantContext } from '../../wrappers/WrapperVariantContext';

export interface YearProps {
  children: React.ReactNode;
  disabled?: boolean;
  onSelect: (value: any) => void;
  selected: boolean;
  focused: boolean;
  value: any;
  allowKeyboardControl?: boolean;
  forwardedRef?: React.Ref<HTMLDivElement>;
}

export const useStyles = makeStyles(
  theme => ({
    yearButtonContainer: {
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
  focused,
  allowKeyboardControl,
  ...other
}) => {
  const classes = useStyles();
  const ref = React.useRef<HTMLSpanElement>(null);
  const wrapperVariant = React.useContext(WrapperVariantContext);

  React.useEffect(() => {
    if (focused && ref.current && !disabled && allowKeyboardControl) {
      ref.current.focus();
    }
  }, [allowKeyboardControl, disabled, focused]);

  return (
    <div
      role="button"
      ref={forwardedRef}
      onClick={() => onSelect(value)}
      className={clsx(classes.yearButtonContainer, {
        [classes.yearButtonContainerDesktop]: wrapperVariant === 'desktop',
      })}
    >
      <Typography
        ref={ref}
        variant="subtitle1"
        tabIndex={selected ? 0 : -1}
        color={selected ? 'primary' : undefined}
        children={children}
        onKeyDown={onSpaceOrEnter(() => onSelect(value))}
        className={clsx(classes.yearButton, {
          [classes.yearSelected]: selected,
          [classes.yearDisabled]: disabled,
        })}
        {...other}
      />
    </div>
  );
};

Year.displayName = 'Year';

export default React.forwardRef<HTMLDivElement, YearProps>((props, ref) => (
  <Year {...props} forwardedRef={ref} />
));
