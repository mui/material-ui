import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

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
