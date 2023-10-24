import type * as React from 'react';
import type { CSSObject } from './base';
import type { ThemeArgs } from './theme';
import type { SxProp } from './sx';

/**
 * @desc Utility type for getting props type of React component.
 * It takes `defaultProps` into account - making props with defaults optional.
 */
export type PropsOf<C extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>> =
  JSX.LibraryManagedAttributes<C, React.ComponentProps<C>>;

type Falsy = false | 0 | '' | null | undefined;

export interface StyledOptions<Props = any> {
  name?: string;
  slot?: string;
  skipSx?: boolean;
  skipVariantsResolver?: boolean;
  overridesResolver?: (
    props: Props,
    styles: Record<string, string>,
  ) => (string | Falsy) | Array<string | Falsy>;
}

export interface StyledCommonProps {
  // @TODO - Implement a way to infer types of the passed `as` component or html tag dynamically
  as?: React.ElementType;
  sx?: SxProp;
}

export interface StyledVariants<Props extends {}> {
  props: Partial<Props>;
  style: CSSObject<Props>;
}

export type StyledCssArgument<Props extends {}> = CSSObject<Props> & {
  variants?: Array<StyledVariants<Props>>;
};

export type StyledCallback<Props extends {}> = (buildArg: ThemeArgs) => StyledCssArgument<Props>;

export type StyledArgument<Props extends {}> = StyledCssArgument<Props> | StyledCallback<Props>;

export interface StyledComponent<
  ComponentProps extends {},
  SpecificComponentProps extends {} = {},
  JSXProps extends {} = {},
> extends React.FC<ComponentProps & SpecificComponentProps & JSXProps> {}

export interface CreateStyledComponent<
  ComponentProps extends {},
  SpecificComponentProps extends {} = {},
  JSXProps extends {} = {},
> {
  /**
   * @typeparam AdditionalProps  Additional props to add to your styled component
   */
  <AdditionalProps extends {} = {}>(
    ...styles: Array<StyledArgument<ComponentProps & SpecificComponentProps & AdditionalProps>>
  ): StyledComponent<ComponentProps & AdditionalProps, SpecificComponentProps, JSXProps>;
}

export type CreateStyledIndex = {
  [Tag in keyof JSX.IntrinsicElements]: CreateStyledComponent<
    JSX.IntrinsicElements[Tag],
    {},
    StyledCommonProps
  >;
};

export interface CreateStyled {
  <C extends React.ComponentClass<React.ComponentProps<C>>>(
    component: C,
    options?: StyledOptions,
  ): CreateStyledComponent<
    PropsOf<C> & {},
    {},
    {
      ref?: React.Ref<InstanceType<C>>;
    }
  >;

  <C extends React.ComponentType<React.ComponentProps<C>>>(
    component: C,
    options?: StyledOptions,
  ): CreateStyledComponent<PropsOf<C> & {}>;

  <Tag extends keyof JSX.IntrinsicElements = keyof JSX.IntrinsicElements>(
    tag: Tag,
    options?: StyledOptions,
  ): CreateStyledComponent<JSX.IntrinsicElements[Tag], {}, StyledCommonProps>;
}

declare const styled: CreateStyled & CreateStyledIndex;
export default styled;
