import { SimpleStyleFunction, spacing, PropsFor } from '../Box';

export type SpacingValueType = string | number | null | undefined;
export type SpacingProps = PropsFor<typeof spacing>;
export function createUnarySpacing<Spacing>(theme: { spacing: Spacing }): Spacing extends number
  ? (abs: number | string) => number | number
  : Spacing extends any[]
    ? <Index extends number>(abs: Index | string) => Spacing[Index] | string
    : Spacing extends (...args: unknown[]) => unknown
      ? Spacing
      : // warns in Dev
        () => undefined;

export function createUnaryUnit<Spacing>(
  theme: { spacing: Spacing },
  themeKey: string,
  defaultValue: Spacing,
  propName: string,
): Spacing extends number
  ? (abs: SpacingValueType) => number | number
  : Spacing extends any[]
    ? <Index extends number>(abs: Index | string) => Spacing[Index] | string
    : Spacing extends (...args: unknown[]) => unknown
      ? Spacing
      : // warns in Dev
        () => undefined;

export const margin: SimpleStyleFunction<
  | 'm'
  | 'mt'
  | 'mr'
  | 'mb'
  | 'ml'
  | 'mx'
  | 'my'
  | 'margin'
  | 'marginTop'
  | 'marginRight'
  | 'marginBottom'
  | 'marginLeft'
  | 'marginX'
  | 'marginY'
  | 'marginInline'
  | 'marginInlineStart'
  | 'marginInlineEnd'
  | 'marginBlock'
  | 'marginBlockStart'
  | 'marginBlockEnd'
>;

export type MarginProps = PropsFor<typeof margin>;

export const padding: SimpleStyleFunction<
  | 'p'
  | 'pt'
  | 'pr'
  | 'pb'
  | 'pl'
  | 'px'
  | 'py'
  | 'padding'
  | 'paddingTop'
  | 'paddingRight'
  | 'paddingBottom'
  | 'paddingLeft'
  | 'paddingX'
  | 'paddingY'
  | 'paddingInline'
  | 'paddingInlineStart'
  | 'paddingInlineEnd'
  | 'paddingBlock'
  | 'paddingBlockStart'
  | 'paddingBlockEnd'
>;

export function getValue(
  transformer: (prop: SpacingValueType) => SpacingValueType,
  propValue: SpacingValueType,
): SpacingValueType;

export type PaddingProps = PropsFor<typeof padding>;
