import { PropTypes } from '..';
import { ExtendButtonBase, ExtendButtonBaseTypeMap } from '../ButtonBase';
import { OverrideProps } from '../OverridableComponent';

export type IconButtonTypeMap<
  P = {},
  D extends React.ElementType = 'button'
> = ExtendButtonBaseTypeMap<{
  props: P & {
    color?: PropTypes.Color;
    disableFocusRipple?: boolean;
    edge?: 'start' | 'end' | false;
    size?: 'small' | 'medium';
  };
  defaultComponent: D;
  classKey: IconButtonClassKey;
}>;

/**
 * Refer to the [Icons](/components/icons/) section of the documentation
 * regarding the available icon options.
 *
 * Demos:
 * - {@link https://material-ui.com/components/buttons Buttons}
 * - {@link https://material-ui.com/components/grid-list Grid List}
 *
 * API:
 * - {@link https://material-ui.com/api/IconButton IconButton API}
 * - inherits {@link https://material-ui.com/api//api/button-base ButtonBase API}
 */
declare const IconButton: ExtendButtonBase<IconButtonTypeMap>;

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

export type IconButtonProps<
  D extends React.ElementType = IconButtonTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<IconButtonTypeMap<P, D>, D>;

export default IconButton;
