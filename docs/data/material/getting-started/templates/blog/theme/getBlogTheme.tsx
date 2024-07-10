import type {} from '@mui/material/themeCssVarsAugmentation';
import { ThemeOptions } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import { getDesignTokens } from './themePrimitives';
import {
  buttonsCustomizations,
  inputsCustomizations,
  layoutComponentsCustomizations,
  menuComponentsCustomizations,
  otherComponentsCustomizations,
} from './customizations';

export default function getBlogTheme(mode: PaletteMode): ThemeOptions {
  return {
    ...getDesignTokens(mode),
    components: {
      ...buttonsCustomizations,
      ...inputsCustomizations,
      ...layoutComponentsCustomizations,
      ...menuComponentsCustomizations,
      ...otherComponentsCustomizations,
    },
  };
}
