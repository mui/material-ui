import * as React from 'react';
import { expect } from 'chai';
import PropTypes from 'prop-types';
import { createSandbox } from 'sinon';
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

  it('renders children and box content', () => {
    const { container, getByTestId } = render(
      <Box component="span" sx={{ m: 1 }}>
        {testChildren}
      </Box>,
    );
    expect(container.firstChild).contain(getByTestId('child'));
    expect(container.querySelectorAll('span').length).to.equal(1);
  });

  describe('warnings', () => {
    beforeEach(() => {
      PropTypes.resetWarningCache();
    });

    it('warns if system props are used directly on the Box component', () => {
      expect(() => {
        PropTypes.checkPropTypes(
          // If this breaks too often remove the test.
          // Testing propTypes isn't worth the effort of using expando properties for internal propTypes-only stuff.
          // eslint-disable-next-line no-underscore-dangle
          Box.__emotion_base.propTypes,
          {
            color: 'primary.main',
            fontFamily: 'Comic Sans',
            fontSize: { xs: 'h6.fontSize', sm: 'h4.fontSize', md: 'h3.fontSize' },
          },
          'props',
          'MockedName',
        );
      }).toErrorDev(
        'Warning: Failed props type: The following props are deprecated: `color`, `fontFamily`, `fontSize`.',
      );
    });
  });

  describe('deprecated props', () => {
    const consoleSandbox = createSandbox();

    beforeEach(() => {
      // Otherwise our global setup throws on prop-types warnings.
      // The tested props are deprecated so we're not worried about new, unexpected console errors.
      consoleSandbox.stub(console, 'warn');
      consoleSandbox.stub(console, 'error');
    });

    afterEach(() => {
      consoleSandbox.restore();
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
      expect(element).not.to.have.attribute('color');
      expect(element).not.to.have.attribute('font-family');
      expect(element).not.to.have.attribute('font-size');
    });
  });

  it('respect properties order when generating the CSS', function test() {
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

    const testCaseBorderWins = render(
      <Box
        sx={{
          borderColor: 'rgb(0, 0, 255)',
          border: 1,
        }}
      />,
    );

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
