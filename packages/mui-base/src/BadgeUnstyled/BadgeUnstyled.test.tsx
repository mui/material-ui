import * as React from 'react';
import { createRenderer, createMount, describeConformanceUnstyled } from 'test/utils';
import BadgeUnstyled, { badgeUnstyledClasses as classes } from '@mui/base/BadgeUnstyled';

describe('<BadgeUnstyled />', () => {
  const { render } = createRenderer();
  const mount = createMount();

  describeConformanceUnstyled(
    <BadgeUnstyled>
      <div />
    </BadgeUnstyled>,
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
