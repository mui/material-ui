import { expectType } from '@mui/types';
import * as React from 'react';
import Breadcrumbs, { BreadcrumbsOwnerState } from '@mui/joy/Breadcrumbs';

<Breadcrumbs />;

<Breadcrumbs component="div" />;

// `size`
<Breadcrumbs size="sm" />;
<Breadcrumbs size="md" />;
<Breadcrumbs size="lg" />;

// @ts-expect-error there is no size `xs`
<Breadcrumbs size="xs" />;
// @ts-expect-error there is no size `xl`
<Breadcrumbs size="xl" />;

<Breadcrumbs
  slots={{
    root: 'div',
    ol: 'div',
    li: 'div',
    separator: 'div',
  }}
/>;

<Breadcrumbs
  slotProps={{
    root: {
      component: 'div',
      'data-testid': 'test',
    },
    ol: {
      component: 'div',
      'data-testid': 'test',
    },
    li: {
      component: 'div',
    },
    separator: {
      'data-testid': 'test',
    },
  }}
/>;

<Breadcrumbs
  slotProps={{
    root: (ownerState) => {
      expectType<BreadcrumbsOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    ol: (ownerState) => {
      expectType<BreadcrumbsOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    li: (ownerState) => {
      expectType<BreadcrumbsOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    separator: (ownerState) => {
      expectType<BreadcrumbsOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
  }}
/>;
