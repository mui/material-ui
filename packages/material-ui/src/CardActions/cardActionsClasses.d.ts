import { CardActionsClassKey } from './CardActions';

export type CardActionsClasses = Record<CardActionsClassKey, string>;

declare const cardActionsClasses: CardActionsClasses;

export function getCardActionsUtilityClass(slot: string): string;

export default cardActionsClasses;
