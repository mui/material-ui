import * as React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MobileWrapper from './MobileWrapper';
import DesktopWrapper from './DesktopWrapper';
import DesktopTooltipWrapper from './DesktopTooltipWrapper';
import {
  MobileWrapperProps,
  DesktopWrapperProps,
  WrapperProps,
  PrivateWrapperProps,
} from './WrapperProps';

export interface ResponsiveWrapperProps extends MobileWrapperProps, DesktopWrapperProps {
  /**
   * CSS media query when `Mobile` mode will be changed to `Desktop`.
   * @default "@media (pointer: fine)"
   * @example "@media (min-width: 720px)" or theme.breakpoints.up("sm")
   */
  desktopModeMediaQuery?: string;
}

export const makeResponsiveWrapper = (
  DesktopWrapperComponent: React.FC<WrapperProps>,
  MobileWrapperComponent: React.FC<WrapperProps>,
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
