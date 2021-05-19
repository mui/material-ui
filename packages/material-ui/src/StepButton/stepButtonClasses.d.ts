import { StepButtonClasskey } from './StepButton';

export type StepButtonClasses = Record<StepButtonClasskey, string>;

declare const stepButtonClasses: StepButtonClasses;

export function getStepButtonUtilityClass(slot: string): string;

export default stepButtonClasses;
