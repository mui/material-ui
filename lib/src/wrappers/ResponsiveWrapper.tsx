import * as React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { IS_TOUCH_DEVICE_MEDIA } from '../constants/dimensions';
import { MobileWrapperProps, MobileWrapper } from './MobileWrapper';
import { DesktopWrapperProps, DesktopWrapper } from './DesktopWrapper';
import { DesktopTooltipWrapperProps, DesktopTooltipWrapper } from './DesktopTooltipWrapper';

export interface ResponsiveWrapperProps
  extends DesktopWrapperProps,
    DesktopTooltipWrapperProps,
    MobileWrapperProps {
  /**
   * CSS media query when `Mobile` mode will be changed to `Desktop`.
   *
   * @default "@media (pointer: fine)"
   * @example "@media (min-width: 720px)" or theme.breakpoints.up("sm")
   */
  desktopModeMediaQuery?: string;
}

export const makeResponsiveWrapper = (
  DesktopWrapperComponent: React.FC<DesktopWrapperProps | DesktopTooltipWrapperProps>,
  MobileWrapperComponent: React.FC<MobileWrapperProps>
) => {
  const ResponsiveWrapper: React.FC<ResponsiveWrapperProps> = ({
    cancelText,
    clearable,
    clearText,
    desktopModeMediaQuery = IS_TOUCH_DEVICE_MEDIA,
    DialogProps,
    displayStaticWrapperAs,
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
