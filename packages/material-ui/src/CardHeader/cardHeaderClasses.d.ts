export interface CardHeaderClasses {
  root: string;
  avatar: string;
  action: string;
  content: string;
  title: string;
  subheader: string;
}

declare const cardHeaderClasses: CardHeaderClasses;

export function getCardHeaderUtilityClass(slot: string): string;

export default cardHeaderClasses;
