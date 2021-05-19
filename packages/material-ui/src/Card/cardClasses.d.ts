import { CardClassKey } from './Card';

export type CardClasses = Record<CardClassKey, string>;

declare const cardClasses: CardClasses;

export function getCardUtilityClass(slot: string): string;

export default cardClasses;
