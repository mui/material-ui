export interface CardActionsClasses {
  root: string;
  spacing: string;
}

declare const cardActionsClasses: CardActionsClasses;

export function getCardActionsUtilityClass(slot: string): string;

export default cardActionsClasses;
