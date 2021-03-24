import StaticWrapper from './StaticWrapper';
import MobileWrapper from './MobileWrapper';
import DesktopWrapper from './DesktopWrapper';

// Required for babel https://github.com/vercel/next.js/issues/7882. Replace with `export type` in future
export type WrapperVariant = import('./WrapperVariantContext').WrapperVariant;

export { StaticWrapper, MobileWrapper, DesktopWrapper };
