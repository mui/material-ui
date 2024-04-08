import type { BaseDefaultProps, Substitute, NoInfer } from './base';
import type { SxProp } from './sx';

export type PolymorphicComponentProps<
  BaseProps extends object,
  AsTarget extends React.ElementType | undefined,
  AsTargetProps extends object = AsTarget extends React.ElementType
    ? React.ComponentPropsWithRef<AsTarget>
    : BaseDefaultProps,
> = NoInfer<Omit<Substitute<BaseProps, AsTargetProps>, 'as' | 'component'>> & {
  as?: AsTarget;
  component?: AsTarget;
  sx?: SxProp;
  children?: React.ReactNode;
};

export interface PolymorphicComponent<BaseProps extends BaseDefaultProps>
  extends React.ForwardRefExoticComponent<BaseProps> {
  <AsTarget extends React.ElementType | undefined = undefined>(
    props: PolymorphicComponentProps<BaseProps, AsTarget>,
  ): JSX.Element;
}

declare const Box: PolymorphicComponent<{}>;

export default Box;
