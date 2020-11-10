import StaticWrapper from './StaticWrapper';
import MobileWrapper from './MobileWrapper';
import DesktopWrapper from './DesktopWrapper';
import { ResponsiveWrapper, ResponsiveWrapperProps } from './ResponsiveWrapper';
import DesktopTooltipWrapper from './DesktopTooltipWrapper';
import {
  StaticWrapperProps,
  MobileWrapperProps,
  DesktopWrapperProps,
  PrivateWrapperProps,
} from './WrapperProps';

type UniqueWrapperComponentProps<T extends React.FC<any>> = Omit<
  React.ComponentProps<T>,
  keyof PrivateWrapperProps
>;

export type SomeWrapper =
  | typeof ResponsiveWrapper
  | typeof StaticWrapper
  | typeof MobileWrapper
  | typeof DesktopWrapper
  | typeof DesktopTooltipWrapper;

// prettier-ignore
export type ExtendWrapper<TWrapper extends SomeWrapper> =
  UniqueWrapperComponentProps<TWrapper> extends StaticWrapperProps
  ? StaticWrapperProps
  // make sure that ResponsiveWrapper extends props for mobile and desktop so we must check it before them and only for unique prop
  : UniqueWrapperComponentProps<TWrapper> extends Pick<ResponsiveWrapperProps, 'desktopModeMediaQuery'>
  ? ResponsiveWrapperProps
  : UniqueWrapperComponentProps<TWrapper> extends DesktopWrapperProps
  ? DesktopWrapperProps
  : UniqueWrapperComponentProps<TWrapper> extends MobileWrapperProps
  ? MobileWrapperProps
  : {};

// Required for babel https://github.com/vercel/next.js/issues/7882. Replace with `export type` in future
export type WrapperVariant = import('./WrapperVariantContext').WrapperVariant;

export { StaticWrapper, MobileWrapper, DesktopWrapper };
