import { ButtonBaseTypeMap, ExtendButtonBase, ExtendButtonBaseTypeMap } from '../ButtonBase';
import { OverrideProps } from '../OverridableComponent';

export type CardActionAreaTypeMap<P, D extends React.ElementType> = ExtendButtonBaseTypeMap<{
  props: P & {
    focusVisibleClassName?: string;
  };
  defaultComponent: D;
  classKey: CardActionAreaClassKey;
}>;

/**
 *
 * Demos:
 *
 * - [Cards](https://mui.com/components/cards/)
 *
 * API:
 *
 * - [CardActionArea API](https://mui.com/api/card-action-area/)
 * - inherits [ButtonBase API](https://mui.com/api/button-base/)
 */
declare const CardActionArea: ExtendButtonBase<CardActionAreaTypeMap<
  {},
  ButtonBaseTypeMap['defaultComponent']
>>;

export type CardActionAreaClassKey = 'root' | 'focusVisible' | 'focusHighlight';

export type CardActionAreaProps<
  D extends React.ElementType = ButtonBaseTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<CardActionAreaTypeMap<P, D>, D>;

export default CardActionArea;
