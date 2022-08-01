import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { ColorPaletteProp, SxProps, VariantProp } from '../styles/types';

export type TabSlot = 'root';

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
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
    /**
     * You can provide your own value. Otherwise, we fall back to the child position index.
     */
    value?: number | string;
    /**
     * Callback invoked when new value is being set.
     */
    onChange?: (event: React.SyntheticEvent, value: number | string) => void;
    /**
     * The variant to use.
     * @default 'plain'
     */
    variant?: OverridableStringUnion<VariantProp, TabPropsVariantOverrides>;
  };
  defaultComponent: D;
}

export type TabProps<
  D extends React.ElementType = TabTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<TabTypeMap<P, D>, D>;

export type TabOwnerState = TabProps & {
  active: boolean;
  focusVisible: boolean;
  disabled: boolean;
  selected: boolean;
};
