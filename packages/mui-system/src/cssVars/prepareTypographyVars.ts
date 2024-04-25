type RecordPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : T[K] extends Record<string, any> ? K : never;
}[keyof T];

export type ExtractTypographyTokens<T> = { [K in RecordPropertyNames<T>]: string };

export default function prepareTypographyVars<T extends Record<string, any>>(typography: T) {
  const vars: Record<string, string | number> = {};
  const entries = Object.entries(typography);
  entries.forEach((entry) => {
    const [key, value] = entry;
    if (typeof value === 'object') {
      vars[key] =
        `${value.fontStyle ? `${value.fontStyle} ` : ''}${value.fontVariant ? `${value.fontVariant} ` : ''}${value.fontWeight ? `${value.fontWeight} ` : ''}${value.fontStretch ? `${value.fontStretch} ` : ''}${value.fontSize || ''}${value.lineHeight ? `/${value.lineHeight} ` : ''}${value.fontFamily || ''}`;
    }
  });
  return vars as ExtractTypographyTokens<T>;
}
