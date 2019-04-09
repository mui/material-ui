import { PropTypes } from '..';
import { ExtendButtonBase } from '../ButtonBase';
import { SimplifiedPropsOf } from '../OverridableComponent';

declare const Fab: ExtendButtonBase<{
  props: {
    color?: PropTypes.Color;
    disabled?: boolean;
    disableFocusRipple?: boolean;
    disableRipple?: boolean;
    href?: string;
    size?: 'small' | 'medium' | 'large';
    variant?: 'round' | 'extended';
  };
  defaultComponent: 'button';
  classKey: FabClassKey;
}>;

export type FabProps = SimplifiedPropsOf<typeof Fab>;

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
