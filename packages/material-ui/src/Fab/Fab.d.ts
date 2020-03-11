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
 *
 * Demos:
 * - {@link https://material-ui.com/components/floating-action-button Floating Action Button}
 *
 * API:
 * - {@link https://material-ui.com/api/Fab Fab API}
 * - inherits {@link https://material-ui.com/api//api/button-base ButtonBase API}
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
