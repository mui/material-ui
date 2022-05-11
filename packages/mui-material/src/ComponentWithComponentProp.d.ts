import * as React from 'react';
import { CommonProps } from './OverridableComponent';

export type Component<Props = any> = React.ElementType<Props>;
// type Example = Component<{ prop: string }>

export type PropsWithComponentProp<Props = {}, Type extends Component = Component> = Props &
  CommonProps &
  Omit<React.ComponentProps<Type>, 'component' | keyof Props> & {
    component?: Type;
  };
// type Example = PropsWithComponentProp<{ prop: string }, Component<{ prop2: string }>>["component"];
// type Example = PropsWithComponentProp<{ prop: string }, Component<{ prop2: string }>>["prop"];
// type Example = PropsWithComponentProp<{ prop: string }, Component<{ prop2: string }>>["prop2"];
// type Example = PropsWithComponentProp<{ prop: string }, "a">["component"];
// type Example = PropsWithComponentProp<{ prop: string }, "a">["href"];

export type ComponentWithComponentProp<Props, DefaultType extends Component> = {
  <Type extends Component>(
    props: PropsWithComponentProp<Props, Type> & { component: Type },
  ): JSX.Element;
  (props: PropsWithComponentProp<Props, DefaultType>): JSX.Element;
};
// type Example = ComponentWithComponentProp<{ prop: string }, "button">;
