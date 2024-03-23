import * as React from 'react';
import { expectType } from '@mui/types';
import Switch, { SwitchOwnerState } from '@mui/joy/Switch';

<Switch />;

<Switch component="div" />;

<Switch data-testid="any" />;

// common HTML attributes
<Switch onDrop={() => {}} />;

<Switch defaultChecked />;

<Switch checked />;

<Switch
  onChange={(event) => {
    const checked = event.target.checked;
  }}
/>;

<Switch color="primary" />;
<Switch color="danger" />;
<Switch color="success" />;
<Switch color="warning" />;
<Switch color="neutral" />;

<Switch variant="outlined" />;
<Switch variant="soft" />;
<Switch variant="solid" />;

<Switch size="sm" />;
<Switch size="md" />;
<Switch size="lg" />;

<Switch
  sx={{
    '--joy-Switch-trackRadius': '8px',
    '--joy-Switch-trackWidth': '48px',
    '--joy-Switch-trackHeight': '24px',
    '--joy-Switch-thumbSize': '16px',
  }}
/>;

<Switch
  slots={{
    root: 'div',
    track: 'div',
    thumb: 'div',
    action: 'div',
    input: 'div',
    startDecorator: 'div',
    endDecorator: 'div',
  }}
/>;

<Switch
  slotProps={{
    root: {
      component: 'div',
      'data-testid': 'test',
    },
    track: {
      component: 'div',
      'data-testid': 'test',
    },
    thumb: {
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

<Switch
  slotProps={{
    root: (ownerState) => {
      expectType<SwitchOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    track: (ownerState) => {
      expectType<SwitchOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    thumb: (ownerState) => {
      expectType<SwitchOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    action: (ownerState) => {
      expectType<SwitchOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    input: (ownerState) => {
      expectType<SwitchOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    startDecorator: (ownerState) => {
      expectType<SwitchOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    endDecorator: (ownerState) => {
      expectType<SwitchOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
  }}
/>;
