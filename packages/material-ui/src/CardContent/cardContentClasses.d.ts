import { CardContentClassKey } from './CardContent';

export type CardContentClasses = Record<CardContentClassKey, string>;

declare const cardContentClasses: CardContentClasses;

export function getCardContentUtilityClass(slot: string): string;

export default cardContentClasses;
