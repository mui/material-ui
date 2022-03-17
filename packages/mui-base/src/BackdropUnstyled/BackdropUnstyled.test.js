import * as React from 'react';
import { expect } from 'chai';
import { createMount, createRenderer, describeConformanceUnstyled } from 'test/utils';
import BackdropUnstyled, { backdropUnstyledClasses as classes } from '@mui/base/BackdropUnstyled';

describe('<BackdropUnstyled />', () => {
  const mount = createMount();
  const { render } = createRenderer();

  describeConformanceUnstyled(
    <BackdropUnstyled>
      <div />
    </BackdropUnstyled>,
    () => ({
      classes,
      inheritComponent: 'div',
      render,
      mount,
      refInstanceof: window.HTMLDivElement,
      testComponentPropWith: 'div',
      slots: {
        root: {
          expectedClassName: classes.root,
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

    render(<BackdropUnstyled components={{ Root }} />);

    expect(ownerState).not.to.equal(null);
    expect(theme).not.to.equal(null);
  });

  it('does not forward style props as DOM attributes if component slot is primitive', () => {
    const elementRef = React.createRef();
    render(
      <BackdropUnstyled
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
