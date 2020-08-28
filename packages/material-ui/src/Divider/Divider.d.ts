import { OverridableStringUnion } from '@material-ui/types';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface DividerPropsVariantOverrides {}
export type DividerVariantDefaults = Record<'fullWidth' | 'inset' | 'middle', true>;

export interface DividerTypeMap<P = {}, D extends React.ElementType = 'hr'> {
  props: P & {
    /**
     * Absolutely position the element.
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
      /** Styles applied to the root element. */
      root?: string;
      /** Styles applied to the root element if `absolute={true}`. */
      absolute?: string;
      /** Styles applied to the root element if `variant="inset"`. */
      inset?: string;
      /** Styles applied to the root element if `variant="fullWidth"`. */
      fullWidth?: string;
      /** Styles applied to the root element if `light={true}`. */
      light?: string;
      /** Styles applied to the root element if `variant="middle"`. */
      middle?: string;
      /** Styles applied to the root element if `orientation="vertical"`. */
      vertical?: string;
      /** Styles applied to the root element if `flexItem={true}`. */
      flexItem?: string;
      /** Styles applied to the root element if divider have text. */
      withChildren?: string;
      /** Styles applied to the root element if divider have text and `orientation="vertical"`. */
      withChildrenVertical?: string;
      /** Styles applied to the root element if `textAlign="right" orientation="horizontal"`. */
      textAlignRight?: string;
      /** Styles applied to the root element if `textAlign="left" orientation="horizontal"`. */
      textAlignLeft?: string;
      /** Styles applied to the span children element if `orientation="horizontal"`. */
      wrapper?: string;
      /** Styles applied to the span children element if `orientation="vertical"`. */
      wrapperVertical?: string;
    };
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
     * The text alignment.
     */
    textAlign?: 'center' | 'right' | 'left';
    /**
     * The variant to use.
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
