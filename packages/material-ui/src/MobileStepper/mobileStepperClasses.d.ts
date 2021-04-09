import { MobileStepperClassKey } from './MobileStepper';

declare const mobileStepperClasses: Record<MobileStepperClassKey, string>;

export function getMobileStepperUtilityClass(slot: string): string;

export default mobileStepperClasses;
