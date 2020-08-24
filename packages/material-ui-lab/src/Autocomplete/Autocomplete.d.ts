import * as React from 'react';
import { InternalStandardProps as StandardProps } from '@material-ui/core';
import { PopperProps } from '@material-ui/core/Popper';
import {
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
  InputLabelProps: object;
  InputProps: {
    ref: React.Ref<any>;
    className: string;
    startAdornment: React.ReactNode;
    endAdornment: React.ReactNode;
  };
  inputProps: object;
}

export interface AutocompleteProps<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
>
  extends UseAutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
    StandardProps<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange' | 'children'> {
  /**
   * Props applied to the [`Chip`](/api/chip/) element.
   */
  ChipProps?: object;
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
   */
  closeIcon?: React.ReactNode;
  /**
   * Override the default text for the *clear* icon button.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   */
  clearText?: string;
  /**
   * Override the default text for the *close popup* icon button.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   */
  closeText?: string;
  /**
   * If `true`, the input will be disabled.
   */
  disabled?: boolean;
  /**
   * The `Popper` content will be inside the DOM hierarchy of the parent component.
   */
  disablePortal?: boolean;
  /**
   * Force the visibility display of the popup icon.
   */
  forcePopupIcon?: true | false | 'auto';
  /**
   * If `true`, the input will take up the full width of its container.
   */
  fullWidth?: boolean;
  /**
   * The label to display when the tags are truncated (`limitTags`).
   *
   * @param {number} more The number of truncated tags.
   * @returns {ReactNode}
   */
  getLimitTagsText?: (more: number) => React.ReactNode;
  /**
   * The component used to render the listbox.
   */
  ListboxComponent?: React.ComponentType<React.HTMLAttributes<HTMLElement>>;
  /**
   * Props applied to the Listbox element.
   */
  ListboxProps?: object;
  /**
   * If `true`, the component is in a loading state.
   */
  loading?: boolean;
  /**
   * Text to display when in a loading state.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   */
  loadingText?: React.ReactNode;
  /**
   * The maximum number of tags that will be visible when not focused.
   * Set `-1` to disable the limit.
   */
  limitTags?: number;
  /**
   * Text to display when there are no options.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   */
  noOptionsText?: React.ReactNode;
  /**
   * Override the default text for the *open popup* icon button.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   */
  openText?: string;
  /**
   * The component used to render the body of the popup.
   */
  PaperComponent?: React.ComponentType<React.HTMLAttributes<HTMLElement>>;
  /**
   * The component used to position the popup.
   */
  PopperComponent?: React.ComponentType<PopperProps>;
  /**
   * The icon to display in place of the default popup icon.
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
   * @param {T} option The option to render.
   * @param {object} state The state of the component.
   * @returns {ReactNode}
   */
  renderOption?: (option: T, state: AutocompleteRenderOptionState) => React.ReactNode;
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
