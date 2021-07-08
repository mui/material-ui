import * as React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MobileWrapper, { MobileWrapperProps } from './MobileWrapper';
import { DesktopWrapperProps } from './DesktopWrapper';
import DesktopTooltipWrapper from './DesktopTooltipWrapper';
import { DateInputPropsLike, PrivateWrapperProps } from './WrapperProps';

export interface ResponsiveWrapperProps extends MobileWrapperProps, DesktopWrapperProps {
  /**
   * CSS media query when `Mobile` mode will be changed to `Desktop`.
   * @default '@media (pointer: fine)'
   * @example '@media (min-width: 720px)' or theme.breakpoints.up('sm')
   */
  desktopModeMediaQuery?: string;
}

interface InternalResponsiveWrapperProps extends ResponsiveWrapperProps, PrivateWrapperProps {
  DateInputProps: DateInputPropsLike & { ref?: React.Ref<HTMLDivElement> };
  KeyboardDateInputComponent: React.JSXElementConstructor<
    DateInputPropsLike & { ref?: React.Ref<HTMLDivElement> }
  >;
  PureDateInputComponent: React.JSXElementConstructor<DateInputPropsLike>;
}

export function ResponsiveTooltipWrapper(props: InternalResponsiveWrapperProps) {
  const {
    cancelText,
    clearable,
    clearText,
    DateInputProps,
    desktopModeMediaQuery = '@media (pointer: fine)',
    DialogProps,
    KeyboardDateInputComponent,
    okText,
    PopperProps,
    PureDateInputComponent,
    showTodayButton,
    todayText,
    TransitionComponent,
    ...other
  } = props;
  const isDesktop = useMediaQuery(desktopModeMediaQuery);

  return isDesktop ? (
    <DesktopTooltipWrapper
      DateInputProps={DateInputProps}
      KeyboardDateInputComponent={KeyboardDateInputComponent}
      PopperProps={PopperProps}
      TransitionComponent={TransitionComponent}
      {...other}
    />
  ) : (
    <MobileWrapper
      cancelText={cancelText}
      clearable={clearable}
      clearText={clearText}
      DateInputProps={DateInputProps}
      DialogProps={DialogProps}
      okText={okText}
      PureDateInputComponent={PureDateInputComponent}
      showTodayButton={showTodayButton}
      todayText={todayText}
      {...other}
    />
  );
}
