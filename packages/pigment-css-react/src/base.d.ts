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

export type BaseDefaultProps = object;

export type NoInfer<T> = [T][T extends any ? 0 : never];
type FastOmit<T extends object, U extends string | number | symbol> = {
  [K in keyof T as K extends U ? never : K]: T[K];
};

export type Substitute<A extends object, B extends object> = FastOmit<A, keyof B> & B;

export type PolymorphicComponentProps<
  SxProp,
  BaseProps extends object,
  AsTarget extends React.ElementType | undefined,
  AsTargetProps extends object = AsTarget extends React.ElementType
    ? React.ComponentPropsWithRef<AsTarget>
    : BaseDefaultProps,
> = NoInfer<Omit<Substitute<BaseProps, AsTargetProps>, 'as'>> & {
  as?: AsTarget;
  sx?: SxProp;
  children?: React.ReactNode;
};

export interface PolymorphicComponent<SxProp, BaseProps extends BaseDefaultProps>
  extends React.ForwardRefExoticComponent<BaseProps> {
  <AsTarget extends React.ElementType | undefined = undefined>(
    props: PolymorphicComponentProps<SxProp, BaseProps, AsTarget>,
  ): JSX.Element;
}
