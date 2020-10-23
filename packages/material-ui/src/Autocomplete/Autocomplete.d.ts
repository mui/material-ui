import * as React from 'react';
import { InternalStandardProps as StandardProps } from '@material-ui/core';
import { ChipProps, ChipTypeMap } from '@material-ui/core/Chip';
import { PopperProps } from '@material-ui/core/Popper';
import useAutocomplete, {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteCloseReason,
  AutocompleteInputChangeReason,
  createFilterOptions,
  UseAutocompleteProps,
} from '../useAutocomplete';

export {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteCloseReason,
  AutocompleteInputChangeReason,
  createFilterOptions,
};

export interface AutocompleteRenderOptionState {
  inputValue: string;
  selected: boolean;
}

export type AutocompleteGetTagProps = ({ index }: { index: number }) => {};

export interface AutocompleteRenderGroupParams {
  key: string;
  group: string;
  children?: React.ReactNode;
}

export interface AutocompleteRenderInputParams {
  id: string;
  disabled: boolean;
  fullWidth: boolean;
  size: 'small' | undefined;
  InputLabelProps: ReturnType<ReturnType<typeof useAutocomplete>['getInputLabelProps']>;
  InputProps: {
    ref: React.Ref<any>;
    className: string;
    startAdornment: React.ReactNode;
    endAdornment: React.ReactNode;
  };
  inputProps: ReturnType<ReturnType<typeof useAutocomplete>['getInputProps']>;
}

export interface AutocompleteProps<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent']
> extends UseAutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
    StandardProps<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange' | 'children'> {
  /**
   * Props applied to the [`Chip`](/api/chip/) element.
   */
  ChipProps?: ChipProps<ChipComponent>;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    /** Styles applied to the root element. */
    root?: string;
    /** Styles applied to the root element if `fullWidth={true}`. */
    fullWidth?: string;
    /** Pseudo-class applied to the root element if focused. */
    focused?: string;
    /** Styles applied to the tag elements, e.g. the chips. */
    tag?: string;
    /** Styles applied to the tag elements, e.g. the chips if `size="small"`. */
    tagSizeSmall?: string;
    /** Styles applied when the popup icon is rendered. */
    hasPopupIcon?: string;
    /** Styles applied when the clear icon is rendered. */
    hasClearIcon?: string;
    /** Styles applied to the Input element. */
    inputRoot?: string;
    /** Styles applied to the input element. */
    input?: string;
    /** Styles applied to the input element if tag focused. */
    inputFocused?: string;
    /** Styles applied to the endAdornment element. */
    endAdornment?: string;
    /** Styles applied to the clear indicator. */
    clearIndicator?: string;
    /** Styles applied to the clear indicator if the input is dirty. */
    clearIndicatorDirty?: string;
    /** Styles applied to the popup indicator. */
    popupIndicator?: string;
    /** Styles applied to the popup indicator if the popup is open. */
    popupIndicatorOpen?: string;
    /** Styles applied to the popper element. */
    popper?: string;
    /** Styles applied to the popper element if `disablePortal={true}`. */
    popperDisablePortal?: string;
    /** Styles applied to the `Paper` component. */
    paper?: string;
    /** Styles applied to the `listbox` component. */
    listbox?: string;
    /** Styles applied to the loading wrapper. */
    loading?: string;
    /** Styles applied to the no option wrapper. */
    noOptions?: string;
    /** Styles applied to the option elements. */
    option?: string;
    /** Styles applied to the group's label elements. */
    groupLabel?: string;
    /** Styles applied to the group's ul elements. */
    groupUl?: string;
  };
  /**
   * The icon to display in place of the default close icon.
   * @default <CloseIcon fontSize="small" />
   */
  closeIcon?: React.ReactNode;
  /**
   * Override the default text for the *clear* icon button.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   * @default 'Clear'
   */
  clearText?: string;
  /**
   * Override the default text for the *close popup* icon button.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   * @default 'Close'
   */
  closeText?: string;
  /**
   * If `true`, the input will be disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * The `Popper` content will be inside the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal?: boolean;
  /**
   * Force the visibility display of the popup icon.
   * @default 'auto'
   */
  forcePopupIcon?: true | false | 'auto';
  /**
   * If `true`, the input will take up the full width of its container.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * The label to display when the tags are truncated (`limitTags`).
   *
   * @param {number} more The number of truncated tags.
   * @returns {ReactNode}
   * @default (more) => `+${more}`
   */
  getLimitTagsText?: (more: number) => React.ReactNode;
  /**
   * The component used to render the listbox.
   * @default 'ul'
   */
  ListboxComponent?: React.ComponentType<React.HTMLAttributes<HTMLElement>>;
  /**
   * Props applied to the Listbox element.
   */
  ListboxProps?: ReturnType<ReturnType<typeof useAutocomplete>['getListboxProps']>;
  /**
   * If `true`, the component is in a loading state.
   * @default false
   */
  loading?: boolean;
  /**
   * Text to display when in a loading state.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
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
   * Text to display when there are no options.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   * @default 'No options'
   */
  noOptionsText?: React.ReactNode;
  /**
   * Override the default text for the *open popup* icon button.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   * @default 'Open'
   */
  openText?: string;
  /**
   * The component used to render the body of the popup.
   * @default Paper
   */
  PaperComponent?: React.ComponentType<React.HTMLAttributes<HTMLElement>>;
  /**
   * The component used to position the popup.
   * @default Popper
   */
  PopperComponent?: React.ComponentType<PopperProps>;
  /**
   * The icon to display in place of the default popup icon.
   * @default <ArrowDropDownIcon />
   */
  popupIcon?: React.ReactNode;
  /**
   * Render the group.
   *
   * @param {any} option The group to render.
   * @returns {ReactNode}
   */
  renderGroup?: (params: AutocompleteRenderGroupParams) => React.ReactNode;
  /**
   * Render the input.
   *
   * @param {object} params
   * @returns {ReactNode}
   */
  renderInput: (params: AutocompleteRenderInputParams) => React.ReactNode;
  /**
   * Render the option, use `getOptionLabel` by default.
   *
   * @param {object} props The props to apply on the li element.
   * @param {T} option The option to render.
   * @param {object} state The state of the component.
   * @returns {ReactNode}
   */
  renderOption?: (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: T,
    state: AutocompleteRenderOptionState
  ) => React.ReactNode;
  /**
   * Render the selected value.
   *
   * @param {T[]} value The `value` provided to the component.
   * @param {function} getTagProps A tag props getter.
   * @returns {ReactNode}
   */
  renderTags?: (value: T[], getTagProps: AutocompleteGetTagProps) => React.ReactNode;
  /**
   * The size of the autocomplete.
   * @default 'medium'
   */
  size?: 'small' | 'medium';
}

export type AutocompleteClassKey = keyof NonNullable<
  AutocompleteProps<any, any, any, any>['classes']
>;

/**
 *
 * Demos:
 *
 * - [Autocomplete](https://material-ui.com/components/autocomplete/)
 *
 * API:
 *
 * - [Autocomplete API](https://material-ui.com/api/autocomplete/)
 */
export default function Autocomplete<
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
>(props: AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>): JSX.Element;
