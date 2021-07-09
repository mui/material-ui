import { SxProps } from '@material-ui/system';
import { OverridableComponent, OverrideProps } from '@material-ui/core/OverridableComponent';
import { Theme } from '@material-ui/core/styles';
import { MasonryItemClasses } from './masonryItemClasses';

export interface MasonryItemTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * The content of the component, normally an `<img>` or a `<div>`.
     */
    children: NonNullable<React.ReactNode>;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<MasonryItemClasses>;
    /**
     * The system prop, which allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
  };
  defaultComponent: D;
}

declare const MasonryItem: OverridableComponent<MasonryItemTypeMap>;

export type MasonryItemProps<
  D extends React.ElementType = MasonryItemTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<MasonryItemTypeMap<P, D>, D>;

export default MasonryItem;
