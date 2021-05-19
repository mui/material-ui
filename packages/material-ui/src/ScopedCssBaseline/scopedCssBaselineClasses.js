import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getScopedCssBaselineUtilityClass(slot) {
  return generateUtilityClass('MuiScopedCssBaseline', slot);
}

const ScopedCssBaselineClasses = generateUtilityClasses('MuiScopedCssBaseline', ['root']);

export default ScopedCssBaselineClasses;
