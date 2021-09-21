import { SxProps } from '@mui/system';
import { OverridableComponent, OverrideProps } from '@mui/material/OverridableComponent';
import { Theme } from '@mui/material/styles';
import { MasonryItemClasses } from './masonryItemClasses';

export interface MasonryItemTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * The content of the component, normally an `<img />` or a `<div />`. It should be only one element.
     */
    children: NonNullable<React.ReactElement>;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<MasonryItemClasses>;
    /**
     * The initial height of the component in px. This is provided for server-side rendering.
     */
    defaultHeight?: number;
    /**
     * The number of columns taken up by the component
     * @default 1
     */
    columnSpan?: number;
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
 * - [Masonry](https://mui.com/components/masonry/)
 *
 * API:
 *
 * - [MasonryItem API](https://mui.com/api/masonry-item/)
 */
declare const MasonryItem: OverridableComponent<MasonryItemTypeMap>;

export type MasonryItemProps<
  D extends React.ElementType = MasonryItemTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<MasonryItemTypeMap<P, D>, D>;

export default MasonryItem;
