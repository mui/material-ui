export interface CardMediaClasses {
  root: string;
  media: string;
  img: string;
}

declare const cardMediaClasses: CardMediaClasses;

export function getCardMediaUtilityClass(slot: string): string;

export default cardMediaClasses;
