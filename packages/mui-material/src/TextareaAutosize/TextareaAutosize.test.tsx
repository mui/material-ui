import * as React from 'react';
import { expect } from 'chai';
import sinon, { spy, stub } from 'sinon';
import { act, screen, waitFor, createRenderer, fireEvent } from '@mui/internal-test-utils';
import TextareaAutosize from '@mui/material/TextareaAutosize';

function getStyleValue(value: string) {
  return parseInt(value, 10) || 0;
}

// TODO: merge into a shared test helpers.
// MUI X already have one under mui-x/test/utils/helperFn.ts
function sleep(duration: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

async function raf() {
  return new Promise<void>((resolve) => {
    // Chrome and Safari have a bug where calling rAF once returns the current
    // frame instead of the next frame, so we need to call a double rAF here.
    // See crbug.com/675795 for more.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        resolve();
      });
    });
  });
}

describe('<TextareaAutosize />', () => {
  const { clock, render } = createRenderer();

  // For https://github.com/mui/material-ui/pull/33238
  it('should not crash when unmounting with Suspense', async () => {
    const LazyRoute = React.lazy(() => {
      // Force react to show fallback suspense
      return new Promise<any>((resolve) => {
        setTimeout(() => {
          resolve({
            default: () => <div>LazyRoute</div>,
          });
        }, 0);
      });
    });

    function App() {
      const [toggle, setToggle] = React.useState(false);

      return (
        <React.Suspense fallback={null}>
          <button onClick={() => setToggle((r) => !r)}>Toggle</button>
          {toggle ? <LazyRoute /> : <TextareaAutosize />}
        </React.Suspense>
      );
    }

    render(<App />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    await waitFor(() => {
      expect(screen.queryByText('LazyRoute')).not.to.equal(null);
    });
  });

  // For https://github.com/mui/material-ui/pull/33253
  it('should update height without an infinite rendering loop', async () => {
    function App() {
      const [value, setValue] = React.useState('Controlled');

      const handleChange = (event: React.ChangeEvent<any>) => {
        setValue(event.target.value);
      };

      return <TextareaAutosize value={value} onChange={handleChange} />;
    }
    const { container } = render(<App />);
    const input = container.querySelector<HTMLTextAreaElement>('textarea')!;
    act(() => {
      input.focus();
    });
    const activeElement = document.activeElement!;
    // set the value of the input to be 1 larger than its content width
    fireEvent.change(activeElement, {
      target: { value: 'Controlled\n' },
    });
    await sleep(0);
    fireEvent.change(activeElement, {
      target: { value: 'Controlled\n\n' },
    });
  });

  // For https://github.com/mui/material-ui/pull/37135
  it('should update height without delay', async function test() {
    if (/jsdom/.test(window.navigator.userAgent)) {
      // It depends on ResizeObserver
      this.skip();
    }

    function App() {
      const ref = React.useRef<HTMLTextAreaElement>(null);
      return (
        <div>
          <button
            onClick={() => {
              ref.current!.style.width = '250px';
            }}
          >
            change
          </button>
          <div>
            <TextareaAutosize
              ref={ref}
              style={{
                width: 150,
                padding: 0,
                fontSize: 14,
                lineHeight: '15px',
                border: '1px solid',
              }}
              defaultValue="qdzqzd qzd qzd qzd qz dqz"
            />
          </div>
        </div>
      );
    }
    const { container } = render(<App />);
    const input = container.querySelector<HTMLTextAreaElement>('textarea')!;
    const button = screen.getByRole('button');
    expect(parseInt(input.style.height, 10)).to.be.within(30, 32);
    fireEvent.click(button);
    await raf();
    await raf();
    expect(parseInt(input.style.height, 10)).to.be.within(15, 17);
  });

  describe('layout', () => {
    const getComputedStyleStub = new Map<Element, Partial<CSSStyleDeclaration>>();
    function setLayout(
      input: HTMLTextAreaElement,
      shadow: Element,
      {
        getComputedStyle,
        scrollHeight: scrollHeightArg,
        lineHeight: lineHeightArg,
      }: {
        getComputedStyle: Partial<CSSStyleDeclaration>;
        scrollHeight?: number | (() => number);
        lineHeight?: number | (() => number);
      },
    ) {
      const lineHeight = typeof lineHeightArg === 'function' ? lineHeightArg : () => lineHeightArg;
      const scrollHeight =
        typeof scrollHeightArg === 'function' ? scrollHeightArg : () => scrollHeightArg;

      getComputedStyleStub.set(input, getComputedStyle);

      let index = 0;
      stub(shadow, 'scrollHeight').get(() => {
        index += 1;
        return index % 2 === 1 ? scrollHeight() : lineHeight();
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

    it('should compute the correct height if padding-right is greater than 0px', () => {
      const paddingRight = 50;
      const { container, forceUpdate } = render(<TextareaAutosize style={{ paddingRight }} />);
      const input = container.querySelector<HTMLTextAreaElement>('textarea[aria-hidden=null]')!;
      const shadow = container.querySelector('textarea[aria-hidden=true]')! as HTMLTextAreaElement;
      const contentWidth = 100;
      const lineHeight = 15;
      const width = contentWidth + paddingRight;
      setLayout(input, shadow, {
        getComputedStyle: {
          boxSizing: 'border-box',
          width: `${width}px`,
        },
        scrollHeight: () => {
          // assuming that the width of the word is 1px, and substract the width of the paddingRight
          const lineNum = Math.ceil(
            input.value.length / (width - getStyleValue(shadow.style.paddingRight)),
          );
          return lineNum * lineHeight;
        },
        lineHeight,
      });

      act(() => {
        input.focus();
      });
      const activeElement = document.activeElement!;
      // set the value of the input to be 1 larger than its content width
      fireEvent.change(activeElement, {
        target: { value: new Array(contentWidth + 1).fill('a').join('') },
      });
      forceUpdate();

      // the input should be 2 lines
      expect(input.style).to.have.property('height', `${lineHeight * 2}px`);
    });
  });

  it('should apply the inline styles using the "style" prop', function test() {
    if (/jsdom/.test(window.navigator.userAgent)) {
      this.skip();
    }

    const { container } = render(<TextareaAutosize style={{ backgroundColor: 'yellow' }} />);
    const input = container.querySelector<HTMLTextAreaElement>('textarea')!;

    expect(input).toHaveComputedStyle({
      backgroundColor: 'rgb(255, 255, 0)',
    });
  });
});
