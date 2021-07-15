import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createClientRender } from 'test/utils';
import Collapse from '@material-ui/core/Collapse';
import Fade from '@material-ui/core/Fade';
import Grow from '@material-ui/core/Grow';
import Slide from '@material-ui/core/Slide';
import Zoom from '@material-ui/core/Zoom';
import Popper from '@material-ui/core/Popper';

describe('<Popper />', () => {
  let isSafari;
  const render = createClientRender();

  before(function beforeHook() {
    // JSDOM has neither layout nor window.scrollTo
    if (/jsdom/.test(window.navigator.userAgent)) {
      this.skip();
    }

    isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  });

  let originalScrollX;
  let originalScrollY;
  beforeEach(() => {
    originalScrollX = window.screenX;
    originalScrollY = window.scrollY;
  });
  afterEach(() => {
    window.scrollTo(originalScrollX, originalScrollY);
  });

  describe('children layout integration', () => {
    function BottomAnchoredPopper(props) {
      const [anchorEl, anchorElRef] = React.useState(null);

      React.useEffect(() => {
        if (anchorEl !== null) {
          window.scrollTo(0, anchorEl.getBoundingClientRect().top);
        }
      }, [anchorEl]);

      return (
        <React.Fragment>
          <div style={{ height: '200vh' }}>Spacer</div>
          <button ref={anchorElRef}>Anchor</button>
          <Popper anchorEl={anchorEl} {...props} />
        </React.Fragment>
      );
    }

    it('autoFocus does not scroll', () => {
      const handleFocus = spy();
      const { setProps } = render(
        <BottomAnchoredPopper open={false}>
          <div>
            <button autoFocus onFocus={handleFocus}>
              will be focused
            </button>
          </div>
        </BottomAnchoredPopper>,
      );
      expect(handleFocus.callCount).to.equal(0);
      const scrollYBeforeOpen = window.scrollY;

      setProps({ open: true });

      expect(handleFocus.callCount).to.equal(1);
      expect(window.scrollY, 'focus caused scroll').to.equal(scrollYBeforeOpen);
    });

    it('focus during layout effect does not scroll', () => {
      const handleFocus = spy();
      function LayoutEffectFocusButton(props) {
        const buttonRef = React.useRef(null);
        React.useLayoutEffect(() => {
          buttonRef.current.focus();
        }, []);
        return <button {...props} ref={buttonRef} />;
      }
      const { setProps } = render(
        <BottomAnchoredPopper open={false}>
          <div>
            <LayoutEffectFocusButton onFocus={handleFocus}>will be focused</LayoutEffectFocusButton>
          </div>
        </BottomAnchoredPopper>,
      );
      expect(handleFocus.callCount).to.equal(0);
      const scrollYBeforeOpen = window.scrollY;

      setProps({ open: true });

      expect(handleFocus.callCount).to.equal(1);
      expect(window.scrollY, 'focus caused scroll').to.equal(scrollYBeforeOpen);
    });

    it('focus during passive effects do not scroll', () => {
      const handleFocus = spy();
      function EffectFocusButton(props) {
        const buttonRef = React.useRef(null);
        React.useEffect(() => {
          buttonRef.current.focus();
        }, []);
        return <button {...props} ref={buttonRef} />;
      }
      const { setProps } = render(
        <BottomAnchoredPopper open={false}>
          <div>
            <EffectFocusButton onFocus={handleFocus}>will be focused</EffectFocusButton>
          </div>
        </BottomAnchoredPopper>,
      );
      expect(handleFocus.callCount).to.equal(0);
      const scrollYBeforeOpen = window.scrollY;

      setProps({ open: true });

      expect(handleFocus.callCount).to.equal(1);
      if (isSafari) {
        expect(window.scrollY, 'focus caused scroll').to.equal(scrollYBeforeOpen);
      } else {
        // FIXME: should equal
        expect(window.scrollY, 'focus caused scroll').not.to.equal(scrollYBeforeOpen);
      }
    });

    [
      [Collapse, 'Collapse'],
      [Fade, 'Fade'],
      [Grow, 'Grow'],
      [Slide, 'Slide'],
      [Zoom, 'Zoom'],
    ].forEach(([TransitionComponent, name]) => {
      describe(`in TransitionComponent ${name}`, () => {
        it('autoFocus does not scroll', () => {
          const handleFocus = spy();
          const { setProps } = render(
            <BottomAnchoredPopper open={false} transition>
              {({ TransitionProps }) => {
                return (
                  <TransitionComponent {...TransitionProps}>
                    <div>
                      <button autoFocus onFocus={handleFocus}>
                        will be focused
                      </button>
                    </div>
                  </TransitionComponent>
                );
              }}
            </BottomAnchoredPopper>,
          );
          expect(handleFocus.callCount).to.equal(0);
          const scrollYBeforeOpen = window.scrollY;

          setProps({ open: true });

          expect(handleFocus.callCount).to.equal(1);
          expect(window.scrollY, 'focus caused scroll').to.equal(scrollYBeforeOpen);
        });

        it('focus during layout effect does not scroll', () => {
          const handleFocus = spy();
          function LayoutEffectFocusButton(props) {
            const buttonRef = React.useRef(null);
            React.useLayoutEffect(() => {
              buttonRef.current.focus();
            }, []);
            return <button {...props} ref={buttonRef} />;
          }
          const { setProps } = render(
            <BottomAnchoredPopper open={false} transition>
              {({ TransitionProps }) => {
                return (
                  <TransitionComponent {...TransitionProps}>
                    <div>
                      <LayoutEffectFocusButton onFocus={handleFocus}>
                        will be focused
                      </LayoutEffectFocusButton>
                    </div>
                  </TransitionComponent>
                );
              }}
            </BottomAnchoredPopper>,
          );
          expect(handleFocus.callCount).to.equal(0);
          const scrollYBeforeOpen = window.scrollY;

          setProps({ open: true });

          expect(handleFocus.callCount).to.equal(1);
          expect(window.scrollY, 'focus caused scroll').to.equal(scrollYBeforeOpen);
        });

        it('focus during passive effects do not scroll', () => {
          const handleFocus = spy();
          function EffectFocusButton(props) {
            const buttonRef = React.useRef(null);
            React.useEffect(() => {
              buttonRef.current.focus();
            }, []);
            return <button {...props} ref={buttonRef} />;
          }
          const { setProps } = render(
            <BottomAnchoredPopper open={false} transition>
              {({ TransitionProps }) => {
                return (
                  <TransitionComponent timeout={0} {...TransitionProps}>
                    <div>
                      <EffectFocusButton onFocus={handleFocus}>will be focused</EffectFocusButton>
                    </div>
                  </TransitionComponent>
                );
              }}
            </BottomAnchoredPopper>,
          );
          expect(handleFocus.callCount).to.equal(0);
          const scrollYBeforeOpen = window.scrollY;

          setProps({ open: true });

          expect(handleFocus.callCount).to.equal(1);
          expect(window.scrollY, 'focus caused scroll').to.equal(scrollYBeforeOpen);
        });
      });
    });
  });
});
