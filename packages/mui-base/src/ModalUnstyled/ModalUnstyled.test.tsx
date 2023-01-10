import * as React from 'react';
import { expect } from 'chai';
import { createMount, createRenderer, describeConformanceUnstyled } from 'test/utils';
import ModalUnstyled, {
  modalUnstyledClasses as classes,
  ModalUnstyledRootSlotProps,
} from '@mui/base/ModalUnstyled';

describe('<ModalUnstyled />', () => {
  const mount = createMount();
  const { render } = createRenderer();
  let savedBodyStyle: CSSStyleDeclaration;

  before(() => {
    savedBodyStyle = document.body.style;
  });

  beforeEach(() => {
    document.body.setAttribute('style', savedBodyStyle.cssText);
  });

  describeConformanceUnstyled(
    <ModalUnstyled open>
      <div />
    </ModalUnstyled>,
    () => ({
      inheritComponent: 'div',
      render,
      mount,
      refInstanceof: window.HTMLDivElement,
      slots: {
        root: {
          expectedClassName: classes.root,
        },
      },
      skip: [
        'reactTestRenderer', // portal https://github.com/facebook/react/issues/11565
      ],
    }),
  );

  it('default exited state is opposite of open prop', () => {
    let exited = null;

    const Root = React.forwardRef<HTMLSpanElement, ModalUnstyledRootSlotProps>(
      ({ ownerState: ownerStateProp, ...other }, ref) => {
        exited = ownerStateProp.exited;

        return <span ref={ref} {...other} />;
      },
    );

    render(
      <ModalUnstyled open slots={{ root: Root }}>
        <div />
      </ModalUnstyled>,
    );

    expect(exited).to.equal(false);
  });

  it('does not forward style props as DOM attributes if component slot is primitive', () => {
    const elementRef = React.createRef<HTMLDivElement>();
    render(
      <ModalUnstyled
        open
        slots={{
          root: 'span',
        }}
        ref={elementRef}
      >
        <div />
      </ModalUnstyled>,
    );

    const { current: element } = elementRef;
    expect(element!.getAttribute('ownerState')).to.equal(null);
    expect(element!.getAttribute('theme')).to.equal(null);
  });

  it('should set the ariaHidden attr when open and not specified', () => {
    const elementRef = React.createRef<HTMLDivElement>();
    // by default, aria-hidden == (open ? null : true)
    // so test that
    render(
      <ModalUnstyled open ref={elementRef} keepMounted data-testid="modal">
        <div />
      </ModalUnstyled>,
    );

    const { current: element } = elementRef;
    expect(element!.getAttribute('aria-hidden'), 'null when modal open').to.equal(null);
  });

  it('should set the ariaHidden attr when closed and not specified', () => {
    const elementRef = React.createRef<HTMLDivElement>();
    // by default, aria-hidden == (open ? null : true)
    // so test that
    render(
      <ModalUnstyled open={false} ref={elementRef} keepMounted data-testid="modal">
        <div />
      </ModalUnstyled>,
    );

    const { current: element } = elementRef;
    expect(element!.getAttribute('aria-hidden'), 'true when modal open').to.equal('true');
  });

  it('should pass the ariaHidden prop when open', () => {
    const elementRef = React.createRef<HTMLDivElement>();
    // by default, aria-hidden == (open ? null : true)
    // so test the inverses of that
    render(
      <ModalUnstyled open aria-hidden ref={elementRef} keepMounted data-testid="modal">
        <div />
      </ModalUnstyled>,
    );

    const { current: element } = elementRef;
    expect(element!.getAttribute('aria-hidden'), 'true when modal open').to.equal('true');
  });

  it('should pass the ariaHidden prop when closed', () => {
    const elementRef = React.createRef<HTMLDivElement>();
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
    expect(element!.getAttribute('aria-hidden'), 'null when modal closed').to.equal(null);
  });
});
