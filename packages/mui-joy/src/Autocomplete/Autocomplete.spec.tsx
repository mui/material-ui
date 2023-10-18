import * as React from 'react';
import { expectType } from '@mui/types';
import Autocomplete, { AutocompleteOwnerState } from '@mui/joy/Autocomplete';

const top100Films = [{ title: 'The Shawshank Redemption', year: 1994 }];

<Autocomplete options={[]} slotProps={{ listbox: { disablePortal: true } }} />;

<Autocomplete multiple placeholder="Favorites" options={[]} defaultValue={['a', 'b']} />;

<Autocomplete
  placeholder="Favorites"
  limitTags={2}
  options={top100Films}
  getOptionLabel={(option) => option.title}
  defaultValue={[top100Films[13], top100Films[12], top100Films[11]]}
  multiple
  sx={{ width: '500px' }}
/>;

<Autocomplete
  options={top100Films}
  slotProps={{
    clearIndicator: {
      color: 'danger',
      variant: 'outlined',
      size: 'sm',
    },
    popupIndicator: (ownerState) => ({
      color: ownerState.inputFocused ? 'danger' : 'neutral',
      variant: 'outlined',
      size: 'sm',
    }),
    listbox: {
      color: 'danger',
      variant: 'outlined',
      size: 'sm',
    },
    option: {
      color: 'danger',
      variant: 'outlined',
    },
  }}
/>;

<Autocomplete
  options={top100Films}
  slots={{
    root: 'div',
    wrapper: 'div',
    input: 'div',
    clearIndicator: 'div',
    popupIndicator: 'div',
    listbox: 'div',
    option: 'div',
    loading: 'div',
    noOptions: 'div',
    limitTag: 'div',
    startDecorator: 'div',
    endDecorator: 'div',
  }}
/>;

<Autocomplete
  options={top100Films}
  slotProps={{
    root: {
      component: 'div',
      'data-testid': 'test',
    },
    wrapper: {
      component: 'div',
      'data-testid': 'test',
    },
    input: {
      component: 'div',
      'data-testid': 'test',
    },
    clearIndicator: {
      component: 'div',
      'data-testid': 'test',
    },
    popupIndicator: {
      component: 'div',
      'data-testid': 'test',
    },
    listbox: {
      component: 'div',
      'data-testid': 'test',
    },
    option: {
      component: 'div',
      'data-testid': 'test',
    },
    loading: {
      component: 'div',
      'data-testid': 'test',
    },
    noOptions: {
      component: 'div',
      'data-testid': 'test',
    },
    limitTag: {
      component: 'div',
      'data-testid': 'test',
    },
    startDecorator: {
      component: 'div',
      'data-testid': 'test',
    },
    endDecorator: {
      component: 'div',
      'data-testid': 'test',
    },
  }}
/>;

<Autocomplete
  options={top100Films}
  slotProps={{
    root: (ownerState) => {
      expectType<AutocompleteOwnerState<any, any, any, any>, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    wrapper: (ownerState) => {
      expectType<AutocompleteOwnerState<any, any, any, any>, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    input: (ownerState) => {
      expectType<AutocompleteOwnerState<any, any, any, any>, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    clearIndicator: (ownerState) => {
      expectType<AutocompleteOwnerState<any, any, any, any>, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    popupIndicator: (ownerState) => {
      expectType<AutocompleteOwnerState<any, any, any, any>, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    listbox: (ownerState) => {
      expectType<AutocompleteOwnerState<any, any, any, any>, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    option: (ownerState) => {
      expectType<AutocompleteOwnerState<any, any, any, any>, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    loading: (ownerState) => {
      expectType<AutocompleteOwnerState<any, any, any, any>, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    noOptions: (ownerState) => {
      expectType<AutocompleteOwnerState<any, any, any, any>, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    limitTag: (ownerState) => {
      expectType<AutocompleteOwnerState<any, any, any, any>, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    startDecorator: (ownerState) => {
      expectType<AutocompleteOwnerState<any, any, any, any>, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    endDecorator: (ownerState) => {
      expectType<AutocompleteOwnerState<any, any, any, any>, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
  }}
/>;
