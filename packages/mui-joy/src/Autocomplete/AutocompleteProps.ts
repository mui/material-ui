import * as React from 'react';
import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteCloseReason,
  AutocompleteFreeSoloValueMapping,
  AutocompleteInputChangeReason,
  AutocompleteValue,
  UseAutocompleteProps,
} from '@mui/base/useAutocomplete';
import { PopperOwnProps } from '@mui/base/Popper';
import { OverridableStringUnion } from '@mui/types';
import { ColorPaletteProp, SxProps, VariantProp, ApplyColorInversion } from '../styles/types';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';

export type AutocompleteSlot =
  | 'root'
  | 'wrapper'
  | 'input'
  | 'startDecorator'
  | 'endDecorator'
  | 'clearIndicator'
  | 'popupIndicator'
  | 'listbox'
  | 'option'
  | 'loading'
  | 'noOptions'
  | 'limitTag';

export interface AutocompleteSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType;
  /**
   * The component that renders the wrapper.
   * @default 'div'
   */
  wrapper?: React.ElementType;
  /**
   * The component that renders the input.
   * @default 'input'
   */
  input?: React.ElementType;
  /**
   * The component that renders the start decorator.
   * @default 'div'
   */
  startDecorator?: React.ElementType;
  /**
   * The component that renders the end decorator.
   * @default 'div'
   */
  endDecorator?: React.ElementType;
  /**
   * The component that renders the clear indicator.
   * @default 'button'
   */
  clearIndicator?: React.ElementType;
  /**
   * The component that renders the popup indicator.
   * @default 'button'
   */
  popupIndicator?: React.ElementType;
  /**
   * The component that renders the listbox.
   * @default 'ul'
   */
  listbox?: React.ElementType;
  /**
   * The component that renders the option.
   * @default 'li'
   */
  option?: React.ElementType;
  /**
   * The component that renders the loading.
   * @default 'li'
   */
  loading?: React.ElementType;
  /**
   * The component that renders the no-options.
   * @default 'li'
   */
  noOptions?: React.ElementType;
  /**
   * The component that renders the limit tag.
   * @default 'div'
   */
  limitTag?: React.ElementType;
}

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

export type AutocompleteSlotsAndSlotProps = CreateSlotsAndSlotProps<
  AutocompleteSlots,
  {
    root: SlotProps<'div', {}, AutocompleteOwnerState<any, any, any, any>>;
    wrapper: SlotProps<'div', {}, AutocompleteOwnerState<any, any, any, any>>;
    input: SlotProps<'input', {}, AutocompleteOwnerState<any, any, any, any>>;
    startDecorator: SlotProps<'span', {}, AutocompleteOwnerState<any, any, any, any>>;
    endDecorator: SlotProps<'span', {}, AutocompleteOwnerState<any, any, any, any>>;
    clearIndicator: SlotProps<
      'button',
      {
        color?: OverridableStringUnion<ColorPaletteProp, AutocompletePropsColorOverrides>;
        variant?: OverridableStringUnion<VariantProp, AutocompletePropsVariantOverrides>;
        size?: OverridableStringUnion<'sm' | 'md' | 'lg', AutocompletePropsSizeOverrides>;
      },
      AutocompleteOwnerState<any, any, any, any>
    >;
    popupIndicator: SlotProps<
      'button',
      {
        color?: OverridableStringUnion<ColorPaletteProp, AutocompletePropsColorOverrides>;
        variant?: OverridableStringUnion<VariantProp, AutocompletePropsVariantOverrides>;
        size?: OverridableStringUnion<'sm' | 'md' | 'lg', AutocompletePropsSizeOverrides>;
      },
      AutocompleteOwnerState<any, any, any, any>
    >;
    listbox: SlotProps<
      'ul',
      {
        color?: OverridableStringUnion<ColorPaletteProp, AutocompletePropsColorOverrides>;
        variant?: OverridableStringUnion<VariantProp, AutocompletePropsVariantOverrides>;
        size?: OverridableStringUnion<'sm' | 'md' | 'lg', AutocompletePropsSizeOverrides>;
      } & Omit<PopperOwnProps, 'slots' | 'slotProps' | 'open'>,
      AutocompleteOwnerState<any, any, any, any>
    >;
    option: SlotProps<
      'li',
      {
        color?: OverridableStringUnion<ColorPaletteProp, AutocompletePropsColorOverrides>;
        variant?: OverridableStringUnion<VariantProp, AutocompletePropsVariantOverrides>;
      },
      AutocompleteOwnerState<any, any, any, any>
    >;
    loading: SlotProps<'li', {}, AutocompleteOwnerState<any, any, any, any>>;
    noOptions: SlotProps<'li', {}, AutocompleteOwnerState<any, any, any, any>>;
    limitTag: SlotProps<'span', {}, AutocompleteOwnerState<any, any, any, any>>;
  }
>;

type AutocompleteOwnProps<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
> = UseAutocompleteProps<T, Multiple, DisableClearable, FreeSolo> &
  AutocompleteSlotsAndSlotProps & {
    /**
     * If `true`, the `input` element is focused during the first mount.
     */
    autoFocus?: boolean;
    /**
     * The icon to display in place of the default clear icon.
     * @default <ClearIcon fontSize="md" />
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
     * @default false
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
     * @param {string | number} more The number of truncated tags.
     * @returns {ReactNode}
     * @default (more: string | number) => `+${more}`
     */
    getLimitTagsText?: (more: string | number) => React.ReactNode;
    /**
     * If `true`, the component is in a loading state.
     * This shows the `loadingText` in place of suggestions (only if there are no suggestions to show, for example `options` are empty).
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
     * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
     * @default 'outlined'
     */
    variant?: OverridableStringUnion<VariantProp, AutocompletePropsVariantOverrides>;
  };

/**
 * AutocompleteProps signature:
 * @template T
 * @param {string | object} T The option structure, must be a string or an object (by default, only accepts objects with { label: string } )
 * @param {boolean | undefined} Multiple If your component is set with property multiple as true
 * @param {boolean | undefined} DisableClearable If your component is set with property disableClearable as true
 * @param {boolean | undefined} FreeSolo If your component is set with property freeSolo as true
 */
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
> extends ApplyColorInversion<AutocompleteOwnProps<T, Multiple, DisableClearable, FreeSolo>> {
  focused?: boolean;
  getOptionLabel: (option: T | AutocompleteFreeSoloValueMapping<FreeSolo>) => string;
  hasClearIcon?: boolean;
  hasPopupIcon?: boolean;
  hasOptions?: boolean;
  inputFocused?: boolean;
  popupOpen?: boolean;
}
