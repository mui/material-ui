import type {} from '@mui/material/themeCssVarsAugmentation';
import { ThemeOptions , PaletteMode } from '@mui/material/styles';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import type {} from '@mui/x-charts/themeAugmentation';
import type {} from '@mui/x-data-grid/themeAugmentation';
import type {} from '@mui/x-tree-view/themeAugmentation';
import { getDesignTokens } from './themePrimitives';
import {
  buttonsCustomizations,
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
  inputsCustomizations,
  layoutComponentsCustomizations,
  menuComponentsCustomizations,
  otherComponentsCustomizations,
} from './customizations';

export default function getDashboardTheme(mode: PaletteMode): ThemeOptions {
  return {
    ...getDesignTokens(mode),
    components: {
      ...buttonsCustomizations,
      ...chartsCustomizations,
      ...dataGridCustomizations,
      ...datePickersCustomizations,
      ...treeViewCustomizations,
      ...inputsCustomizations,
      ...layoutComponentsCustomizations,
      ...menuComponentsCustomizations,
      ...otherComponentsCustomizations,
    },
  };
}
