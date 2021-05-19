import { CardHeaderClassKey } from './CardHeader';

export type CardHeaderClasses = Record<CardHeaderClassKey, string>;

declare const cardHeaderClasses: CardHeaderClasses;

export function getCardHeaderUtilityClass(slot: string): string;

export default cardHeaderClasses;
