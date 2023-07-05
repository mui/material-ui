import { OverrideProps } from '@mui/types';
import Button, { ButtonProps } from '../Button';
import { ApplyColorInversion } from '../styles/types';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';

export type MenuButtonSlot = 'root';

export interface MenuButtonSlots {
  /**
   * The component that renders the root.
   * @default 'button'
   */
  root?: React.ElementType;
}

export type MenuButtonSlotsAndSlotProps = CreateSlotsAndSlotProps<
  MenuButtonSlots,
  {
    root: SlotProps<'button', {}, MenuButtonOwnerState>;
  }
>;

export interface MenuButtonOwnerState extends ApplyColorInversion<MenuButtonProps> {
  active: boolean;
  open: boolean;
}

export interface MenuButtonTypeMap<P = {}, D extends React.ElementType = typeof Button> {
  props: P &
    MenuButtonSlotsAndSlotProps & {
      color?: ButtonProps['color'];
      disabled?: boolean;
      size?: ButtonProps['size'];
      variant?: ButtonProps['variant'];
    };
  defaultComponent: D;
}

export type MenuButtonProps<
  D extends React.ElementType = MenuButtonTypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<MenuButtonTypeMap<P, D>, D>;
