import * as React from 'react';
import { Breakpoint } from '../styles/createBreakpoints';
import { OverridableComponent, SimplifiedPropsOf, OverrideProps } from '../OverridableComponent';

export type StackItemsAlignment = 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';

export type StackContentAlignment =
  | 'stretch'
  | 'center'
  | 'flex-start'
  | 'flex-end'
  | 'space-between'
  | 'space-around';

export type StackDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';

export type StackSpacing = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type StackJustification =
  | 'flex-start'
  | 'center'
  | 'flex-end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

export type StackWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

export type StackClassKey =
  | 'root'
  | 'container'
  | 'item'
  | 'direction-column'
  | 'direction-column-reverse'
  | 'direction-row-reverse'
  | 'wrap-nowrap'
  | 'wrap-wrap-reverse'
  | 'align-items-center'
  | 'align-items-flex-start'
  | 'align-items-flex-end'
  | 'align-items-baseline'
  | 'align-content-center'
  | 'align-content-flex-start'
  | 'align-content-flex-end'
  | 'align-content-space-between'
  | 'align-content-space-around'
  | 'justify-center'
  | 'justify-flex-end'
  | 'justify-space-between'
  | 'justify-space-around'
  | 'spacing-1'
  | 'spacing-2'
  | 'spacing-3'
  | 'spacing-4'
  | 'spacing-5'
  | 'spacing-6'
  | 'spacing-7'
  | 'spacing-8'
  | 'spacing-9'
  | 'spacing-10';

export interface StackTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    alignContent?: StackContentAlignment;
    alignItems?: StackItemsAlignment;
    direction?: StackDirection;
    item?: boolean;
    justify?: StackJustification;
    spacing?: StackSpacing;
    wrap?: StackWrap;
    zeroMinWidth?: boolean;
  };
  defaultComponent: D;
  classKey: StackClassKey;
}

declare const Stack: OverridableComponent<StackTypeMap>;

export type StackProps<
  D extends React.ElementType = StackTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<StackTypeMap<P, D>, D>;

export default Stack;
