import type { CSSObjectNoCallback } from './base';
import type { ThemeArgs } from './theme';

export type SxProp = CSSObjectNoCallback | ((themeArgs: ThemeArgs) => CSSObjectNoCallback);

export default function sx(arg: SxProp, componentClass?: string): string;
