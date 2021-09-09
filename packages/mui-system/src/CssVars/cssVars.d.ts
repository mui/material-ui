export function toCssVars(value: string | number): string;

type FilterByValueType<T, ValueType> = {
  [Property in keyof T as T[Property] extends ValueType ? Property : never]: T[Property];
};

export function CssVarsBuilder<T>(object: T): {
  cssVars: Record<string, string | number>;
  cssVarsMap: Record<keyof FilterByValueType<T, string | number>, string>;
};
