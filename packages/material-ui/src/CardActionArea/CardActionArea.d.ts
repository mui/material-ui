import { ButtonBaseTypeMap, ExtendButtonBase, ExtendButtonBaseTypeMap } from '../ButtonBase';
import { OverrideProps } from '../OverridableComponent';

export type CardActionAreaTypeMap<P, D extends React.ElementType> = ExtendButtonBaseTypeMap<{
  props: P & {
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: {
      /** Styles applied to the root element. */
      root?: string;
      /** Pseudo-class applied to the ButtonBase root element if the action area is keyboard focused. */
      focusVisible?: string;
      /** Styles applied to the overlay that covers the action area when it is keyboard focused. */
      focusHighlight?: string;
    };
    focusVisibleClassName?: string;
  };
  defaultComponent: D;
}>;

/**
 *
 * Demos:
 *
 * - [Cards](https://material-ui.com/components/cards/)
 *
 * API:
 *
 * - [CardActionArea API](https://material-ui.com/api/card-action-area/)
 * - inherits [ButtonBase API](https://material-ui.com/api/button-base/)
 */
declare const CardActionArea: ExtendButtonBase<CardActionAreaTypeMap<
  {},
  ButtonBaseTypeMap['defaultComponent']
>>;

export type CardActionAreaClassKey = keyof NonNullable<CardActionAreaProps['classes']>;

export type CardActionAreaProps<
  D extends React.ElementType = ButtonBaseTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<CardActionAreaTypeMap<P, D>, D>;

export default CardActionArea;
