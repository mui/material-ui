import * as React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MobileWrapper, { MobileWrapperProps } from './MobileWrapper';
import DesktopWrapper, { DesktopWrapperProps } from './DesktopWrapper';
import DesktopTooltipWrapper from './DesktopTooltipWrapper';
import { PrivateWrapperProps } from './WrapperProps';

export interface ResponsiveWrapperProps extends MobileWrapperProps, DesktopWrapperProps {
  /**
   * CSS media query when `Mobile` mode will be changed to `Desktop`.
   * @default "@media (pointer: fine)"
   * @example "@media (min-width: 720px)" or theme.breakpoints.up("sm")
   */
  desktopModeMediaQuery?: string;
}

export const makeResponsiveWrapper = (
  DesktopWrapperComponent: React.FC<PrivateWrapperProps & DesktopWrapperProps>,
  MobileWrapperComponent: React.FC<PrivateWrapperProps & MobileWrapperProps>,
) => {
  const ResponsiveWrapper: React.FC<ResponsiveWrapperProps & PrivateWrapperProps> = ({
    cancelText,
    clearable,
    clearText,
    desktopModeMediaQuery = '@media (pointer: fine)',
    DialogProps,
    okText,
    PopperProps,
    showTodayButton,
    todayText,
    TransitionComponent,
    ...other
  }) => {
    const isDesktop = useMediaQuery(desktopModeMediaQuery);

    return isDesktop ? (
      <DesktopWrapperComponent
        PopperProps={PopperProps}
        TransitionComponent={TransitionComponent}
        {...other}
      />
    ) : (
      <MobileWrapperComponent
        okText={okText}
        cancelText={cancelText}
        clearText={clearText}
        todayText={todayText}
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

export const ResponsiveTooltipWrapper = makeResponsiveWrapper(DesktopTooltipWrapper, MobileWrapper);
