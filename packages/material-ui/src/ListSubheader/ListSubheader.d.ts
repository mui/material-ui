import * as React from 'react';
import { StandardProps } from '..';
import { OverridableComponent, SimplifiedPropsOf } from '../OverridableComponent';

declare const ListSubheader: OverridableComponent<{
  props: React.HTMLAttributes<HTMLDivElement> & {
    color?: 'default' | 'primary' | 'inherit';
    disableGutters?: boolean;
    disableSticky?: boolean;
    inset?: boolean;
  };
  defaultComponent: React.ElementType<React.HTMLAttributes<HTMLDivElement>>;
  classKey: ListSubheaderClassKey;
}>;

export type ListSubheaderClassKey =
  | 'root'
  | 'colorPrimary'
  | 'colorInherit'
  | 'inset'
  | 'sticky'
  | 'gutters';

export type ListSubheaderProps = SimplifiedPropsOf<typeof ListSubheader>;

export default ListSubheader;
