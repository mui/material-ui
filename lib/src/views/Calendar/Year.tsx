import * as React from 'react';
import clsx from 'clsx';
import { useForkRef } from '@material-ui/core/utils';
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
    root: {
      flexBasis: '33.3%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '&$disabled': {
        color: theme.palette.text.secondary,
      },
      '&$selected': {
        color: theme.palette.getContrastText(theme.palette.primary.main),
        backgroundColor: theme.palette.primary.main,
        '&:focus, &:hover': {
          backgroundColor: theme.palette.primary.dark,
        },
      },
    },
    modeDesktop: {
      flexBasis: '25%',
    },
    yearButton: {
      color: 'unset',
      backgroundColor: 'transparent',
      border: 'none',
      outline: 0,
      ...theme.typography.subtitle1,
      margin: '8px 0',
      height: 36,
      width: 72,
      borderRadius: 16,
      cursor: 'pointer',
      '&:focus, &:hover': {
        backgroundColor: fade(theme.palette.action.active, theme.palette.action.hoverOpacity),
      },
    },
    disabled: {},
    selected: {},
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
}) => {
  const classes = useStyles();
  const ref = React.useRef<HTMLButtonElement>(null);
  const refHandle = useForkRef(ref, forwardedRef as React.Ref<HTMLButtonElement>);
  const canAutoFocus = useCanAutoFocus();
  const wrapperVariant = React.useContext(WrapperVariantContext);

  React.useEffect(() => {
    if (canAutoFocus && focused && ref.current && !disabled && allowKeyboardControl) {
      ref.current.focus();
    }
  }, [allowKeyboardControl, canAutoFocus, disabled, focused]);

  return (
    <div
      data-mui-test="year"
      className={clsx(classes.root, {
        [classes.modeDesktop]: wrapperVariant === 'desktop',
      })}
    >
      <button
        ref={refHandle}
        disabled={disabled}
        data-mui-test={`year-${children}`}
        tabIndex={selected ? 0 : -1}
        onClick={() => onSelect(value)}
        onKeyDown={onSpaceOrEnter(() => onSelect(value))}
        className={clsx(classes.yearButton, {
          [classes.disabled]: disabled,
          [classes.selected]: selected,
        })}
      >
        {children}
      </button>
    </div>
  );
};

export default React.forwardRef<HTMLButtonElement, YearProps>((props, ref) => (
  <Year {...props} forwardedRef={ref} />
));
