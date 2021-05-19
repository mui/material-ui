import { CardMediaClassKey } from './CardMedia';

export type CardMediaClasses = Record<CardMediaClassKey, string>;

declare const cardMediaClasses: CardMediaClasses;

export function getCardMediaUtilityClass(slot: string): string;

export default cardMediaClasses;
