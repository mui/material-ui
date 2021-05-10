import * as React from 'react';
import clsx from 'clsx';
import { useForkRef } from '@material-ui/core/utils';
import { WithStyles, withStyles, alpha, StyleRules, MuiStyles } from '@material-ui/core/styles';
import { WrapperVariantContext } from '../internal/pickers/wrappers/WrapperVariantContext';

export interface YearProps {
  autoFocus?: boolean;
  children: React.ReactNode;
  disabled?: boolean;
  forwardedRef?: React.Ref<HTMLButtonElement>;
  onClick: (event: React.MouseEvent, value: number) => void;
  onKeyDown: (event: React.KeyboardEvent, value: number) => void;
  selected: boolean;
  value: number;
}

export type PickersYearClassKey = 'root' | 'modeDesktop' | 'yearButton' | 'disabled' | 'selected';

export const styles: MuiStyles<PickersYearClassKey> = (theme): StyleRules<PickersYearClassKey> => ({
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
    border: 0,
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

/**
 * @ignore - internal component.
 */
const PickersYear = React.forwardRef<HTMLButtonElement, YearProps & WithStyles<typeof styles>>(
  (props, forwardedRef) => {
    const { autoFocus, classes, children, disabled, onClick, onKeyDown, selected, value } = props;
    const ref = React.useRef<HTMLButtonElement>(null);
    const refHandle = useForkRef(ref, forwardedRef as React.Ref<HTMLButtonElement>);
    const wrapperVariant = React.useContext(WrapperVariantContext);

    // TODO: Can we just forward this to the button?
    React.useEffect(() => {
      if (autoFocus) {
        // `ref.current` being `null` would be a bug in Material-UIu
        ref.current!.focus();
      }
    }, [autoFocus]);

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
          onClick={(event) => onClick(event, value)}
          onKeyDown={(event) => onKeyDown(event, value)}
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

export default withStyles(styles, { name: 'PrivatePickersYear' })(PickersYear);
