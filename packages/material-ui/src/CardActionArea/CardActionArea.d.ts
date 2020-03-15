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
 *
 * Demos:
 * - {@link https://material-ui.com/components/cards/ Cards}
 *
 * API:
 * - {@link https://material-ui.com/api/card-action-area/ CardActionArea API}
 * - inherits {@link https://material-ui.com/api/button-base/ ButtonBase API}
 */
declare const CardActionArea: ExtendButtonBase<
  CardActionAreaTypeMap<{}, ButtonBaseTypeMap['defaultComponent']>
>;

export type CardActionAreaClassKey = 'root' | 'focusVisible' | 'focusHighlight';

export type CardActionAreaProps<
  D extends React.ElementType = ButtonBaseTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<CardActionAreaTypeMap<P, D>, D>;

export default CardActionArea;
