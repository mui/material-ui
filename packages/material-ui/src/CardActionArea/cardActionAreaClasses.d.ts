export interface CardActionAreaClasses {
  root: string;
  focusVisible: string;
  focusHighlight: string;
}

declare const cardActionAreaClasses: CardActionAreaClasses;

export function getCardActionAreaUtilityClass(slot: string): string;

export default cardActionAreaClasses;
