import * as React from 'react';
import { expect } from 'chai';
import sinon, { spy, stub } from 'sinon';
import {
  describeConformanceUnstyled,
  act,
  createMount,
  createRenderer,
  fireEvent,
  strictModeDoubleLoggingSuppressed,
} from 'test/utils';
import TextareaAutosize from '@mui/base/TextareaAutosize';

describe('<TextareaAutosize />', () => {
  const { clock, render } = createRenderer();
  const mount = createMount();

  describeConformanceUnstyled(<TextareaAutosize />, () => ({
    render,
    mount,
    inheritComponent: 'textarea',
    refInstanceof: window.HTMLTextAreaElement,
    slots: {},
    skip: [
      // doesn't have slots, so these tests are irrelevant:
      'componentProp',
      'mergeClassName',
      'ownerStatePropagation',
      'propsSpread',
      'refForwarding',
      'slotsProp',
    ],
  }));

  describe('layout', () => {
    const getComputedStyleStub = new Map<Element, Partial<CSSStyleDeclaration>>();
    function setLayout(
      input: HTMLTextAreaElement,
      shadow: Element,
      {
        getComputedStyle,
        scrollHeight,
        lineHeight: lineHeightArg,
      }: {
        getComputedStyle: Partial<CSSStyleDeclaration>;
        scrollHeight?: number;
        lineHeight?: number | (() => number);
      },
    ) {
      const lineHeight = typeof lineHeightArg === 'function' ? lineHeightArg : () => lineHeightArg;

      getComputedStyleStub.set(input, getComputedStyle);

      let index = 0;
      stub(shadow, 'scrollHeight').get(() => {
        index += 1;
        return index % 2 === 1 ? scrollHeight : lineHeight();
      });
    }

    before(function beforeHook() {
      // Only run the test on node.
      if (!/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }

      stub(window, 'getComputedStyle').value(
        (node: Element) => getComputedStyleStub.get(node) || {},
      );
    });

    after(() => {
      sinon.restore();
    });

    describe('resize', () => {
      clock.withFakeTimers();

      it('should handle the resize event', () => {
        const { container } = render(<TextareaAutosize />);
        const input = container.querySelector<HTMLTextAreaElement>('textarea[aria-hidden=null]')!;
        const shadow = container.querySelector('textarea[aria-hidden=true]')!;

        expect(input.style).to.have.property('height', '0px');
        expect(input.style).to.have.property('overflow', 'hidden');

        setLayout(input, shadow, {
          getComputedStyle: {
            boxSizing: 'content-box',
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
      const input = container.querySelector<HTMLTextAreaElement>('textarea[aria-hidden=null]')!;
      const shadow = container.querySelector('textarea[aria-hidden=true]')!;
      expect(input.style).to.have.property('height', '0px');
      expect(input.style).to.have.property('overflow', 'hidden');
      setLayout(input, shadow, {
        getComputedStyle: {
          boxSizing: 'content-box',
        },
        scrollHeight: 30,
        lineHeight: 15,
      });
      act(() => {
        input.focus();
      });
      const activeElement = document.activeElement!;
      fireEvent.change(activeElement, { target: { value: 'a' } });
      expect(input.style).to.have.property('height', '30px');
      expect(input.style).to.have.property('overflow', 'hidden');
      expect(handleChange.callCount).to.equal(1);
    });

    it('should take the border into account with border-box', () => {
      const border = 5;
      const { container, forceUpdate } = render(<TextareaAutosize />);
      const input = container.querySelector<HTMLTextAreaElement>('textarea[aria-hidden=null]')!;
      const shadow = container.querySelector('textarea[aria-hidden=true]')!;
      expect(input.style).to.have.property('height', '0px');
      expect(input.style).to.have.property('overflow', 'hidden');
      setLayout(input, shadow, {
        getComputedStyle: {
          boxSizing: 'border-box',
          borderBottomWidth: `${border}px`,
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
      const input = container.querySelector<HTMLTextAreaElement>('textarea[aria-hidden=null]')!;
      const shadow = container.querySelector('textarea[aria-hidden=true]')!;
      setLayout(input, shadow, {
        getComputedStyle: {
          boxSizing: 'border-box',
          paddingTop: `${padding}px`,
        },
        scrollHeight: 30,
        lineHeight: 15,
      });
      forceUpdate();
      expect(input.style).to.have.property('height', `${30 + padding}px`);
      expect(input.style).to.have.property('overflow', 'hidden');
    });

    it('should have at least height of "minRows"', () => {
      const minRows = 3;
      const lineHeight = 15;
      const { container, forceUpdate } = render(<TextareaAutosize minRows={minRows} />);
      const input = container.querySelector<HTMLTextAreaElement>('textarea[aria-hidden=null]')!;
      const shadow = container.querySelector('textarea[aria-hidden=true]')!;
      setLayout(input, shadow, {
        getComputedStyle: {
          boxSizing: 'content-box',
        },
        scrollHeight: 30,
        lineHeight,
      });
      forceUpdate();
      expect(input.style).to.have.property('height', `${lineHeight * minRows}px`);
      expect(input.style).to.have.property('overflow', '');
    });

    it('should have at max "maxRows" rows', () => {
      const maxRows = 3;
      const lineHeight = 15;
      const { container, forceUpdate } = render(<TextareaAutosize maxRows={maxRows} />);
      const input = container.querySelector<HTMLTextAreaElement>('textarea[aria-hidden=null]')!;
      const shadow = container.querySelector('textarea[aria-hidden=true]')!;
      setLayout(input, shadow, {
        getComputedStyle: {
          boxSizing: 'content-box',
        },
        scrollHeight: 100,
        lineHeight,
      });
      forceUpdate();
      expect(input.style).to.have.property('height', `${lineHeight * maxRows}px`);
      expect(input.style).to.have.property('overflow', '');
    });

    it('should show scrollbar when having more rows than "maxRows"', () => {
      const maxRows = 3;
      const lineHeight = 15;
      const { container, forceUpdate } = render(<TextareaAutosize maxRows={maxRows} />);
      const input = container.querySelector<HTMLTextAreaElement>('textarea[aria-hidden=null]')!;
      const shadow = container.querySelector('textarea[aria-hidden=true]')!;
      setLayout(input, shadow, {
        getComputedStyle: {
          boxSizing: 'border-box',
        },
        scrollHeight: lineHeight * 2,
        lineHeight,
      });
      forceUpdate();
      expect(input.style).to.have.property('height', `${lineHeight * 2}px`);
      expect(input.style).to.have.property('overflow', 'hidden');
      setLayout(input, shadow, {
        getComputedStyle: {
          boxSizing: 'border-box',
        },
        scrollHeight: lineHeight * 3,
        lineHeight,
      });
      forceUpdate();
      expect(input.style).to.have.property('height', `${lineHeight * 3}px`);
      expect(input.style).to.have.property('overflow', 'hidden');
      setLayout(input, shadow, {
        getComputedStyle: {
          boxSizing: 'border-box',
        },
        scrollHeight: lineHeight * 4,
        lineHeight,
      });
      forceUpdate();
      expect(input.style).to.have.property('height', `${lineHeight * 3}px`);
      expect(input.style).to.have.property('overflow', '');
    });

    it('should update its height when the "maxRows" prop changes', () => {
      const lineHeight = 15;
      const { container, forceUpdate, setProps } = render(<TextareaAutosize maxRows={3} />);
      const input = container.querySelector<HTMLTextAreaElement>('textarea[aria-hidden=null]')!;
      const shadow = container.querySelector('textarea[aria-hidden=true]')!;
      setLayout(input, shadow, {
        getComputedStyle: {
          boxSizing: 'content-box',
        },
        scrollHeight: 100,
        lineHeight,
      });
      forceUpdate();
      expect(input.style).to.have.property('height', `${lineHeight * 3}px`);
      expect(input.style).to.have.property('overflow', '');
      setProps({ maxRows: 2 });
      expect(input.style).to.have.property('height', `${lineHeight * 2}px`);
      expect(input.style).to.have.property('overflow', '');
    });

    it('should not sync height if container width is 0px', () => {
      const lineHeight = 15;
      const { container, forceUpdate } = render(<TextareaAutosize />);
      const input = container.querySelector<HTMLTextAreaElement>('textarea[aria-hidden=null]')!;
      const shadow = container.querySelector('textarea[aria-hidden=true]')!;

      setLayout(input, shadow, {
        getComputedStyle: {
          boxSizing: 'content-box',
        },
        scrollHeight: lineHeight * 2,
        lineHeight,
      });
      forceUpdate();

      expect(input.style).to.have.property('height', `${lineHeight * 2}px`);
      expect(input.style).to.have.property('overflow', 'hidden');

      setLayout(input, shadow, {
        getComputedStyle: {
          boxSizing: 'content-box',
          width: '0px',
        },
        scrollHeight: lineHeight * 3,
        lineHeight,
      });

      forceUpdate();
      expect(input.style).to.have.property('height', `${lineHeight * 2}px`);
      expect(input.style).to.have.property('overflow', 'hidden');
    });

    describe('warnings', () => {
      it('warns if layout is unstable but not crash', () => {
        const { container, forceUpdate } = render(<TextareaAutosize maxRows={3} />);
        const input = container.querySelector<HTMLTextAreaElement>('textarea[aria-hidden=null]')!;
        const shadow = container.querySelector('textarea[aria-hidden=true]')!;
        let index = 0;
        setLayout(input, shadow, {
          getComputedStyle: {
            boxSizing: 'content-box',
          },
          scrollHeight: 100,
          lineHeight: () => {
            index += 1;
            return index;
          },
        });

        expect(() => {
          forceUpdate();
        }).toErrorDev([
          'MUI: Too many re-renders.',
          !strictModeDoubleLoggingSuppressed && 'MUI: Too many re-renders.',
          !strictModeDoubleLoggingSuppressed && 'MUI: Too many re-renders.',
        ]);
      });
    });
  });
});
