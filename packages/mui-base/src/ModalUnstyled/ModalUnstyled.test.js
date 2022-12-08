import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, describeConformance } from 'test/utils';
import ModalUnstyled, { modalUnstyledClasses as classes } from '@mui/base/ModalUnstyled';

describe('<ModalUnstyled />', () => {
  const { render } = createRenderer();
  let savedBodyStyle;

  before(() => {
    savedBodyStyle = document.body.style;
  });

  beforeEach(() => {
    document.body.setAttribute('style', savedBodyStyle);
  });

  describeConformance(
    <ModalUnstyled open>
      <div />
    </ModalUnstyled>,
    () => ({
      classes,
      inheritComponent: 'div',
      render,
      refInstanceof: window.HTMLDivElement,
      skip: [
        'rootClass', // portal, can't determin the root
        'themeDefaultProps', // unstyled
        'themeStyleOverrides', // unstyled
        'themeVariants', // unstyled
        'reactTestRenderer', // portal https://github.com/facebook/react/issues/11565
      ],
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

    render(
      <ModalUnstyled open components={{ Root }}>
        <div />
      </ModalUnstyled>,
    );

    expect(ownerState).not.to.equal(null);
    expect(theme).not.to.equal(null);
  });

  it('does not forward style props as DOM attributes if component slot is primitive', () => {
    const elementRef = React.createRef();
    render(
      <ModalUnstyled
        open
        components={{
          Root: 'span',
        }}
        ref={elementRef}
      >
        <div />
      </ModalUnstyled>,
    );

    const { current: element } = elementRef;
    expect(element.getAttribute('ownerState')).to.equal(null);
    expect(element.getAttribute('theme')).to.equal(null);
  });

  it('should set the ariaHidden attr when open and not specified', () => {
    const elementRef = React.createRef();
    // by default, aria-hidden == (open ? null : true)
    // so test that
    render(
      <ModalUnstyled open ref={elementRef} keepMounted data-testid="modal">
        <div />
      </ModalUnstyled>,
    );

    const { current: element } = elementRef;
    expect(element.getAttribute('aria-hidden'), 'null when modal open').to.equal(null);
  });

  it('should set the ariaHidden attr when closed and not specified', () => {
    const elementRef = React.createRef();
    // by default, aria-hidden == (open ? null : true)
    // so test that
    render(
      <ModalUnstyled open={false} ref={elementRef} keepMounted data-testid="modal">
        <div />
      </ModalUnstyled>,
    );

    const { current: element } = elementRef;
    expect(element.getAttribute('aria-hidden'), 'true when modal open').to.equal('true');
  });

  it('should pass the ariaHidden prop when open', () => {
    const elementRef = React.createRef();
    // by default, aria-hidden == (open ? null : true)
    // so test the inverses of that
    render(
      <ModalUnstyled open aria-hidden ref={elementRef} keepMounted data-testid="modal">
        <div />
      </ModalUnstyled>,
    );

    const { current: element } = elementRef;
    expect(element.getAttribute('aria-hidden'), 'true when modal open').to.equal('true');
  });

  it('should pass the ariaHidden prop when closed', () => {
    const elementRef = React.createRef();
    // by default, aria-hidden == (open ? null : true)
    // so test the inverses of that
    render(
      <ModalUnstyled
        open={false}
        aria-hidden={false}
        ref={elementRef}
        keepMounted
        data-testid="modal"
      >
        <div />
      </ModalUnstyled>,
    );

    const { current: element } = elementRef;
    expect(element.getAttribute('aria-hidden'), 'null when modal closed').to.equal(null);
  });
});
