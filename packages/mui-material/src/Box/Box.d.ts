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
 * - [Box API](https://mui.com/components/box/#api)
 * NOTE - As a CSS utility component, Box also supports all system props.
 * You can use them as props directly on the component.
 * Props use same syntax as `sx`. Not all props are listed in the API section.
 *
 * Example:
 *
 * // For instance, a Box with margin-top:
 * <Box mt={2}>
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
 * - [Box API](https://mui.com/components/box/#api)
 * NOTE - As a CSS utility component, Box also supports all system props.
 * You can use them as props directly on the component.
 * Props use same syntax as `sx`. Not all props are listed in the API section.
 *
 * Example:
 *
 * // For instance, a Box with margin-top:
 * <Box mt={2}>
 */
export default Box;
