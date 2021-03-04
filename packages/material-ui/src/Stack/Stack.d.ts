import * as React from 'react';
import { SystemProps, SxProps } from '@material-ui/system';
import { OverrideProps, OverridableComponent } from '../OverridableComponent';
import { Theme } from '../styles/createMuiTheme';

export interface StackTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P &
    SystemProps & {
      /**
       * The content of the component.
       */
      children?: React.ReactNode;
      component?: React.ElementType;
      ref?: React.Ref<unknown>;
      /**
       * Defines the `flex-direction` style property.
       * It is applied for all screen sizes.
       * @default 'column'
       */
      direction?: 'row' | 'column';
      /**
       * Defines the space between immediate children.
       */
      spacing?: number;
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
