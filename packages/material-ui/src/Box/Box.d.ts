import { SxProps, SystemProps } from '@material-ui/system';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { Theme } from '../styles';

export interface BoxTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P &
    SystemProps & {
      children?: React.ReactNode;
      component?: React.ElementType;
      ref?: React.Ref<unknown>;
      sx?: SxProps<Theme>;
    };
  defaultComponent: D;
}

declare const Box: OverridableComponent<BoxTypeMap>;

export type BoxProps<D extends React.ElementType = BoxTypeMap['defaultComponent'], P = {}> =
  OverrideProps<BoxTypeMap<P, D>, D>;

export default Box;
