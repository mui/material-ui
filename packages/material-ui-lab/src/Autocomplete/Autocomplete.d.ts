import * as React from 'react';
import { StandardProps } from '@material-ui/core';
import { PopperProps } from '@material-ui/core/Popper';
import {
  UseAutocompleteCommonProps,
  createFilterOptions,
  UseAutocompleteProps,
} from '../useAutocomplete';

export { createFilterOptions };

export interface RenderOptionState {
  inputValue: string;
  selected: boolean;
}

export type GetTagProps = ({ index }: { index: number }) => {};

export interface RenderGroupParams {
  key: string;
  children: React.ReactNode;
}

export interface RenderInputParams {
  id: string;
  disabled: boolean;
  InputLabelProps: object;
  InputProps: {
    ref: React.Ref<any>;
    className: string;
    startAdornment: React.ReactNode;
    endAdornment: React.ReactNode;
  };
  inputProps: object;
}

export interface AutocompleteProps<T>
  extends UseAutocompleteCommonProps<T>,
    StandardProps<
      React.HTMLAttributes<HTMLDivElement>,
      AutocompleteClassKey,
      'defaultValue' | 'onChange' | 'children'
    > {
  /**
   * Props applied to the [`Chip`](/api/chip/) element.
   */
  ChipProps?: object;
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
   * Disable the portal behavior.
   * The children stay within it's parent DOM hierarchy.
   */
  disablePortal?: boolean;
  /**
   * Force the visibility display of the popup icon.
   */
  forcePopupIcon?: true | false | 'auto';
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
  renderGroup?: (params: RenderGroupParams) => React.ReactNode;
  /**
   * Render the input.
   *
   * @param {object} params
   * @returns {ReactNode}
   */
  renderInput: (params: RenderInputParams) => React.ReactNode;
  /**
   * Render the option, use `getOptionLabel` by default.
   *
   * @param {T} option The option to render.
   * @param {object} state The state of the component.
   * @returns {ReactNode}
   */
  renderOption?: (option: T, state: RenderOptionState) => React.ReactNode;
  /**
   * Render the selected value.
   *
   * @param {T[]} value The `value` provided to the component.
   * @param {function} getTagProps A tag props getter.
   * @returns {ReactNode}
   */
  renderTags?: (value: T[], getTagProps: GetTagProps) => React.ReactNode;
  /**
   * The size of the autocomplete.
   */
  size?: 'small' | 'medium';
}

export type AutocompleteClassKey =
  | 'root'
  | 'focused'
  | 'tag'
  | 'tagSizeSmall'
  | 'inputRoot'
  | 'input'
  | 'inputFocused'
  | 'endAdornment'
  | 'clearIndicator'
  | 'clearIndicatorDirty'
  | 'popupIndicator'
  | 'popupIndicatorOpen'
  | 'popper'
  | 'popperDisablePortal'
  | 'paper'
  | 'listbox'
  | 'loading'
  | 'noOptions'
  | 'option'
  | 'groupLabel'
  | 'groupUl';

export default function Autocomplete<T>(
  props: AutocompleteProps<T> & UseAutocompleteProps<T>,
): JSX.Element;
