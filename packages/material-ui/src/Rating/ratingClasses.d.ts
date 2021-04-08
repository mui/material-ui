import { RatingClassKey } from './Rating';

declare const ratingClasses: Record<RatingClassKey, string>;

export function getRatingUtilityClass(slot: string): string;

export default ratingClasses;
