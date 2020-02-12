import * as React from 'react';
import { StandardProps } from '@material-ui/core';
import { PopperProps } from '@material-ui/core/Popper';
import {
  UseAutocompleteCommonProps,
  createFilterOptions,
  UseAutocompleteProps,
} from '../useAutocomplete';
import { AutocompleteProps } from '../Autocomplete';

export interface CreatableAutocomplete<T> extends UseAutocompleteCommonProps<T>,
StandardProps<
  React.HTMLAttributes<HTMLDivElement>,
  AutocompleteClassKey,
  'defaultValue' | 'onChange' | 'children'
> {
  onCreateNewOption: UseAutocompleteProps<T>['onChange'];
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

export default function CreatableAutocomplete<T>(
  props: CreatableAutocomplete<T>,
): JSX.Element;
