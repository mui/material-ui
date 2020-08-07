import * as React from 'react';
import { expect } from 'chai';
import sinon, { spy, stub, useFakeTimers } from 'sinon';
import createMount from 'test/utils/createMount';
import { createClientRender, fireEvent } from 'test/utils/createClientRender';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import TextareaAutosize from './TextareaAutosize';

describe('<TextareaAutosize />', () => {
  const mount = createMount();
  const render = createClientRender();

  describeConformance(<TextareaAutosize />, () => ({
    inheritComponent: 'textarea',
    mount,
    refInstanceof: window.HTMLTextAreaElement,
    skip: ['rootClass', 'componentProp'],
  }));

  describe('layout', () => {
    // Only run the test on node.
    if (!/jsdom/.test(window.navigator.userAgent)) {
      return;
    }

    const getComputedStyleStub = {};

    function setLayout(
      input,
      shadow,
      { getComputedStyle, scrollHeight, lineHeight: lineHeightArg },
    ) {
      const lineHeight = typeof lineHeightArg === 'function' ? lineHeightArg : () => lineHeightArg;

      getComputedStyleStub[input] = getComputedStyle;

      let index = 0;
      stub(shadow, 'scrollHeight').get(() => {
        index += 1;
        return index % 2 === 1 ? scrollHeight : lineHeight();
      });
    }

    before(() => {
      stub(window, 'getComputedStyle').value((node) => getComputedStyleStub[node] || {});
    });

    after(() => {
      sinon.restore();
    });

    describe('resize', () => {
      let clock;

      before(() => {
        clock = useFakeTimers();
      });

      after(() => {
        clock.restore();
      });

      it('should handle the resize event', () => {
        const { container } = render(<TextareaAutosize />);
        const input = container.querySelector('textarea[aria-hidden=null]');
        const shadow = container.querySelector('textarea[aria-hidden=true]');
        expect(input.style).to.have.property('height', '0px');
        expect(input.style).to.have.property('overflow', 'hidden');

        setLayout(input, shadow, {
          getComputedStyle: {
            'box-sizing': 'content-box',
          },
          scrollHeight: 30,
          lineHeight: 15,
        });
        window.dispatchEvent(new window.Event('resize', {}));
        clock.tick(166);
        expect(input.style).to.have.property('height', '30px');
        expect(input.style).to.have.property('overflow', 'hidden');
      });
    });

    it('should update when uncontrolled', () => {
      const handleChange = spy();
      const { container } = render(<TextareaAutosize onChange={handleChange} />);
      const input = container.querySelector('textarea[aria-hidden=null]');
      const shadow = container.querySelector('textarea[aria-hidden=true]');
      expect(input.style).to.have.property('height', '0px');
      expect(input.style).to.have.property('overflow', 'hidden');
      setLayout(input, shadow, {
        getComputedStyle: {
          'box-sizing': 'content-box',
        },
        scrollHeight: 30,
        lineHeight: 15,
      });
      input.focus();
      fireEvent.change(document.activeElement, { target: { value: 'a' } });
      expect(input.style).to.have.property('height', '30px');
      expect(input.style).to.have.property('overflow', 'hidden');
      expect(handleChange.callCount).to.equal(1);
    });

    it('should take the border into account with border-box', () => {
      const border = 5;
      const { container, forceUpdate } = render(<TextareaAutosize />);
      const input = container.querySelector('textarea[aria-hidden=null]');
      const shadow = container.querySelector('textarea[aria-hidden=true]');
      expect(input.style).to.have.property('height', '0px');
      expect(input.style).to.have.property('overflow', 'hidden');
      setLayout(input, shadow, {
        getComputedStyle: {
          'box-sizing': 'border-box',
          'border-bottom-width': `${border}px`,
        },
        scrollHeight: 30,
        lineHeight: 15,
      });
      forceUpdate();
      expect(input.style).to.have.property('height', `${30 + border}px`);
      expect(input.style).to.have.property('overflow', 'hidden');
    });

    it('should take the padding into account with content-box', () => {
      const padding = 5;
      const { container, forceUpdate } = render(<TextareaAutosize />);
      const input = container.querySelector('textarea[aria-hidden=null]');
      const shadow = container.querySelector('textarea[aria-hidden=true]');
      setLayout(input, shadow, {
        getComputedStyle: {
          'box-sizing': 'content-box',
          'padding-top': `${padding}px`,
        },
        scrollHeight: 30,
        lineHeight: 15,
      });
      forceUpdate();
      expect(input.style).to.have.property('height', `${30 - padding}px`);
      expect(input.style).to.have.property('overflow', 'hidden');
    });

    it('should have at least height of "rows"', () => {
      const rows = 3;
      const lineHeight = 15;
      const { container, forceUpdate } = render(<TextareaAutosize rows={rows} />);
      const input = container.querySelector('textarea[aria-hidden=null]');
      const shadow = container.querySelector('textarea[aria-hidden=true]');
      setLayout(input, shadow, {
        getComputedStyle: {
          'box-sizing': 'content-box',
        },
        scrollHeight: 30,
        lineHeight,
      });
      forceUpdate();
      expect(input.style).to.have.property('height', `${lineHeight * rows}px`);
      expect(input.style).to.have.property('overflow', '');
    });

    it('should have at max "rowsMax" rows', () => {
      const rowsMax = 3;
      const lineHeight = 15;
      const { container, forceUpdate } = render(<TextareaAutosize rowsMax={rowsMax} />);
      const input = container.querySelector('textarea[aria-hidden=null]');
      const shadow = container.querySelector('textarea[aria-hidden=true]');
      setLayout(input, shadow, {
        getComputedStyle: {
          'box-sizing': 'content-box',
        },
        scrollHeight: 100,
        lineHeight,
      });
      forceUpdate();
      expect(input.style).to.have.property('height', `${lineHeight * rowsMax}px`);
      expect(input.style).to.have.property('overflow', '');
    });

    it('should show scrollbar when having more rows than "rowsMax"', () => {
      const rowsMax = 3;
      const lineHeight = 15;
      const { container, forceUpdate } = render(<TextareaAutosize rowsMax={rowsMax} />);
      const input = container.querySelector('textarea[aria-hidden=null]');
      const shadow = container.querySelector('textarea[aria-hidden=true]');
      setLayout(input, shadow, {
        getComputedStyle: {
          'box-sizing': 'border-box',
        },
        scrollHeight: lineHeight * 2,
        lineHeight,
      });
      forceUpdate();
      expect(input.style).to.have.property('height', `${lineHeight * 2}px`);
      expect(input.style).to.have.property('overflow', 'hidden');
      setLayout(input, shadow, {
        getComputedStyle: {
          'box-sizing': 'border-box',
        },
        scrollHeight: lineHeight * 3,
        lineHeight,
      });
      forceUpdate();
      expect(input.style).to.have.property('height', `${lineHeight * 3}px`);
      expect(input.style).to.have.property('overflow', 'hidden');
      setLayout(input, shadow, {
        getComputedStyle: {
          'box-sizing': 'border-box',
        },
        scrollHeight: lineHeight * 4,
        lineHeight,
      });
      forceUpdate();
      expect(input.style).to.have.property('height', `${lineHeight * 3}px`);
      expect(input.style).to.have.property('overflow', '');
    });

    it('should update its height when the "rowsMax" prop changes', () => {
      const lineHeight = 15;
      const { container, forceUpdate, setProps } = render(<TextareaAutosize rowsMax={3} />);
      const input = container.querySelector('textarea[aria-hidden=null]');
      const shadow = container.querySelector('textarea[aria-hidden=true]');
      setLayout(input, shadow, {
        getComputedStyle: {
          'box-sizing': 'content-box',
        },
        scrollHeight: 100,
        lineHeight,
      });
      forceUpdate();
      expect(input.style).to.have.property('height', `${lineHeight * 3}px`);
      expect(input.style).to.have.property('overflow', '');
      setProps({ rowsMax: 2 });
      expect(input.style).to.have.property('height', `${lineHeight * 2}px`);
      expect(input.style).to.have.property('overflow', '');
    });

    describe('warnings', () => {
      before(() => {
        consoleErrorMock.spy();
      });

      after(() => {
        consoleErrorMock.reset();
      });

      it('warns if layout is unstable but not crash', () => {
        const { container, forceUpdate } = render(<TextareaAutosize rowsMax={3} />);
        const input = container.querySelector('textarea[aria-hidden=null]');
        const shadow = container.querySelector('textarea[aria-hidden=true]');
        let index = 0;
        setLayout(input, shadow, {
          getComputedStyle: {
            'box-sizing': 'content-box',
          },
          scrollHeight: 100,
          lineHeight: () => {
            index += 1;
            return 15 + index;
          },
        });
        forceUpdate();

        expect(consoleErrorMock.callCount()).to.equal(3); // strict mode renders twice
        expect(consoleErrorMock.messages()[0]).to.include('Material-UI: Too many re-renders.');
      });
    });
  });
});
