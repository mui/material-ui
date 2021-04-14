import { StepperClasskey } from './Stepper';

export type StepperClasses = Record<StepperClasskey, string>;

declare const stepperClasses: StepperClasses;

export function getStapperUtilityClass(slot: string): string;

export default stepperClasses;
