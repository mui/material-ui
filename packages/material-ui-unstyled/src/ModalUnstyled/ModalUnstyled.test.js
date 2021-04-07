import * as React from 'react';
import { expect } from 'chai';
import { createMount, createClientRender, describeConformance } from 'test/utils';
import ModalUnstyled, {
  modalUnstyledClasses as classes,
} from '@material-ui/unstyled/ModalUnstyled';

describe('<ModalUnstyled />', () => {
  const mount = createMount();
  const render = createClientRender();
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
      mount,
      refInstanceof: window.HTMLDivElement,
      testComponentPropWith: 'div',
      skip: ['reactTestRenderer'],
    }),
  );

  it('forwards style props on the Root component', () => {
    let styleProps = null;
    let theme = null;

    const Root = React.forwardRef(
      ({ styleProps: stylePropsProp, theme: themeProp, ...other }, ref) => {
        styleProps = stylePropsProp;
        theme = themeProp;
        return <span ref={ref} {...other} />;
      },
    );

    render(
      <ModalUnstyled open components={{ Root }}>
        <div />
      </ModalUnstyled>,
    );

    expect(styleProps).not.to.equal(null);
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
    expect(element.getAttribute('styleProps')).to.equal(null);
    expect(element.getAttribute('theme')).to.equal(null);
  });
});
