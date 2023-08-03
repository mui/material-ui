import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { ColorPaletteProp, SxProps, VariantProp, ApplyColorInversion } from '../styles/types';
import { SlotProps, CreateSlotsAndSlotProps } from '../utils/types';

export type MenuButtonSlot = 'root';

export interface MenuButtonSlots {
  /**
   * The component that renders the root.
   * @default 'button'
   */
  root?: React.ElementType;
  /**
   * The component that renders the start decorator.
   * @default 'span'
   */
  startDecorator?: React.ElementType;
  /**
   * The component that renders the end decorator.
   * @default 'span'
   */
  endDecorator?: React.ElementType;
  /**
   * The component that renders the loading indicator center.
   * @default 'span'
   */
  loadingIndicatorCenter?: React.ElementType;
}

export interface MenuButtonPropsVariantOverrides {}
export interface MenuButtonPropsColorOverrides {}
export interface MenuButtonPropsSizeOverrides {}

export type MenuButtonSlotsAndSlotProps = CreateSlotsAndSlotProps<
  MenuButtonSlots,
  {
    root: SlotProps<'button', {}, MenuButtonOwnerState>;
    startDecorator: SlotProps<'span', {}, MenuButtonOwnerState>;
    endDecorator: SlotProps<'span', {}, MenuButtonOwnerState>;
    loadingIndicatorCenter: SlotProps<'span', {}, MenuButtonOwnerState>;
  }
>;

export interface MenuButtonOwnerState extends ApplyColorInversion<MenuButtonProps> {
  active: boolean;
  open: boolean;
}

export interface MenuButtonTypeMap<P = {}, D extends React.ElementType = 'button'> {
  props: P &
    MenuButtonSlotsAndSlotProps & {
      /**
       * The color of the component. It supports those theme colors that make sense for this component.
       * @default 'neutral'
       */
      color?: OverridableStringUnion<ColorPaletteProp, MenuButtonPropsColorOverrides>;
      /**
       * If `true`, the component is disabled.
       * @default false
       */
      disabled?: boolean;
      /**
       * Element placed after the children.
       */
      endDecorator?: React.ReactNode;
      /**
       * If `true`, the button will take up the full width of its container.
       * @default false
       */
      fullWidth?: boolean;
      /**
       * The size of the component.
       * @default 'md'
       */
      size?: OverridableStringUnion<'sm' | 'md' | 'lg', MenuButtonPropsSizeOverrides>;
      /**
       * Element placed before the children.
       */
      startDecorator?: React.ReactNode;
      /**
       * The system prop that allows defining system overrides as well as additional CSS styles.
       */
      sx?: SxProps;
      /**
       * @default 0
       */
      tabIndex?: NonNullable<React.HTMLAttributes<any>['tabIndex']>;
      /**
       * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
       * @default 'outlined'
       */
      variant?: OverridableStringUnion<VariantProp, MenuButtonPropsVariantOverrides>;
      /**
       * If `true`, the loading indicator is shown.
       * @default false
       */
      loading?: boolean;
      /**
       * The node should contain an element with `role="progressbar"` with an accessible name.
       * By default we render a `CircularProgress` that is labelled by the button itself.
       * @default <CircularProgress />
       */
      loadingIndicator?: React.ReactNode;
      /**
       * The loading indicator can be positioned on the start, end, or the center of the button.
       * @default 'center'
       */
      loadingPosition?: 'start' | 'end' | 'center';
    };
  defaultComponent: D;
}

export type MenuButtonProps<
  D extends React.ElementType = MenuButtonTypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<MenuButtonTypeMap<P, D>, D>;
