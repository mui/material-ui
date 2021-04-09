import { StepContentClasskey } from './StepContent';

declare const stepContentClasses: Record<StepContentClasskey, string>;

export function getStepContentUtilityClass(slot: string): string;

export default stepContentClasses;
