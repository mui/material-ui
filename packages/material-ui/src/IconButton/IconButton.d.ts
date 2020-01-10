import { PropTypes } from '..';
import { ExtendButtonBase, ExtendButtonBaseTypeMap } from '../ButtonBase';
import { OverrideProps } from '../OverridableComponent';

export type IconButtonTypeMap<
  P = {},
  D extends React.ElementType = 'button'
> = ExtendButtonBaseTypeMap<{
  props: P & {
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'default' | 'inherit';
    disableFocusRipple?: boolean;
    edge?: 'start' | 'end' | false;
    size?: 'small' | 'medium';
  };
  defaultComponent: D;
  classKey: IconButtonClassKey;
}>;

declare const IconButton: ExtendButtonBase<IconButtonTypeMap>;

export type IconButtonClassKey =
  | 'root'
  | 'edgeStart'
  | 'edgeEnd'
  | 'colorInherit'
  | 'colorPrimary'
  | 'colorSecondary'
  | 'colorWarning'
  | 'colorInfo'
  | 'colorSuccess'
  | 'disabled'
  | 'sizeSmall'
  | 'label';

export type IconButtonProps<
  D extends React.ElementType = IconButtonTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<IconButtonTypeMap<P, D>, D>;

export default IconButton;
