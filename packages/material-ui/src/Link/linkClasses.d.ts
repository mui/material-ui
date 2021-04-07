import { LinkClassKey } from './Link';

export type LinkClasses = Record<LinkClassKey, string>;

declare const linkClasses: LinkClasses;

export function getLinkUtilityClass(slot: string): string;

export default linkClasses;
