import { unstable_generateUtilityClasses as generateUtilityClasses } from '@mui/utils';
import generateUtilityClass from '../generateUtilityClass';

export interface StepConnectorClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `orientation="horizontal"`. */
  horizontal: string;
  /** Styles applied to the root element if `orientation="vertical"`. */
  vertical: string;
  /** Styles applied to the root element if `alternativeLabel={true}`. */
  alternativeLabel: string;
  /** State class applied to the root element if `active={true}`. */
  active: string;
  /** State class applied to the root element if `completed={true}`. */
  completed: string;
  /** State class applied to the root element if `disabled={true}`. */
  disabled: string;
  /** Styles applied to the line element. */
  line: string;
  /** Styles applied to the root element if `orientation="horizontal"`. */
  lineHorizontal: string;
  /** Styles applied to the root element if `orientation="vertical"`. */
  lineVertical: string;
}

export type StepConnectorClassKey = keyof StepConnectorClasses;

export function getStepConnectorUtilityClass(slot: string): string {
  return generateUtilityClass('MuiStepConnector', slot);
}

const stepConnectorClasses: StepConnectorClasses = generateUtilityClasses('MuiStepConnector', [
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
