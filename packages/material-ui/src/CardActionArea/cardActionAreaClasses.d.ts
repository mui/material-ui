import { CardActionAreaClassKey } from './CardActionArea';

export type CardActionAreaClasses = Record<CardActionAreaClassKey, string>;

declare const cardActionAreaClasses: CardActionAreaClasses;

export function getCardActionAreaUtilityClass(slot: string): string;

export default cardActionAreaClasses;
