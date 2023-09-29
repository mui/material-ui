import type * as CSS from 'csstype';

export interface ThemeArgs {}

export type CSSProperties = CSS.PropertiesFallback<number | string>;

export type CSSPropertiesWithMultiValues = {
  [K in keyof CSSProperties]: CSSProperties[K] | Array<Extract<CSSProperties[K], string>>;
};

export type CSSPropertiesWithPropsAndCallback<Props extends {}> = {
  [K in keyof CSSProperties]:
    | CSSPropertiesWithMultiValues[K]
    | ((props: Props) => CSSProperties[K]);
};

export type CSSPseudos<Props extends {}> = { [K in CSS.Pseudos]?: CSSObject<Props> };
export type CSSPseudosNoCallback = { [K in CSS.Pseudos]?: CSSObjectNoCallback };

export interface CSSOthersObject<Props extends {}> {
  [selector: string]: CSSObject<Props>;
}

export interface CSSOthersObjectNoCallback {
  [selector: string]: CSSObjectNoCallback;
}

export type CSSObject<Props extends {}> =
  | CSSPropertiesWithPropsAndCallback<Props>
  | CSSPseudos<Props>
  | CSSOthersObject<Props>;

export type CSSObjectNoCallback =
  | CSSPropertiesWithMultiValues
  | CSSPseudosNoCallback
  | CSSOthersObjectNoCallback;
