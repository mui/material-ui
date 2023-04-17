import * as React from 'react';
import { createRenderer, createMount, describeConformanceUnstyled } from 'test/utils';
import Badge, { badgeClasses as classes } from '@mui/base/Badge';

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
      muiName: 'BaseBadge',
      slots: {
        root: {
          expectedClassName: classes.root,
        },
        badge: {
          expectedClassName: classes.badge,
        },
      },
    }),
  );
});
