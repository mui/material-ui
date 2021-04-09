import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getTabPanelUtilityClass(slot) {
  return generateUtilityClass('MuiTabPanel', slot);
}

const tabPanelClasses = generateUtilityClasses('MuiTabPanel', ['root']);

export default tabPanelClasses;
