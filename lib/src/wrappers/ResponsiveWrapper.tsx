import * as React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { MobileWrapperProps, MobileWrapper } from './MobileWrapper';
import { DesktopWrapperProps, DesktopWrapper } from './DesktopWrapper';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import { DesktopPopperWrapperProps, DesktopPopperWrapper } from './DesktopPopperWrapper';

export interface ResponsiveWrapperProps
  extends DesktopWrapperProps,
    DesktopPopperWrapperProps,
    MobileWrapperProps {
  /** Breakpoint when `Desktop` mode will be changed to `Mobile`
   * @default 'md'
   */
  desktopModeBreakpoint?: Breakpoint;
}

export const makeResponsiveWrapper = (
  DesktopWrapperComponent: React.FC<DesktopWrapperProps | DesktopPopperWrapperProps>,
  MobileWrapperComponent: React.FC<MobileWrapperProps>
) => {
  const ResponsiveWrapper: React.FC<ResponsiveWrapperProps> = ({
    desktopModeBreakpoint = 'md',
    okLabel,
    cancelLabel,
    clearLabel,
    todayLabel,
    showTodayButton,
    clearable,
    DialogProps,
    PopoverProps,
    PopperProps,
    TransitionComponent,
    displayStaticWrapperAs,
    ...other
  }) => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up(desktopModeBreakpoint));

    return isDesktop ? (
      <DesktopWrapperComponent
        PopperProps={PopperProps}
        TransitionComponent={TransitionComponent}
        PopoverProps={PopoverProps}
        {...other}
      />
    ) : (
      <MobileWrapperComponent
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

  return ResponsiveWrapper;
};

export const ResponsiveWrapper = makeResponsiveWrapper(DesktopWrapper, MobileWrapper);

export const ResponsivePopperWrapper = makeResponsiveWrapper(DesktopPopperWrapper, MobileWrapper);
