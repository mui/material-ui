import { OverridableStringUnion } from '@material-ui/types';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface DividerPropsVariantOverrides {}
export type DividerVariantDefaults = Record<'fullWidth' | 'inset' | 'middle', true>;

export interface DividerTypeMap<P = {}, D extends React.ElementType = 'hr'> {
  props: P & {
    /**
     * Absolutely position the element.
     * @default false
     */
    absolute?: boolean;
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: {
      root?: string;
      absolute?: string;
      inset?: string;
      fullWidth?: string;
      light?: string;
      middle?: string;
      vertical?: string;
      flexItem?: string;
      withChildren?: string;
      withChildrenVertical?: string;
      textAlignRight?: string;
      textAlignLeft?: string;
      wrapper?: string;
      wrapperVertical?: string;
    };
    /**
     * If `true`, a vertical divider will have the correct height when used in flex container.
     * (By default, a vertical divider will have a calculated height of `0px` if it is the child of a flex container.)
     * @default false
     */
    flexItem?: boolean;
    /**
     * If `true`, the divider will have a lighter color.
     * @default false
     */
    light?: boolean;
    /**
     * The divider orientation.
     * @default 'horizontal'
     */
    orientation?: 'horizontal' | 'vertical';
    /**
     * The text alignment.
     * @default 'center'
     */
    textAlign?: 'center' | 'right' | 'left';
    /**
     * The variant to use.
     * @default 'fullWidth'
     */
    variant?: OverridableStringUnion<DividerVariantDefaults, DividerPropsVariantOverrides>;
  };
  defaultComponent: D;
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

export type DividerClassKey = keyof NonNullable<DividerTypeMap['props']['classes']>;

export type DividerProps<
  D extends React.ElementType = DividerTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<DividerTypeMap<P, D>, D>;

export default Divider;
