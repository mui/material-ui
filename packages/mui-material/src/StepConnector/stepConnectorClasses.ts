import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

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
  /** Styles applied to the line element if `orientation="horizontal"`.
   * @deprecated Combine the [.MuiStepConnector-horizontal](/material-ui/api/step-connector/#step-connector-classes-horizontal) and [.MuiStepConnector-line](/material-ui/api/step-connector/#step-connector-classes-line) classes instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  lineHorizontal: string;
  /** Styles applied to the line element if `orientation="vertical"`.
   * @deprecated Combine the [.MuiStepConnector-vertical](/material-ui/api/step-connector/#step-connector-classes-vertical) and [.MuiStepConnector-line](/material-ui/api/step-connector/#step-connector-classes-line) classes instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
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
