import { PropTypes } from '..';
import { ExtendButtonBase } from '../ButtonBase';
import { SimplifiedPropsOf } from '../OverridableComponent';

declare const IconButton: ExtendButtonBase<{
  props: {
    color?: PropTypes.Color;
    disableFocusRipple?: boolean;
    edge?: 'start' | 'end' | false;
    size?: 'small' | 'medium';
  };
  defaultComponent: 'button';
  classKey: IconButtonClassKey;
}>;

export type IconButtonClassKey =
  | 'root'
  | 'edgeStart'
  | 'edgeEnd'
  | 'colorInherit'
  | 'colorPrimary'
  | 'colorSecondary'
  | 'disabled'
  | 'sizeSmall'
  | 'label';

export type IconButtonProps = SimplifiedPropsOf<typeof IconButton>;

export default IconButton;
