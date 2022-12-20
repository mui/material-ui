import { OverrideProps } from '@mui/types';
import { SxProps, SystemProps } from '@mui/system';
import { Theme } from '../styles/types';

export type BoxSlot = 'root';

export interface BoxTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P &
    SystemProps<Theme> & {
      children?: React.ReactNode;
      /**
       * The component used for the root node.
       * Either a string to use a HTML element or a component.
       */
      component?: React.ElementType;
      ref?: React.Ref<unknown>;
      /**
       * The system prop that allows defining system overrides as well as additional CSS styles.
       */
      sx?: SxProps<Theme>;
    };
  defaultComponent: D;
}

export type BoxProps<
  D extends React.ElementType = BoxTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<BoxTypeMap<P, D>, D>;
