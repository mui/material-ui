import * as React from 'react';
import { SxProps, SystemProps, StackBaseProps } from '@mui/system';
import { OverrideProps, OverridableComponent } from '../OverridableComponent';
import { Theme } from '../styles/createTheme';

export interface StackTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P &
    StackBaseProps &
    SystemProps<Theme> & {
      /**
       * The system prop, which allows defining system overrides as well as additional CSS styles.
       */
      sx?: SxProps<Theme>;
    };
  defaultComponent: D;
}
/**
 *
 * Demos:
 *
 * - [Stack](https://mui.com/material-ui/react-stack/)
 *
 * API:
 *
 * - [Stack API](https://mui.com/material-ui/api/stack/)
 */
declare const Stack: OverridableComponent<StackTypeMap>;

export type StackProps<
  D extends React.ElementType = StackTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<StackTypeMap<P, D>, D>;

export default Stack;
