import * as React from 'react';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface ContainerTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    disableGutters?: boolean;
    fixed?: boolean;
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  };
  defaultComponent: D;
  classKey: ContainerClassKey;
}

declare const Container: OverridableComponent<ContainerTypeMap>;

export type ContainerClassKey =
  | 'root'
  | 'disableGutters'
  | 'fixed'
  | 'maxWidthXs'
  | 'maxWidthSm'
  | 'maxWidthMd'
  | 'maxWidthLg'
  | 'maxWidthXl';

export type ContainerProps<
  D extends React.ElementType = ContainerTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<ContainerTypeMap<P, D>, D>;

export default Container;
