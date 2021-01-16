import StaticWrapper from './StaticWrapper';
import MobileWrapper from './MobileWrapper';
import DesktopWrapper from './DesktopWrapper';
import { ResponsiveWrapper } from './ResponsiveWrapper';
import DesktopTooltipWrapper from './DesktopTooltipWrapper';
import { PrivateWrapperProps } from './WrapperProps';

export type SomeWrapper =
  | typeof ResponsiveWrapper
  | typeof StaticWrapper
  | typeof MobileWrapper
  | typeof DesktopWrapper
  | typeof DesktopTooltipWrapper;

export type PublicWrapperProps<TWrapper extends SomeWrapper> = Omit<
  React.ComponentProps<TWrapper>,
  keyof PrivateWrapperProps
>;

// Required for babel https://github.com/vercel/next.js/issues/7882. Replace with `export type` in future
export type WrapperVariant = import('./WrapperVariantContext').WrapperVariant;

export { StaticWrapper, MobileWrapper, DesktopWrapper };
