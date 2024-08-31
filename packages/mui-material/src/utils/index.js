'use client';
import { unstable_ClassNameGenerator as ClassNameGenerator } from '@mui/utils';

export { default as capitalize } from './capitalize';
export { default as createChainedFunction } from './createChainedFunction';
export { default as createSvgIcon } from './createSvgIcon';
export { default as debounce } from './debounce';
export { default as deprecatedPropType } from './deprecatedPropType';
export { default as isMuiElement } from './isMuiElement';
export { default as unstable_memoTheme } from './memoTheme';
export { default as ownerDocument } from './ownerDocument';
export { default as ownerWindow } from './ownerWindow';
export { default as requirePropFactory } from './requirePropFactory';
export { default as setRef } from './setRef';
export { default as unstable_useEnhancedEffect } from './useEnhancedEffect';
export { default as unstable_useId } from './useId';
export { default as unsupportedProp } from './unsupportedProp';
export { default as useControlled } from './useControlled';
export { default as useEventCallback } from './useEventCallback';
export { default as useForkRef } from './useForkRef';
// TODO: remove this export once ClassNameGenerator is stable
// eslint-disable-next-line @typescript-eslint/naming-convention
export const unstable_ClassNameGenerator = {
  configure: (generator) => {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        [
          'MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.',
          '',
          "You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead",
          '',
          'The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401',
          '',
          'The updated documentation: https://mui.com/guides/classname-generator/',
        ].join('\n'),
      );
    }
    ClassNameGenerator.configure(generator);
  },
};
