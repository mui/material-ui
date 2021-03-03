import * as React from 'react';
import { SystemProps, SxProps } from '@material-ui/system';
import { OverrideProps, OverridableComponent } from '../OverridableComponent';
import { Theme } from '../styles/createMuiTheme';

export type StackSpacing = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface StackTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P &
    SystemProps & {
      children?: React.ReactNode;
      component?: React.ElementType;
      ref?: React.Ref<unknown>;
      direction?: 'row' | 'column';
      spacing?: StackSpacing;
      sx?: SxProps<Theme>;
    };
  defaultComponent: D;
}
/**
 *
 * Demos:
 *
 * - [Stack](https://material-ui.com/components/stack/)
 *
 * API:
 *
 * - [Stack API](https://material-ui.com/api/stack/)
 */
declare const Stack: OverridableComponent<StackTypeMap>;

export type StackProps<
  D extends React.ElementType = StackTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<StackTypeMap<P, D>, D>;

export default Stack;
