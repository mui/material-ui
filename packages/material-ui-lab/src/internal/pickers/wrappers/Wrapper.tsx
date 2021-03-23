import StaticWrapper from './StaticWrapper';
import MobileWrapper from './MobileWrapper';
import DesktopWrapper from './DesktopWrapper';
import { ResponsiveWrapper } from './ResponsiveWrapper';
import DesktopTooltipWrapper from './DesktopTooltipWrapper';

export type SomeWrapper =
  | typeof DesktopTooltipWrapper
  | typeof DesktopWrapper
  | typeof MobileWrapper
  | typeof ResponsiveWrapper
  | typeof StaticWrapper;

// Required for babel https://github.com/vercel/next.js/issues/7882. Replace with `export type` in future
export type WrapperVariant = import('./WrapperVariantContext').WrapperVariant;

export { StaticWrapper, MobileWrapper, DesktopWrapper };
