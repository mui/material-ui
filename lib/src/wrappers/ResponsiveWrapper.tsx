import * as React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { IS_TOUCH_DEVICE_MEDIA } from '../constants/dimensions';
import { MobileWrapperProps, MobileWrapper } from './MobileWrapper';
import { DesktopWrapperProps, DesktopWrapper } from './DesktopWrapper';
import { DesktopPopperWrapperProps, DesktopPopperWrapper } from './DesktopPopperWrapper';

export interface ResponsiveWrapperProps
  extends DesktopWrapperProps,
    DesktopPopperWrapperProps,
    MobileWrapperProps {
  /** Css media query when `Mobile` mode will be changed to `Desktop`
   * @default "@media (pointer: fine)"
   * @example "@media (min-width: 720px)" or theme.breakpoints.up("sm")
   */
  desktopModeMediaQuery?: string;
}

export const makeResponsiveWrapper = (
  DesktopWrapperComponent: React.FC<DesktopWrapperProps | DesktopPopperWrapperProps>,
  MobileWrapperComponent: React.FC<MobileWrapperProps>
) => {
  const ResponsiveWrapper: React.FC<ResponsiveWrapperProps> = ({
    desktopModeMediaQuery = IS_TOUCH_DEVICE_MEDIA,
    okText,
    cancelText,
    clearText,
    todayText,
    showTodayButton,
    clearable,
    DialogProps,
    PopoverProps,
    PopperProps,
    TransitionComponent,
    displayStaticWrapperAs,
    ...other
  }) => {
    const isDesktop = useMediaQuery(desktopModeMediaQuery);

    return isDesktop ? (
      <DesktopWrapperComponent
        PopperProps={PopperProps}
        TransitionComponent={TransitionComponent}
        PopoverProps={PopoverProps}
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

export const ResponsivePopperWrapper = makeResponsiveWrapper(DesktopPopperWrapper, MobileWrapper);
