import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import { Modal, modalClasses as classes, ModalRootSlotProps } from '@mui/base/Modal';
import { describeConformanceUnstyled } from '../../test/describeConformanceUnstyled';

describe('<Modal />', () => {
  const { render } = createRenderer();
  let savedBodyStyle: CSSStyleDeclaration;

  before(() => {
    savedBodyStyle = document.body.style;
  });

  beforeEach(() => {
    document.body.setAttribute('style', savedBodyStyle.cssText);
  });

  describeConformanceUnstyled(
    <Modal open>
      <div />
    </Modal>,
    () => ({
      inheritComponent: 'div',
      render,
      refInstanceof: window.HTMLDivElement,
      slots: {
        root: {
          expectedClassName: classes.root,
        },
      },
      skip: ['componentProp'],
    }),
  );

  it('default exited state is opposite of open prop', () => {
    let exited = null;

    const Root = React.forwardRef<HTMLSpanElement, ModalRootSlotProps>(
      ({ ownerState: ownerStateProp, ...other }, ref) => {
        exited = ownerStateProp.exited;

        return <span ref={ref} {...other} />;
      },
    );

    render(
      <Modal open slots={{ root: Root }}>
        <div />
      </Modal>,
    );

    expect(exited).to.equal(false);
  });

  it('does not forward style props as DOM attributes if component slot is primitive', () => {
    const elementRef = React.createRef<HTMLDivElement>();
    render(
      <Modal
        open
        slots={{
          root: 'span',
        }}
        ref={elementRef}
      >
        <div />
      </Modal>,
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
      <Modal open ref={elementRef} keepMounted data-testid="modal">
        <div />
      </Modal>,
    );

    const { current: element } = elementRef;
    expect(element!.getAttribute('aria-hidden'), 'null when modal open').to.equal(null);
  });

  it('should set the ariaHidden attr when closed and not specified', () => {
    const elementRef = React.createRef<HTMLDivElement>();
    // by default, aria-hidden == (open ? null : true)
    // so test that
    render(
      <Modal open={false} ref={elementRef} keepMounted data-testid="modal">
        <div />
      </Modal>,
    );

    const { current: element } = elementRef;
    expect(element!.getAttribute('aria-hidden'), 'true when modal open').to.equal('true');
  });

  it('should pass the ariaHidden prop when open', () => {
    const elementRef = React.createRef<HTMLDivElement>();
    // by default, aria-hidden == (open ? null : true)
    // so test the inverses of that
    render(
      <Modal open aria-hidden ref={elementRef} keepMounted data-testid="modal">
        <div />
      </Modal>,
    );

    const { current: element } = elementRef;
    expect(element!.getAttribute('aria-hidden'), 'true when modal open').to.equal('true');
  });

  it('should pass the ariaHidden prop when closed', () => {
    const elementRef = React.createRef<HTMLDivElement>();
    // by default, aria-hidden == (open ? null : true)
    // so test the inverses of that
    render(
      <Modal open={false} aria-hidden={false} ref={elementRef} keepMounted data-testid="modal">
        <div />
      </Modal>,
    );

    const { current: element } = elementRef;
    expect(element!.getAttribute('aria-hidden'), 'null when modal closed').to.equal(null);
  });
});
