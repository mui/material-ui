import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getAlertTitleUtilityClass(slot) {
  return generateUtilityClass('MuiAlertTitle', slot);
}

const alertTitleClasses = generateUtilityClasses('MuiAlertTitle', ['root']);

export default alertTitleClasses;
