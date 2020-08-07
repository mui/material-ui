import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface DividerTypeMap<P = {}, D extends React.ElementType = 'hr'> {
  props: P & {
    /**
     * Absolutely position the element.
     */
    absolute?: boolean;
    /**
     * If `true`, a vertical divider will have the correct height when used in flex container.
     * (By default, a vertical divider will have a calculated height of `0px` if it is the child of a flex container.)
     */
    flexItem?: boolean;
    /**
     * If `true`, the divider will have a lighter color.
     */
    light?: boolean;
    /**
     * The divider orientation.
     */
    orientation?: 'horizontal' | 'vertical';
    /**
     * The variant to use.
     */
    variant?: 'fullWidth' | 'inset' | 'middle';
  };
  defaultComponent: D;
  classKey: DividerClassKey;
}

/**
 *
 * Demos:
 *
 * - [Dividers](https://material-ui.com/components/dividers/)
 * - [Lists](https://material-ui.com/components/lists/)
 *
 * API:
 *
 * - [Divider API](https://material-ui.com/api/divider/)
 */
declare const Divider: OverridableComponent<DividerTypeMap>;

export type DividerClassKey = 'root' | 'absolute' | 'inset' | 'light' | 'middle' | 'vertical';

export type DividerProps<
  D extends React.ElementType = DividerTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<DividerTypeMap<P, D>, D>;

export default Divider;
