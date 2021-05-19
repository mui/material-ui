import { SliderUnstyledClassKey } from './SliderUnstyled';

export type SliderUnstyledClasses = Record<SliderUnstyledClassKey, string>;

declare const sliderUnstyledClasses: SliderUnstyledClasses;

export function getSliderUtilityClass(slot: string): string;

export default sliderUnstyledClasses;
