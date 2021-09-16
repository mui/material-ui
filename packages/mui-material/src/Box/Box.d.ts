import { SxProps, SystemProps } from '@mui/system';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { Theme } from '../styles';

export interface BoxTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P &
    SystemProps<Theme> & {
      children?: React.ReactNode;
      component?: React.ElementType;
      ref?: React.Ref<unknown>;
      sx?: SxProps<Theme>;
    };
  defaultComponent: D;
}
/**
 *
 * Demos:
 *
 * - [Box](https://mui.com/components/box/)
 *
 * API:
 *
 * - [Box API](https://mui.com/api/box/)
 */
declare const Box: OverridableComponent<BoxTypeMap>;

export type BoxProps<
  D extends React.ElementType = BoxTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<BoxTypeMap<P, D>, D>;

/**
 *
 * Demos:
 *
 * - [Box](https://mui.com/components/box/)
 *
 * API:
 *
 * - [Box API](https://mui.com/api/box/)
 */
export default Box;
