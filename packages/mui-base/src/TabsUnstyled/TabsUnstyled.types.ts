import React from 'react';
import { OverrideProps } from '@mui/types';
import { SlotComponentProps } from '../utils';

interface TabsUnstyledComponentsPropsOverrides {}

type TabsUnstyledOrientation = 'horizontal' | 'vertical';

type TabsUnstyledDirection = 'ltr' | 'rtl';

export interface TabsUnstyledOwnProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * The value of the currently selected `Tab`.
   * If you don't want any selected `Tab`, you can set this prop to `false`.
   */
  value?: string | number | false;
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue?: string | number | false;
  /**
   * The component orientation (layout flow direction).
   * @default 'horizontal'
   */
  orientation?: TabsUnstyledOrientation;
  /**
   * The direction of the text.
   * @default 'ltr'
   */
  direction?: TabsUnstyledDirection;
  className?: string;
  /**
   * The components used for each slot inside the Tabs.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components?: {
    Root?: React.ElementType;
  };
  /**
   * The props used for each slot inside the Tabs.
   * @default {}
   */
  componentsProps?: {
    root?: SlotComponentProps<'div', TabsUnstyledComponentsPropsOverrides, TabsUnstyledOwnerState>;
  };
  /**
   * Callback invoked when new value is being set.
   */
  onChange?: (event: React.SyntheticEvent, value: number | string | boolean) => void;
  /**
   * If `true` the selected tab changes on focus. Otherwise it only
   * changes on activation.
   */
  selectionFollowsFocus?: boolean;
}

export interface TabsUnstyledTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & TabsUnstyledOwnProps;
  defaultComponent: D;
}

export type TabsUnstyledProps<
  D extends React.ElementType = TabsUnstyledTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<TabsUnstyledTypeMap<P, D>, D> & {
  component?: D;
};

export type TabsUnstyledOwnerState = TabsUnstyledProps & {
  orientation: TabsUnstyledOrientation;
  direction: TabsUnstyledDirection;
};

export type TabsUnstyledRootSlotProps = {
  ownerState: TabsUnstyledOwnerState;
  ref: React.Ref<any>;
  className?: string;
};
