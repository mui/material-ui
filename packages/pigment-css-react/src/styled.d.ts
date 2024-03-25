import type * as React from 'react';
import type { CSSObject } from './base';
import type { ThemeArgs } from './theme';
import type { SxProp } from './sx';
import { Primitve } from './keyframes';

type Falsy = false | 0 | '' | null | undefined;

type BaseDefaultProps = object;

export type NoInfer<T> = [T][T extends any ? 0 : never];
type FastOmit<T extends object, U extends string | number | symbol> = {
  [K in keyof T as K extends U ? never : K]: T[K];
};
export type Substitute<A extends object, B extends object> = FastOmit<A, keyof B> & B;

export interface StyledVariants<Props extends BaseDefaultProps> {
  props: Partial<Props> | ((props: Props) => boolean);
  style: CSSObject<Props>;
}

export type StyledCssArgument<Props extends BaseDefaultProps> = CSSObject<Props> & {
  variants?: Array<StyledVariants<Props>>;
};

export type StyledCallback<Props extends BaseDefaultProps> = (
  buildArg: ThemeArgs,
) => StyledCssArgument<Props>;

export type StyledArgument<Props extends BaseDefaultProps> =
  | StyledCssArgument<Props>
  | StyledCallback<Props>;

export type PolymorphicComponentProps<
  BaseProps extends object,
  AsTarget extends React.ElementType | undefined,
  AsTargetProps extends object = AsTarget extends React.ElementType
    ? React.ComponentPropsWithRef<AsTarget>
    : BaseDefaultProps,
> = NoInfer<Omit<Substitute<BaseProps, AsTargetProps>, 'as'>> & {
  as?: AsTarget;
  sx?: SxProp;
};

export interface PolymorphicComponent<BaseProps extends BaseDefaultProps>
  extends React.ForwardRefExoticComponent<BaseProps> {
  <AsTarget extends React.ElementType | undefined = undefined>(
    props: PolymorphicComponentProps<BaseProps, AsTarget>,
  ): JSX.Element;
}

export interface StyledComponent<Props extends BaseDefaultProps = BaseDefaultProps>
  extends PolymorphicComponent<Props> {
  defaultProps?: Partial<Props> | undefined;
  toString: () => string;
}

export interface CreateStyledComponent<
  Component extends React.ElementType,
  OuterProps extends object,
> {
  (
    styles: TemplateStringsArray,
    ...args: Array<(options: ThemeArgs) => Primitve | Primitve | React.ComponentClass>
  ): StyledComponent<OuterProps> & (Component extends string ? BaseDefaultProps : Component);

  /**
   * @typeparam Props: Additional props to add to the styled component
   */
  <Props extends BaseDefaultProps = BaseDefaultProps>(
    ...styles: Array<StyledArgument<OuterProps & Props>>
  ): StyledComponent<Substitute<OuterProps, Props>> &
    (Component extends string ? BaseDefaultProps : Component);
}

export interface StyledOptions<Props extends BaseDefaultProps = BaseDefaultProps> {
  name?: string;
  slot?: string;
  skipSx?: boolean;
  skipVariantsResolver?: boolean;
  shouldForwardProp?: (propName: string) => boolean;
  overridesResolver?: (
    props: any | Props,
    styles: Record<string, string>,
  ) => (string | Falsy) | Array<string | Falsy>;
}

export interface CreateStyled {
  <
    TagOrComponent extends React.ElementType,
    FinalProps extends BaseDefaultProps = React.ComponentPropsWithRef<TagOrComponent>,
  >(
    tag: TagOrComponent,
    options?: StyledOptions,
  ): CreateStyledComponent<TagOrComponent, FinalProps>;
}

export type CreateStyledIndex = {
  [Key in keyof JSX.IntrinsicElements]: CreateStyledComponent<Key, JSX.IntrinsicElements[Key]>;
};

declare const styled: CreateStyled & CreateStyledIndex;
export default styled;
