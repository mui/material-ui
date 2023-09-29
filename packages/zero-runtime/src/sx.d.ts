import type { CSSObjectNoCallback, ThemeArgs } from './base';

export type SxProp = CSSObjectNoCallback | ((themeArgs: ThemeArgs) => CSSObjectNoCallback);

export default function sx(arg: SxProp, componentClass?: string): string;
