import { PropTypes } from '..';
import { ExtendButtonBase, ExtendButtonBaseTypeMap } from '../ButtonBase';
import { OverrideProps } from '../OverridableComponent';

export type FabTypeMap<P = {}, D extends React.ElementType = 'button'> = ExtendButtonBaseTypeMap<{
  props: P & {
    color?: PropTypes.Color;
    disableFocusRipple?: boolean;
    href?: string;
    size?: 'small' | 'medium' | 'large';
    variant?: 'round' | 'extended';
  };
  defaultComponent: D;
  classKey: FabClassKey;
}>;

/**
 *
 * Demos:
 *
 * - [Floating Action Button](https://material-ui.com/components/floating-action-button/)
 *
 * API:
 *
 * - [Fab API](https://material-ui.com/api/fab/)
 * - inherits [ButtonBase API](https://material-ui.com/api/button-base/)
 */
declare const Fab: ExtendButtonBase<FabTypeMap>;

export type FabProps<
  D extends React.ElementType = FabTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<FabTypeMap<P, D>, D>;

export type FabClassKey =
  | 'root'
  | 'label'
  | 'primary'
  | 'secondary'
  | 'extended'
  | 'focusVisible'
  | 'disabled'
  | 'colorInherit'
  | 'sizeSmall'
  | 'sizeMedium';

export default Fab;
