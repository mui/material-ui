export interface StepConnectorClasses {
  root: string;
  horizontal: string;
  vertical: string;
  alternativeLabel: string;
  active: string;
  completed: string;
  disabled: string;
  line: string;
  lineHorizontal: string;
  lineVertical: string;
}

declare const stepConnectorClasses: StepConnectorClasses;

export function getStepConnectorUtilityClass(slot: string): string;

export default stepConnectorClasses;
