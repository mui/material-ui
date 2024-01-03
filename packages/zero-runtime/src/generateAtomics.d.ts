import type { CSSProperties } from './base';
import type { ThemeArgs } from './theme';

// @TODO Implement proper types
type GenerateAtomicsResult = (props: any) => { className: string };

type AtomicProperty = {
  [Key in keyof CSSProperties]: ReadonlyArray<CSSProperties[Key]>;
};

type Atomics<
  Conditions extends Record<string, string>,
  Properties extends AtomicProperty = AtomicProperty,
  Shorthands extends Record<string, Array<keyof Properties>> = Record<
    string,
    Array<keyof Properties>
  >,
> = {
  conditions: Conditions;
  defaultCondition: keyof Conditions;
  properties: Properties;
  shorthands?: Shorthands;
};

export declare function generateAtomics<Conditions extends Record<string, string>>(
  atomics: Atomics<Conditions> | ((themeConfig: ThemeArgs) => Atomics<Conditions>),
): GenerateAtomicsResult;

export declare function atomics(config: unknown): string;
