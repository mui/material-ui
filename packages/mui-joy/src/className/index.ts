/**
 * Caution! this module must not include unstyled components import from `@mui/base`, otherwise, it will break the ClassNameGenerator.
 * ❌ import { ... } from '@mui/base';
 * ✅ import { ... } from '@mui/base/utils'; // must be specific base module
 *
 * Issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401
 */

// eslint-disable-next-line import/prefer-default-export
export { unstable_ClassNameGenerator } from '@mui/base/className';
