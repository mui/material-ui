import * as React from 'react';
import { expectType } from '@mui/types';
import Checkbox, { CheckboxOwnerState } from '@mui/joy/Checkbox';

<Checkbox id="test" name="test" />;

<Checkbox component="div" />;

<Checkbox data-testid="any" />;

<Checkbox defaultChecked />;

<Checkbox checked />;

<Checkbox indeterminate />;

<Checkbox
  onChange={(event) => {
    const checked = event.target.checked;
  }}
/>;

<Checkbox color="primary" />;
<Checkbox color="danger" />;
<Checkbox color="success" />;
<Checkbox color="warning" />;
<Checkbox color="neutral" />;

<Checkbox variant="outlined" />;
<Checkbox variant="soft" />;
<Checkbox variant="solid" />;

<Checkbox size="sm" />;
<Checkbox size="md" />;
<Checkbox size="lg" />;

<Checkbox
  slots={{
    root: 'div',
    checkbox: 'div',
    action: 'div',
    input: 'div',
    label: 'div',
  }}
/>;

<Checkbox
  slotProps={{
    root: {
      component: 'div',
      'data-testid': 'test',
    },
    checkbox: {
      component: 'div',
      'data-testid': 'test',
    },
    action: {
      component: 'div',
      'data-testid': 'test',
    },
    input: {
      component: 'div',
      'data-testid': 'test',
    },
    label: {
      component: 'div',
      'data-testid': 'test',
    },
  }}
/>;

<Checkbox
  slotProps={{
    root: (ownerState) => {
      expectType<CheckboxOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    checkbox: (ownerState) => {
      expectType<CheckboxOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    action: (ownerState) => {
      expectType<CheckboxOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    input: (ownerState) => {
      expectType<CheckboxOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    label: (ownerState) => {
      expectType<CheckboxOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
  }}
/>;
