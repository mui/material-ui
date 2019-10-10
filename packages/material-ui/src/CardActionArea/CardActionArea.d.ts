import { ButtonBaseTypeMap, ExtendButtonBase, ExtendButtonBaseTypeMap } from '../ButtonBase';
import { OverrideProps } from '../OverridableComponent';

export type CardActionAreaTypeMap<P, D extends React.ElementType> = ExtendButtonBaseTypeMap<{
  props: P & {
    focusVisibleClassName?: string;
  };
  component: D;
  classKey: CardActionAreaClassKey;
}>;

declare const CardActionArea: ExtendButtonBase<
  CardActionAreaTypeMap<{}, ButtonBaseTypeMap['component']>
>;

export type CardActionAreaClassKey = 'root' | 'focusVisible' | 'focusHighlight';

export type CardActionAreaProps<
  D extends React.ElementType = ButtonBaseTypeMap['component'],
  P = {}
> = OverrideProps<CardActionAreaTypeMap<P, D>, D>;

export default CardActionArea;
