import { TypographyClassKey } from './Typography';

declare const typographyClasses: Record<TypographyClassKey, string>;

export function getTypographyUtilityClass(slot: string): string;

export default typographyClasses;
