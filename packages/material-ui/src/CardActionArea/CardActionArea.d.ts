import { ButtonBaseTypeMap, ExtendButtonBase } from '../ButtonBase';
import { SimplifiedPropsOf } from '../OverridableComponent';

declare const CardActionArea: ExtendButtonBase<{
  props: {
    focusVisibleClassName?: string;
  };
  defaultComponent: ButtonBaseTypeMap['defaultComponent'];
  classKey: CardActionAreaClassKey;
}>;

export type CardActionAreaClassKey = 'root' | 'focusVisible' | 'focusHighlight';

export type CardActionAreaProps = SimplifiedPropsOf<typeof CardActionArea>;

export default CardActionArea;
