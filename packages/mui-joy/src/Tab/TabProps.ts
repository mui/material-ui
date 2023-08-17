import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { ColorPaletteProp, SxProps, VariantProp, ApplyColorInversion } from '../styles/types';
import { SlotProps, CreateSlotsAndSlotProps } from '../utils/types';

export type TabSlot = 'root';

export interface TabSlots {
  /**
   * The component that renders the root.
   * @default 'button'
   */
  root?: React.ElementType;
}

export type TabSlotsAndSlotProps = CreateSlotsAndSlotProps<
  TabSlots,
  {
    root: SlotProps<'button', {}, TabOwnerState>;
  }
>;

export interface TabPropsColorOverrides {}
export interface TabPropsVariantOverrides {}

export interface TabTypeMap<P = {}, D extends React.ElementType = 'button'> {
  props: P & {
    /**
     * A ref for imperative actions. It currently only supports `focusVisible()` action.
     */
    action?: React.Ref<{
      focusVisible(): void;
    }>;
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'neutral'
     */
    color?: OverridableStringUnion<ColorPaletteProp, TabPropsColorOverrides>;
    /**
     * If `true`, the component is disabled.
     * @default false
     */
    disabled?: boolean;
    /**
     * If `true`, the pseudo element indicator is hidden.
     * @default false
     */
    disableIndicator?: boolean;
    /**
     * The indicator's position when the Tab is selected.
     * @default row ? 'bottom' : 'right'
     */
    indicatorPlacement?: 'top' | 'bottom' | 'left' | 'right';
    /**
     * If `true`, the indicator stay within the padding based on the `Tabs` orientation.
     * @default false
     */
    indicatorInset?: boolean;
    /**
     * The content direction flow.
     * @default 'horizontal'
     */
    orientation?: 'horizontal' | 'vertical';
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
    /**
     * You can provide your own value. Otherwise, it falls back to the child position index.
     */
    value?: number | string;
    /**
     * Callback invoked when new value is being set.
     */
    onChange?: (event: React.SyntheticEvent, value: number | string) => void;
    /**
     * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
     * @default 'plain'
     */
    variant?: OverridableStringUnion<VariantProp, TabPropsVariantOverrides>;
  } & TabSlotsAndSlotProps;
  defaultComponent: D;
}

export type TabProps<
  D extends React.ElementType = TabTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<TabTypeMap<P, D>, D>;

export interface TabOwnerState extends ApplyColorInversion<TabProps> {
  /**
   * If `true`, the tab is activated by mouse or keyboard.
   */
  active: boolean;
  /**
   * If `true`, the tab's focus is visible.
   */
  focusVisible?: boolean;
  /**
   * If `true`, the tab is disabled.
   */
  disabled: boolean;
  /**
   * If `true`, the tab is disabled.
   */
  selected: boolean;
  /**
   * @internal
   */
  row: boolean;
}
