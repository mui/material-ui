import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getStepConnectorUtilityClass(slot) {
  return generateUtilityClass('MuiStepConnector', slot);
}

const stepConnectorClasses = generateUtilityClasses('MuiStepConnector', [
  'root',
  'horizontal',
  'vertical',
  'alternativeLabel',
  'active',
  'completed',
  'disabled',
  'line',
  'lineHorizontal',
  'lineVertical',
]);

export default stepConnectorClasses;
