import * as React from 'react';
import { expectType } from '@mui/types';
import CircularProgress, { CircularProgressOwnerState } from '@mui/joy/CircularProgress';

<CircularProgress />;

<CircularProgress component="div" />;

// `variant`
<CircularProgress />;
<CircularProgress variant="soft" />;
<CircularProgress variant="outlined" />;
<CircularProgress variant="solid" />;

// `color`
<CircularProgress color="primary" />;
<CircularProgress color="danger" />;
<CircularProgress color="success" />;
<CircularProgress color="warning" />;
<CircularProgress color="neutral" />;

// `size`
<CircularProgress size="sm" />;
<CircularProgress size="md" />;
<CircularProgress size="lg" />;

// @ts-expect-error there is no variant `filled`
<CircularProgress variant="filled" />;

// @ts-expect-error there is no color `secondary`
<CircularProgress color="secondary" />;

// @ts-expect-error there is no size `xl2`
<CircularProgress size="xl2" />;

<CircularProgress
  slots={{
    root: 'div',
    svg: 'div',
    track: 'div',
    progress: 'div',
  }}
/>;

<CircularProgress
  slotProps={{
    root: {
      component: 'div',
      'data-testid': 'test',
    },
    svg: {
      component: 'div',
      'data-testid': 'test',
    },
    track: {
      component: 'div',
      'data-testid': 'test',
    },
    progress: {
      component: 'div',
      'data-testid': 'test',
    },
  }}
/>;

<CircularProgress
  slotProps={{
    root: (ownerState) => {
      expectType<CircularProgressOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    svg: (ownerState) => {
      expectType<CircularProgressOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    track: (ownerState) => {
      expectType<CircularProgressOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    progress: (ownerState) => {
      expectType<CircularProgressOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
  }}
/>;
