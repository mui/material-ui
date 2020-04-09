import * as React from 'react';
import * as PropTypes from 'prop-types';
import KeyboardDateInput from '../_shared/KeyboardDateInput';
import Popover, { PopoverProps } from '@material-ui/core/Popover';
import { WrapperProps } from './Wrapper';
import { StaticWrapperProps } from './StaticWrapper';
import { makeStyles } from '@material-ui/core/styles';
import { InnerMobileWrapperProps } from './MobileWrapper';
import { WrapperVariantContext } from './WrapperVariantContext';
import { InnerDesktopPopperWrapperProps } from './DesktopPopperWrapper';

export interface InnerDesktopWrapperProps {
  /** Popover props passed to material-ui Popover */
  PopoverProps?: Partial<PopoverProps>;
}

export interface DesktopWrapperProps
  extends InnerDesktopWrapperProps,
    WrapperProps,
    Partial<InnerMobileWrapperProps & InnerDesktopPopperWrapperProps & StaticWrapperProps> {}

const useStyles = makeStyles({
  popover: {
    '&:focus': {
      outline: 'auto',
      '@media (pointer:coarse)': {
        outline: 0,
      },
    },
  },
});

export const DesktopWrapper: React.FC<DesktopWrapperProps> = ({
  open,
  wider,
  children,
  PopoverProps,
  PopperProps,
  TransitionComponent,
  onClear,
  onDismiss,
  onSetToday,
  onAccept,
  showTabs,
  DateInputProps,
  okLabel,
  cancelLabel,
  clearLabel,
  todayLabel,
  showTodayButton,
  clearable,
  DialogProps,
  PureDateInputComponent,
  displayStaticWrapperAs,
  KeyboardDateInputComponent = KeyboardDateInput,
  ...other
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const classes = useStyles();

  return (
    <WrapperVariantContext.Provider value="desktop">
      <KeyboardDateInputComponent {...other} {...DateInputProps} containerRef={ref} />

      <Popover
        role="dialog"
        open={open}
        onClose={onDismiss}
        anchorEl={ref.current}
        classes={{ paper: classes.popover }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        {...PopoverProps}
      >
        {children}
      </Popover>
    </WrapperVariantContext.Provider>
  );
};

DesktopWrapper.propTypes = {
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  PopoverProps: PropTypes.object,
} as any;
