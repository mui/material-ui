import { SxProps } from '@material-ui/system';
import { OverridableComponent, OverrideProps } from '@material-ui/core/OverridableComponent';
import { Theme } from '@material-ui/core/styles';
import { MasonryClasses } from './masonryClasses';

export interface MasonryTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * The content of the component, normally `MasonryItem`s.
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
    cols?: number;
    /**
     * The gap between items in px.
     * @default 10
     */
    gap?: number;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
  };
  defaultComponent: D;
}

declare const Masonry: OverridableComponent<MasonryTypeMap>;

export type MasonryProps<
  D extends React.ElementType = MasonryTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<MasonryTypeMap<P, D>, D>;

export default Masonry;
