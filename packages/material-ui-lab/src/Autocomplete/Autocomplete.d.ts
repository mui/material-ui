import * as React from 'react';
import { StandardProps } from '@material-ui/core';
import { UseAutocompleteProps, CreateFilterOptions } from '../useAutocomplete';

export interface PopperProps extends React.HTMLAttributes<HTMLElement> {
  anchorEl?: HTMLElement;
  open: boolean;
  popperRef: React.Ref<unknown>;
}

export const createFilterOptions: CreateFilterOptions;

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

export interface AutocompleteProps
  extends UseAutocompleteProps,
    StandardProps<
      React.HTMLAttributes<HTMLDivElement>,
      AutocompleteClassKey,
      'defaultValue' | 'onChange' | 'children'
    > {
  /**
   * The icon to display in place of the default close icon.
   */
  closeIcon?: React.ReactNode;
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
   * The component used to render the listbox.
   */
  ListboxComponent?: React.ComponentType<React.HTMLAttributes<HTMLElement>>;
  /**
   * If `true`, the component is in a loading state.
   */
  loading?: boolean;
  /**
   * Text to display when in a loading state.
   */
  loadingText?: React.ReactNode;
  /**
   * Text to display when there are no options.
   */
  noOptionsText?: React.ReactNode;
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
   * @param {any} option The option to render.
   * @param {object} state The state of the component.
   * @returns {ReactNode}
   */
  renderOption?: (option: any, state: RenderOptionState) => React.ReactNode;
  /**
   * Render the selected value.
   *
   * @param {any} value The `value` provided to the component.
   * @param {function} getTagProps A tag props getter.
   * @returns {ReactNode}
   */
  renderTags?: (value: any, getTagProps: GetTagProps) => React.ReactNode;
}

export type AutocompleteClassKey =
  | 'root'
  | 'focused'
  | 'tag'
  | 'inputRoot'
  | 'inputRootOutlined'
  | 'inputRootFilled'
  | 'input'
  | 'inputFocused'
  | 'clearIndicator'
  | 'clearIndicatorDirty'
  | 'popupIndicator'
  | 'popupIndicatorOpen'
  | 'popup'
  | 'paper'
  | 'listbox'
  | 'option'
  | 'loading'
  | 'noOptions'
  | 'groupLabel'
  | 'groupUl';

export default function Autocomplete(props: AutocompleteProps): JSX.Element;
