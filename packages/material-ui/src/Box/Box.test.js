import * as React from 'react';
import { expect } from 'chai';
import { createClientRender, createMount, describeConformance } from 'test/utils';
import Box from './Box';

describe('<Box />', () => {
  const mount = createMount();
  const render = createClientRender();

  describeConformance(<Box />, () => ({
    mount,
    only: ['refForwarding'],
    refInstanceof: window.HTMLDivElement,
  }));

  const testChildren = (
    <div data-testid="child" className="unique">
      Hello World
    </div>
  );

  it('warns if system props are used directly on the Box component', () => {
    expect(() => {
      render(
        <Box
          color="primary.main"
          fontFamily="Comic Sans"
          fontSize={{ xs: 'h6.fontSize', sm: 'h4.fontSize', md: 'h3.fontSize' }}
        />,
      );
    }).toWarnDev('Material-UI: You are using deprecated props on the Box component.\n');
  });

  it('renders children and box content', () => {
    const { container, getByTestId } = render(
      <Box component="span" m={1}>
        {testChildren}
      </Box>,
    );
    expect(container.firstChild).contain(getByTestId('child'));
    expect(container.querySelectorAll('span').length).to.equal(1);
  });

  it('does not forward style props as DOM attributes', () => {
    const elementRef = React.createRef();
    render(
      <Box
        color="primary.main"
        fontFamily="Comic Sans"
        fontSize={{ xs: 'h6.fontSize', sm: 'h4.fontSize', md: 'h3.fontSize' }}
        ref={elementRef}
      />,
    );

    const { current: element } = elementRef;
    expect(element.getAttribute('color')).to.equal(null);
    expect(element.getAttribute('font-family')).to.equal(null);
    expect(element.getAttribute('font-size')).to.equal(null);
  });

  it('respect properties order when generating the CSS', function test() {
    const isJSDOM = /jsdom/.test(window.navigator.userAgent);

    if (isJSDOM) {
      this.skip();
    }

    const testCaseBorderColorWins = render(<Box border={1} borderColor="rgb(0, 0, 255)" />);

    expect(testCaseBorderColorWins.container.firstChild).toHaveComputedStyle({
      borderTopWidth: '1px',
      borderRightWidth: '1px',
      borderBottomWidth: '1px',
      borderLeftWidth: '1px',
      borderTopStyle: 'solid',
      borderRightStyle: 'solid',
      borderBottomStyle: 'solid',
      borderLeftStyle: 'solid',
      borderTopColor: 'rgb(0, 0, 255)',
      borderRightColor: 'rgb(0, 0, 255)',
      borderBottomColor: 'rgb(0, 0, 255)',
      borderLeftColor: 'rgb(0, 0, 255)',
    });

    const testCaseBorderWins = render(<Box borderColor="rgb(0, 0, 255)" border={1} />);

    expect(testCaseBorderWins.container.firstChild).toHaveComputedStyle({
      borderTopWidth: '1px',
      borderRightWidth: '1px',
      borderBottomWidth: '1px',
      borderLeftWidth: '1px',
      borderTopStyle: 'solid',
      borderRightStyle: 'solid',
      borderBottomStyle: 'solid',
      borderLeftStyle: 'solid',
      borderTopColor: 'rgb(0, 0, 0)',
      borderRightColor: 'rgb(0, 0, 0)',
      borderBottomColor: 'rgb(0, 0, 0)',
      borderLeftColor: 'rgb(0, 0, 0)',
    });
  });

  it('respect properties order when generating the CSS from the sx prop', function test() {
    const isJSDOM = /jsdom/.test(window.navigator.userAgent);

    if (isJSDOM) {
      this.skip();
    }

    const testCaseBorderColorWins = render(
      <Box sx={{ border: 1, borderColor: 'rgb(0, 0, 255)' }} />,
    );

    expect(testCaseBorderColorWins.container.firstChild).toHaveComputedStyle({
      borderTopWidth: '1px',
      borderRightWidth: '1px',
      borderBottomWidth: '1px',
      borderLeftWidth: '1px',
      borderTopStyle: 'solid',
      borderRightStyle: 'solid',
      borderBottomStyle: 'solid',
      borderLeftStyle: 'solid',
      borderTopColor: 'rgb(0, 0, 255)',
      borderRightColor: 'rgb(0, 0, 255)',
      borderBottomColor: 'rgb(0, 0, 255)',
      borderLeftColor: 'rgb(0, 0, 255)',
    });

    const testCaseBorderWins = render(<Box sx={{ borderColor: 'rgb(0, 0, 255)', border: 1 }} />);

    expect(testCaseBorderWins.container.firstChild).toHaveComputedStyle({
      borderTopWidth: '1px',
      borderRightWidth: '1px',
      borderBottomWidth: '1px',
      borderLeftWidth: '1px',
      borderTopStyle: 'solid',
      borderRightStyle: 'solid',
      borderBottomStyle: 'solid',
      borderLeftStyle: 'solid',
      borderTopColor: 'rgb(0, 0, 0)',
      borderRightColor: 'rgb(0, 0, 0)',
      borderBottomColor: 'rgb(0, 0, 0)',
      borderLeftColor: 'rgb(0, 0, 0)',
    });
  });
});
