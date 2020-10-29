import * as React from 'react';

export type ClassNameMap<ClassKey extends string = string> = Record<ClassKey, string>;

export interface StyledComponentProps<ClassKey extends string = string> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<ClassNameMap<ClassKey>>;
  innerRef?: React.Ref<any>;
}

/**
 * Helper type for conform (describeConformance) components that are decorated with `withStyles
 * However, we don't declare classes on this type.
 * It is recommended to declare them manually with an interface so that each class can have a separate JSDOC.
 */
export type StandardProps<C, Removals extends keyof C = never> = Omit<C, 'classes' | Removals> &
  // each component declares it's classes in a separate interface for proper JSDOC
  StyledComponentProps<never> & {
    ref?: C extends { ref?: infer RefType } ? RefType : React.Ref<unknown>;
    // TODO: Remove implicit props. Up to each component.
    className?: string;
    style?: React.CSSProperties;
  };

export type NamedMuiComponent = React.ComponentType & { muiName: string };

export interface NamedMuiElement {
  type: NamedMuiComponent;
  props: StandardProps<{}>;
  key: string | number | null;
}

export default function isMuiElement(element: any, muiNames: string[]): element is NamedMuiElement;
