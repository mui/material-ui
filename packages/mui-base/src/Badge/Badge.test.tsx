import * as React from 'react';
import { createRenderer, createMount } from '@mui-internal/test-utils';
import { Badge, badgeClasses as classes } from '@mui/base/Badge';
import { describeConformanceUnstyled } from '../../test/describeConformanceUnstyled';

describe('<Badge />', () => {
  const { render } = createRenderer();
  const mount = createMount();

  describeConformanceUnstyled(
    <Badge>
      <div />
    </Badge>,
    () => ({
      classes,
      inheritComponent: 'span',
      render,
      mount,
      refInstanceof: window.HTMLSpanElement,
      testComponentPropWith: 'div',
      slots: {
        root: {
          expectedClassName: classes.root,
        },
        badge: {
          expectedClassName: classes.badge,
        },
      },
      skip: ['componentProp'],
    }),
  );
});
