import * as React from 'react';
import { expect } from 'chai';
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
      muiName: 'MuiBadge',
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

  it('forwards style props on the Root component', () => {
    let ownerState = null;
    let theme = null;

    const Root = React.forwardRef(
      ({ ownerState: ownerStateProp, theme: themeProp, ...other }, ref) => {
        ownerState = ownerStateProp;
        theme = themeProp;
        return <span ref={ref} {...other} />;
      },
    );

    render(<BadgeUnstyled components={{ Root }} />);

    expect(ownerState).not.to.equal(null);
    expect(theme).not.to.equal(null);
  });

  it('does not forward style props as DOM attributes if component slot is primitive', () => {
    const elementRef = React.createRef();
    render(
      <BadgeUnstyled
        components={{
          Root: 'span',
        }}
        ref={elementRef}
      />,
    );

    const { current: element } = elementRef;
    expect(element.getAttribute('ownerState')).to.equal(null);
    expect(element.getAttribute('theme')).to.equal(null);
  });
});
