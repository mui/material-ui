import * as React from 'react';
import { OverridableStringUnion } from '@mui/types';
import { SlotComponentProps } from '@mui/base/utils';
import {
  AutocompleteValue,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteCloseReason,
  AutocompleteInputChangeReason,
  UseAutocompleteProps,
} from '@mui/base/AutocompleteUnstyled';
import { PopperUnstyledOwnProps } from '@mui/base/PopperUnstyled';
import { ColorPaletteProp, VariantProp, SxProps } from '../styles/types';
import { IconButtonOwnerState } from '../IconButton/IconButtonProps';
import { AutocompleteListboxProps } from '../AutocompleteListbox/AutocompleteListboxProps';
import { AutocompleteOptionProps } from '../AutocompleteOption/AutocompleteOptionProps';

export type AutocompleteSlot = keyof ComponentsProps;

export interface AutocompletePropsVariantOverrides {}

export interface AutocompletePropsColorOverrides {}

export interface AutocompletePropsSizeOverrides {}

export type {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteCloseReason,
  AutocompleteInputChangeReason,
};

export type AutocompleteRenderGetTagProps = ({ index }: { index: number }) => {
  key: number;
  disabled: boolean;
  'data-tag-index': number;
  tabIndex: -1;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export interface AutocompleteRenderOptionState {
  inputValue: string;
  selected: boolean;
  ownerState: AutocompleteOwnerState<any, any, any, any>;
}

export interface AutocompleteRenderGroupParams {
  key: string;
  group: string;
  children?: React.ReactNode;
}

interface ComponentsProps {
  root?: SlotComponentProps<
    'div',
    { component?: React.ElementType; sx?: SxProps },
    AutocompleteOwnerState<any, any, any, any>
  >;
  wrapper?: SlotComponentProps<
    'div',
    { component?: React.ElementType; sx?: SxProps },
    AutocompleteOwnerState<any, any, any, any>
  >;
  input?: SlotComponentProps<
    'input',
    { component?: React.ElementType; sx?: SxProps },
    AutocompleteOwnerState<any, any, any, any>
  >;
  startDecorator?: SlotComponentProps<
    'span',
    { component?: React.ElementType; sx?: SxProps },
    AutocompleteOwnerState<any, any, any, any>
  >;
  endDecorator?: SlotComponentProps<
    'span',
    { component?: React.ElementType; sx?: SxProps },
    AutocompleteOwnerState<any, any, any, any>
  >;
  clearIndicator?: SlotComponentProps<
    'button',
    { component?: React.ElementType; sx?: SxProps } & Pick<
      IconButtonOwnerState,
      'color' | 'variant' | 'size'
    >,
    Omit<AutocompleteOwnerState<any, any, any, any>, 'color' | 'variant' | 'size'> &
      Pick<IconButtonOwnerState, 'color' | 'variant' | 'size'>
  >;
  popupIndicator?: SlotComponentProps<
    'button',
    { component?: React.ElementType; sx?: SxProps } & Pick<
      IconButtonOwnerState,
      'color' | 'variant' | 'size'
    >,
    Omit<AutocompleteOwnerState<any, any, any, any>, 'color' | 'variant' | 'size'> &
      Pick<IconButtonOwnerState, 'color' | 'variant' | 'size'>
  >;
  listbox?: SlotComponentProps<
    'ul',
    {
      component?: React.ElementType;
      sx?: SxProps;
    } & Omit<PopperUnstyledOwnProps, 'components' | 'componentsProps' | 'open'> &
      Pick<AutocompleteListboxProps, 'color' | 'variant' | 'size'>,
    AutocompleteOwnerState<any, any, any, any>
  >;
  option?: SlotComponentProps<
    'li',
    {
      component?: React.ElementType;
      sx?: SxProps;
    } & Pick<AutocompleteOptionProps, 'color' | 'variant'>,
    AutocompleteOwnerState<any, any, any, any>
  >;
  loading?: SlotComponentProps<
    'div',
    { component?: React.ElementType; sx?: SxProps },
    AutocompleteOwnerState<any, any, any, any>
  >;
  noOptions?: SlotComponentProps<
    'li',
    { component?: React.ElementType; sx?: SxProps },
    AutocompleteOwnerState<any, any, any, any>
  >;
  limitTag?: SlotComponentProps<
    'span',
    { component?: React.ElementType; sx?: SxProps },
    AutocompleteOwnerState<any, any, any, any>
  >;
}

interface AutocompleteOwnProps<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
> extends UseAutocompleteProps<T, Multiple, DisableClearable, FreeSolo> {
  /**
   * If `true`, the `input` element is focused during the first mount.
   */
  autoFocus?: boolean;
  /**
   * The icon to display in place of the default clear icon.
   * @default <ClearIcon fontSize="small" />
   */
  clearIcon?: React.ReactNode;
  /**
   * Override the default text for the *clear* icon button.
   *
   * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
   * @default 'Clear'
   */
  clearText?: string;
  /**
   * Override the default text for the *close popup* icon button.
   *
   * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
   * @default 'Close'
   */
  closeText?: string;
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'neutral'
   */
  color?: OverridableStringUnion<ColorPaletteProp, AutocompletePropsColorOverrides>;
  /**
   * Replace the default slots.
   */
  components?: {
    root?: React.ElementType;
    wrapper?: React.ElementType;
    input?: React.ElementType;
    startDecorator?: React.ElementType;
    endDecorator?: React.ElementType;
    clearIndicator?: React.ElementType;
    popupIndicator?: React.ElementType;
    listbox?: React.ElementType;
    option?: React.ElementType;
    loading?: React.ElementType;
    noOptions?: React.ElementType;
    limitTag?: React.ElementType;
  };
  /**
   * The props used for each slot inside.
   * @default {}
   */
  componentsProps?: ComponentsProps;
  /**
   * The default value. Use when the component is not controlled.
   * @default props.multiple ? [] : null
   */
  defaultValue?: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>;
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * If `true`, the `input` will indicate an error.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  error?: boolean;
  /**
   * Trailing adornment for this input.
   */
  endDecorator?: React.ReactNode;
  /**
   * Force the visibility display of the popup icon.
   * @default 'auto'
   */
  forcePopupIcon?: true | false | 'auto';
  /**
   * The label to display when the tags are truncated (`limitTags`).
   *
   * @param {number} more The number of truncated tags.
   * @returns {ReactNode}
   * @default (more) => `+${more}`
   */
  getLimitTagsText?: (more: number) => React.ReactNode;
  /**
   * If `true`, the component is in a loading state.
   * This shows the `loadingText` in place of suggestions (only if there are no suggestions to show, e.g. `options` are empty).
   * @default false
   */
  loading?: boolean;
  /**
   * Text to display when in a loading state.
   *
   * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
   * @default 'Loading…'
   */
  loadingText?: React.ReactNode;
  /**
   * The maximum number of tags that will be visible when not focused.
   * Set `-1` to disable the limit.
   * @default -1
   */
  limitTags?: number;
  /**
   * Name attribute of the `input` element.
   */
  name?: string;
  /**
   * Text to display when there are no options.
   *
   * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
   * @default 'No options'
   */
  noOptionsText?: React.ReactNode;
  /**
   * Override the default text for the *open popup* icon button.
   *
   * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
   * @default 'Open'
   */
  openText?: string;
  /**
   * The input placeholder
   */
  placeholder?: string;
  /**
   * The icon to display in place of the default popup icon.
   * @default <ArrowDropDownIcon />
   */
  popupIcon?: React.ReactNode;
  /**
   * If `true`, the component becomes read-only. It is also supported in multiple tags where the tag cannot be deleted.
   * @default false
   */
  readOnly?: boolean;
  /**
   * Render the group.
   *
   * @param {AutocompleteRenderGroupParams} params The group to render.
   * @returns {ReactNode}
   */
  renderGroup?: (params: AutocompleteRenderGroupParams) => React.ReactNode;
  /**
   * Render the option, use `getOptionLabel` by default.
   *
   * @param {object} props The props to apply on the li element.
   * @param {T} option The option to render.
   * @param {object} state The state of the component.
   * @returns {ReactNode}
   */
  renderOption?: (
    props: Omit<React.HTMLAttributes<HTMLLIElement>, 'color'>,
    option: T,
    state: AutocompleteRenderOptionState,
  ) => React.ReactNode;
  /**
   * Render the selected value.
   *
   * @param {T[]} value The `value` provided to the component.
   * @param {function} getTagProps A tag props getter.
   * @param {object} ownerState The state of the Autocomplete component.
   * @returns {ReactNode}
   */
  renderTags?: (
    value: T[],
    getTagProps: AutocompleteRenderGetTagProps,
    ownerState: AutocompleteOwnerState<T, Multiple, DisableClearable, FreeSolo>,
  ) => React.ReactNode;
  /**
   * If `true`, the `input` element is required.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  required?: boolean;
  /**
   * The size of the component.
   * @default 'md'
   */
  size?: OverridableStringUnion<'sm' | 'md' | 'lg', AutocompletePropsSizeOverrides>;
  /**
   * Leading adornment for this input.
   */
  startDecorator?: React.ReactNode;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps;
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant?: OverridableStringUnion<VariantProp, AutocompletePropsVariantOverrides>;
}

export interface AutocompleteProps<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
> extends AutocompleteOwnProps<T, Multiple, DisableClearable, FreeSolo>,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange' | 'children' | 'color'> {
  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
   */
  type?: string;
  onKeyDown?: (
    event: React.KeyboardEvent<HTMLDivElement> & { defaultMuiPrevented?: boolean },
  ) => void;
}

export interface AutocompleteOwnerState<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
> extends AutocompleteOwnProps<T, Multiple, DisableClearable, FreeSolo> {
  focused: boolean;
  hasClearIcon: boolean;
  hasPopupIcon: boolean;
  hasOptions: boolean;
  inputFocused: boolean;
  popupOpen: boolean;
}
