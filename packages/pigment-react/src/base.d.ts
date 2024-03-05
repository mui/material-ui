import type * as CSS from 'csstype';

export type CSSProperties = CSS.PropertiesFallback<number | string>;

export type CSSPropertiesMultiValue = {
  [K in keyof CSSProperties]: CSSProperties[K] | Array<Extract<CSSProperties[K], string>>;
};

export type CSSPropertiesWithCallback<Props extends object> = {
  [K in keyof CSSProperties]:
    | CSSProperties[K]
    | Array<Extract<CSSProperties[K], string>>
    | ((props: Props) => CSSProperties[K]);
};

export type CSSPseudos<Props extends object> = {
  [K in CSS.Pseudos]?: CSSObject<Props>;
};
export type CSSPseudosNoCallback = { [K in CSS.Pseudos]?: CSSObjectNoCallback };

export interface CSSOthersObject<Props extends object> {
  [selector: string]: CSSObject<Props>;
}

export interface CSSOthersObjectNoCallback {
  [selector: string]: CSSObjectNoCallback;
}

export type CSSObject<Props extends object> =
  | CSSPropertiesWithCallback<Props>
  | CSSPseudos<Props>
  | CSSOthersObject<Props>;

export type CSSObjectNoCallback =
  | CSSPropertiesMultiValue
  | CSSPseudosNoCallback
  | CSSOthersObjectNoCallback;
