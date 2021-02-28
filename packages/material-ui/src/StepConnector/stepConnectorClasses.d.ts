import { StepConnectorClasskey } from './StepConnector';

declare const stepConnectorClasses: Record<StepConnectorClasskey, string>;

export function getStepConnectorUtilityClass(slot: string): string;

export default stepConnectorClasses;
