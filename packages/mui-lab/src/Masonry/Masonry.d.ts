import { ResponsiveStyleValue, SxProps } from '@mui/system';
import { OverridableComponent, OverrideProps } from '@mui/material/OverridableComponent';
import { Theme } from '@mui/material/styles';
import { MasonryClasses } from './masonryClasses';

export interface MasonryTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * The content of the component.
     */
    children: NonNullable<React.ReactNode>;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<MasonryClasses>;
    /**
     * Number of columns.
     * @default 4
     */
    columns?: ResponsiveStyleValue<number | string>;
    /**
     * The default number of columns of the component. This is provided for server-side rendering.
     */
    defaultColumns?: number;
    /**
     * The default height of the component in px. This is provided for server-side rendering.
     */
    defaultHeight?: number;
    /**
     * The default spacing of the component. Like `spacing`, it is a factor of the theme's spacing. This is provided for server-side rendering.
     */
    defaultSpacing?: number;
    /**
     * Defines the space between children. It is a factor of the theme's spacing.
     * @default 1
     */
    spacing?: ResponsiveStyleValue<number | string>;
    /**
     * Allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
  };
  defaultComponent: D;
}
/**
 *
 * Demos:
 *
 * - [Masonry](https://mui.com/material-ui/react-masonry/)
 *
 * API:
 *
 * - [Masonry API](https://mui.com/material-ui/api/masonry/)
 */
declare const Masonry: OverridableComponent<MasonryTypeMap>;

export type MasonryProps<
  D extends React.ElementType = MasonryTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<MasonryTypeMap<P, D>, D>;

export default Masonry;
