import { expect } from 'chai';
import { spy } from 'sinon';
import { act, createRenderer, isJsdom } from '@mui/internal-test-utils';
import Fade from '@mui/material/Fade';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Transition from '../internal/Transition';
import describeConformance from '../../test/describeConformance';
import describeTransitionConformance from '../../test/describeTransitionConformance';

describe('<Fade />', () => {
  const { clock, render } = createRenderer();

  const defaultProps = {
    in: true,
    children: <div />,
  };

  describeConformance(<Fade {...defaultProps} />, () => ({
    render,
    classes: {},
    inheritComponent: Transition,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp', 'themeDefaultProps', 'themeStyleOverrides', 'themeVariants'],
  }));

  describeTransitionConformance('Fade', () => ({
    Component: Fade,
    render,
    clock,
    lifecycle: {
      assertEnter: (node) => {
        expect(node.style.transition).to.match(
          /opacity 225ms cubic-bezier\(0.4, 0, 0.2, 1\)( 0ms)?/,
        );
      },
      assertExit: (node) => {
        expect(node.style.transition).to.match(
          /opacity 195ms cubic-bezier\(0.4, 0, 0.2, 1\)( 0ms)?/,
        );
      },
    },
    themeDuration: {
      testPropTimeout: true,
      renderElement: (props) => (
        <Fade in appear {...props}>
          <div data-testid="child">Foo</div>
        </Fade>
      ),
    },
    reducedMotion: {
      assertReducedTiming: (node) => {
        if (isJsdom()) {
          expect(node.style.transition).to.include('0ms');
        } else {
          expect(node.style.transitionDuration).to.equal('0ms');
          expect(node.style.transitionDelay).to.equal('0ms');
        }
      },
      testReflow: true,
      testOptOut: true,
      testNoDomPropLeak: true,
    },
  }));

  describe('prop: appear', () => {
    it('should work when initially hidden, appear=true', () => {
      const { container } = render(
        <Fade in={false} appear>
          <div>Foo</div>
        </Fade>,
      );

      const element = container.querySelector('div');

      expect(element).toHaveInlineStyle({ opacity: '0' });
      expect(element).toHaveInlineStyle({ visibility: 'hidden' });
    });

    it('should work when initially hidden, appear=false', () => {
      const { container } = render(
        <Fade in={false} appear={false}>
          <div>Foo</div>
        </Fade>,
      );

      const element = container.querySelector('div');

      expect(element).toHaveInlineStyle({ opacity: '0' });
      expect(element).toHaveInlineStyle({ visibility: 'hidden' });
    });
  });

  describe('reduced motion: system', () => {
    clock.withFakeTimers();

    let originalMatchMedia;

    beforeEach(() => {
      originalMatchMedia = window.matchMedia;
      window.matchMedia = () => ({
        matches: false,
        media: '(prefers-reduced-motion: reduce)',
        onchange: null,
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => true,
      });
    });

    afterEach(() => {
      window.matchMedia = originalMatchMedia;
    });

    it('uses reduced timing for the initial appear transition before the media query resolves', () => {
      const handleEntered = spy();
      const theme = createTheme({
        motion: {
          reducedMotion: 'system',
        },
      });

      const { container } = render(
        <ThemeProvider theme={theme}>
          <Fade in appear timeout={250} onEntered={handleEntered}>
            <div>Foo</div>
          </Fade>
        </ThemeProvider>,
      );

      const element = container.querySelector('div');

      if (isJsdom()) {
        expect(element.style.transition).to.include('0ms');
      } else {
        expect(element.style.transitionDuration).to.equal('0ms');
      }
      expect(handleEntered.callCount).to.equal(0);

      act(() => {
        clock.tick(0);
      });

      expect(handleEntered.callCount).to.equal(1);
    });
  });
});
