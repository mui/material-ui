import * as React from 'react';
import { expectType } from '@mui/types';
import Radio, { RadioOwnerState } from '@mui/joy/Radio';

<Radio id="test" name="test" />;

<Radio component="div" />;

<Radio data-testid="any" />;

<Radio defaultChecked />;

<Radio checked />;

<Radio
  onChange={(event) => {
    const checked = event.target.checked;
  }}
/>;

<Radio color="primary" />;
<Radio color="danger" />;
<Radio color="success" />;
<Radio color="warning" />;
<Radio color="neutral" />;

<Radio variant="outlined" />;
<Radio variant="soft" />;
<Radio variant="solid" />;

<Radio size="sm" />;
<Radio size="md" />;
<Radio size="lg" />;

<Radio
  slots={{
    root: 'div',
    radio: 'div',
    icon: 'div',
    action: 'div',
    input: 'div',
    label: 'div',
  }}
/>;

<Radio
  slotProps={{
    root: {
      component: 'div',
      'data-testid': 'test',
    },
    radio: {
      component: 'div',
      'data-testid': 'test',
    },
    icon: {
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

<Radio
  slotProps={{
    root: (ownerState) => {
      expectType<RadioOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    radio: (ownerState) => {
      expectType<RadioOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    icon: (ownerState) => {
      expectType<RadioOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    action: (ownerState) => {
      expectType<RadioOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    input: (ownerState) => {
      expectType<RadioOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    label: (ownerState) => {
      expectType<RadioOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
  }}
/>;
