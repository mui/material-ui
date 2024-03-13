import * as React from 'react';
import { OverrideProps } from '@mui/types';
import { SxProps } from '@mui/system';
import { ExtendButtonBaseTypeMap } from '@mui/material/ButtonBase';
import { Theme } from '@mui/material/styles';
import { OptionClasses } from './optionClasses';

export interface OptionOwnProps {
  /**
   * If `true`, the list item is focused during the first mount.
   * Focus will also be triggered if the value changes from false to true.
   * @default false
   */
  autoFocus?: boolean;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<OptionClasses>;
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input is used.
   * The prop defaults to the value inherited from the parent Select component.
   * @default false
   */
  dense?: boolean;
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * If `true`, the left and right padding is removed.
   * @default false
   */
  disableGutters?: boolean;
  /**
   * If `true`, a 1px light border is added to the bottom of the option.
   * @default false
   */
  divider?: boolean;
  /**
   * A text representation of the option's content.
   * Used for keyboard text navigation matching.
   */
  label?: string;
  /**
   * If `true`, the component is selected.
   * @default false
   */
  selected?: boolean;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

export type OptionTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'li',
> = ExtendButtonBaseTypeMap<{
  props: AdditionalProps & OptionOwnProps;
  defaultComponent: RootComponent;
}>;

export type OptionProps<
  RootComponent extends React.ElementType = OptionTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<OptionTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

export interface OptionOwnerState extends OptionProps {}
