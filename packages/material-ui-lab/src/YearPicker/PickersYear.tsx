import * as React from 'react';
import clsx from 'clsx';
import { useForkRef } from '@material-ui/core/utils';
import { createStyles, WithStyles, withStyles, Theme, alpha } from '@material-ui/core/styles';
import { onSpaceOrEnter } from '../internal/pickers/utils';
import { useCanAutoFocus } from '../internal/pickers/hooks/useCanAutoFocus';
import { WrapperVariantContext } from '../internal/pickers/wrappers/WrapperVariantContext';

export interface YearProps {
  children: React.ReactNode;
  disabled?: boolean;
  onSelect: (value: number) => void;
  selected: boolean;
  focused: boolean;
  value: number;
  allowKeyboardControl?: boolean;
  forwardedRef?: React.Ref<HTMLButtonElement>;
}

export const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexBasis: '33.3%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
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
        backgroundColor: alpha(theme.palette.action.active, theme.palette.action.hoverOpacity),
      },
      '&$disabled': {
        color: theme.palette.text.secondary,
      },
      '&$selected': {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
        '&:focus, &:hover': {
          backgroundColor: theme.palette.primary.dark,
        },
      },
    },
    disabled: {},
    selected: {},
  });

export type PickersYearClassKey = keyof WithStyles<typeof styles>['classes'];

/**
 * @ignore - internal component.
 */
const PickersYear = React.forwardRef<HTMLButtonElement, YearProps & WithStyles<typeof styles>>(
  (props, forwardedRef) => {
    const {
      allowKeyboardControl,
      classes,
      children,
      disabled,
      focused,
      onSelect,
      selected,
      value,
    } = props;
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
          type="button"
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
  },
);

export default withStyles(styles, { name: 'MuiPickersYear' })(PickersYear);
