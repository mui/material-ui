import * as React from 'react';
import { PropTypes } from '..';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface ChipTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * Avatar element.
     */
    avatar?: React.ReactElement;
    /**
     * This prop isn't supported.
     * Use the `component` prop if you need to change the children structure.
     */
    children?: null;
    /**
     * If `true`, the chip will appear clickable, and will raise when pressed,
     * even if the onClick prop is not defined.
     * If false, the chip will not be clickable, even if onClick prop is defined.
     * This can be used, for example,
     * along with the component prop to indicate an anchor Chip is clickable.
     */
    clickable?: boolean;
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     */
    color?: Exclude<PropTypes.Color, 'inherit'>;
    /**
     * Override the default delete icon element. Shown only if `onDelete` is set.
     */
    deleteIcon?: React.ReactElement;
    /**
     * If `true`, the chip should be displayed in a disabled state.
     */
    disabled?: boolean;
    /**
     * Icon element.
     */
    icon?: React.ReactElement;
    /**
     * The content of the label.
     */
    label?: React.ReactNode;
    /**
     * Callback function fired when the delete icon is clicked.
     * If set, the delete icon will be shown.
     */
    onDelete?: React.EventHandler<any>;
    /**
     * The size of the chip.
     */
    size?: 'small' | 'medium';
    /**
     * The variant to use.
     */
    variant?: 'default' | 'outlined';
  };
  defaultComponent: D;
  classKey: ChipClassKey;
}

/**
 * Chips represent complex entities in small blocks, such as a contact.
 * Demos:
 *
 * - [Chips](https://material-ui.com/components/chips/)
 *
 * API:
 *
 * - [Chip API](https://material-ui.com/api/chip/)
 */
declare const Chip: OverridableComponent<ChipTypeMap>;

export type ChipClassKey =
  | 'root'
  | 'sizeSmall'
  | 'colorPrimary'
  | 'colorSecondary'
  | 'disabled'
  | 'clickable'
  | 'clickableColorPrimary'
  | 'clickableColorSecondary'
  | 'deletable'
  | 'deletableColorPrimary'
  | 'deletableColorSecondary'
  | 'outlined'
  | 'outlinedPrimary'
  | 'outlinedSecondary'
  | 'avatar'
  | 'avatarSmall'
  | 'avatarColorPrimary'
  | 'avatarColorSecondary'
  | 'icon'
  | 'iconSmall'
  | 'iconColorPrimary'
  | 'iconColorSecondary'
  | 'label'
  | 'labelSmall'
  | 'deleteIcon'
  | 'deleteIconSmall'
  | 'deleteIconColorPrimary'
  | 'deleteIconColorSecondary'
  | 'deleteIconOutlinedColorPrimary'
  | 'deleteIconOutlinedColorSecondary';

export type ChipProps<
  D extends React.ElementType = ChipTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<ChipTypeMap<P, D>, D>;

export default Chip;
