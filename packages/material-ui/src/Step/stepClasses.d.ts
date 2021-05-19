import { StepClasskey } from './Step';

declare const stepClasses: Record<StepClasskey, string>;

export function getStepUtilityClass(slot: string): string;

export default stepClasses;
