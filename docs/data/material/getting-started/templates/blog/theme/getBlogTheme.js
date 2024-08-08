import { getDesignTokens } from './themePrimitives';
import {
  buttonsCustomizations,
  inputsCustomizations,
  layoutComponentsCustomizations,
  menuComponentsCustomizations,
  otherComponentsCustomizations,
} from './customizations';

export default function getBlogTheme(mode) {
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
