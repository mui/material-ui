import * as React from 'react';
import { Theme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { MobileWrapperProps, MobileWrapper } from './MobileWrapper';
import { DesktopWrapperProps, DesktopWrapper } from './DesktopWrapper';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';

export interface ResponsiveWrapperProps extends DesktopWrapperProps, MobileWrapperProps {
  /** Breakpoint when `Desktop` mode will be changed to `Mobile`
   * @default 'md'
   */
  desktopModeBreakpoint?: Breakpoint;
}

export const ResponsiveWrapper: React.FC<ResponsiveWrapperProps> = ({
  desktopModeBreakpoint = 'md',
  okLabel,
  cancelLabel,
  clearLabel,
  todayLabel,
  showTodayButton,
  clearable,
  DialogProps,
  PopoverProps,
  ...other
}) => {
  const isDesktop = useMediaQuery<Theme>(theme => theme.breakpoints.up(desktopModeBreakpoint));

  return isDesktop ? (
    <DesktopWrapper PopoverProps={PopoverProps} {...other} />
  ) : (
    <MobileWrapper
      okLabel={okLabel}
      cancelLabel={cancelLabel}
      clearLabel={clearLabel}
      todayLabel={todayLabel}
      showTodayButton={showTodayButton}
      clearable={clearable}
      DialogProps={DialogProps}
      {...other}
    />
  );
};
