import { extendTheme } from '@mui/material/styles';

const theme = extendTheme();

theme.getCssVar('palette-primary-main');
theme.getCssVar('palette-Alert-errorColor');
theme.getCssVar('opacity-inputPlaceholder');
theme.getCssVar('zIndex-appBar');
theme.getCssVar('shape-borderRadius');
theme.getCssVar('shadows-0');
theme.getCssVar('overlays-0');

// @ts-expect-error
theme.getCssVar();
// @ts-expect-error
theme.getCssVar('');
// @ts-expect-error
theme.getCssVar('custom-color');
// @ts-expect-error
theme.getCssVar('palette-primary-main', '');

// dark only application
extendTheme({ colorSchemes: { dark: true } });

// built-in light and dark modes
extendTheme({ colorSchemes: { light: true, dark: true } });
