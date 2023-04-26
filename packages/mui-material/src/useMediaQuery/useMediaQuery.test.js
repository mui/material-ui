import * as React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  act,
  createRenderer,
  screen,
  RenderCounter,
  strictModeDoubleLoggingSuppressed,
} from 'test/utils';
import mediaQuery from 'css-mediaquery';
import { expect } from 'chai';
import { stub } from 'sinon';

const usesUseSyncExternalStore = React.useSyncExternalStore !== undefined;

function createMatchMedia(width, ref) {
  const listeners = [];
  return (query) => {
    const instance = {
      matches: mediaQuery.match(query, {
        width,
      }),
      // Mocking matchMedia in Safari < 14 where MediaQueryList doesn't inherit from EventTarget
      addListener: (listener) => {
        listeners.push(listener);
      },
      removeListener: (listener) => {
        const index = listeners.indexOf(listener);
        if (index > -1) {
          listeners.splice(index, 1);
        }
      },
    };
    ref.push({
      instance,
      listeners,
    });
    return instance;
  };
}

describe('useMediaQuery', () => {
  const { render, renderToString } = createRenderer();

  describe('without window.matchMedia', () => {
    let originalMatchmedia;
    beforeEach(() => {
      originalMatchmedia = window.matchMedia;
      delete window.matchMedia;
    });
    afterEach(() => {
      window.matchMedia = originalMatchmedia;
    });

    it('should work without window.matchMedia available', () => {
      expect(typeof window.matchMedia).to.equal('undefined');
      function Test() {
        const matches = useMediaQuery('(min-width:100px)');
        return <span data-testid="matches">{`${matches}`}</span>;
      }

      render(<Test />);
      expect(screen.getByTestId('matches').textContent).to.equal('false');
    });
  });

  describe('with window.matchMedia', () => {
    let matchMediaInstances;

    beforeEach(() => {
      matchMediaInstances = [];
      const fakeMatchMedia = createMatchMedia(1200, matchMediaInstances);
      // can't stub nonexistent properties with sinon
      // jsdom does not implement window.matchMedia
      if (window.matchMedia === undefined) {
        window.matchMedia = fakeMatchMedia;
        window.matchMedia.restore = () => {
          delete window.matchMedia;
        };
      } else {
        stub(window, 'matchMedia').callsFake(fakeMatchMedia);
      }
    });

    afterEach(() => {
      window.matchMedia.restore();
    });

    describe('option: defaultMatches', () => {
      it('should be false by default', () => {
        const getRenderCountRef = React.createRef();
        function Test() {
          const matches = useMediaQuery('(min-width:2000px)');
          return (
            <RenderCounter ref={getRenderCountRef}>
              <span data-testid="matches">{`${matches}`}</span>
            </RenderCounter>
          );
        }

        render(<Test />);
        expect(screen.getByTestId('matches').textContent).to.equal('false');
        expect(getRenderCountRef.current()).to.equal(1);
      });

      it('should take the option into account', () => {
        const getRenderCountRef = React.createRef();
        function Test() {
          const matches = useMediaQuery('(min-width:2000px)', {
            defaultMatches: true,
          });
          return (
            <RenderCounter ref={getRenderCountRef}>
              <span data-testid="matches">{`${matches}`}</span>
            </RenderCounter>
          );
        }

        render(<Test />);
        expect(screen.getByTestId('matches').textContent).to.equal('false');
        expect(getRenderCountRef.current()).to.equal(usesUseSyncExternalStore ? 1 : 2);
      });
    });

    describe('option: noSsr', () => {
      it('should render once if the default value match the expectation', () => {
        const getRenderCountRef = React.createRef();
        function Test() {
          const matches = useMediaQuery('(min-width:2000px)', {
            defaultMatches: false,
          });

          return (
            <RenderCounter ref={getRenderCountRef}>
              <span data-testid="matches">{`${matches}`}</span>
            </RenderCounter>
          );
        }

        render(<Test />);
        expect(screen.getByTestId('matches').textContent).to.equal('false');
        expect(getRenderCountRef.current()).to.equal(1);
      });

      it('render API: should render once if the default value does not match the expectation', () => {
        const getRenderCountRef = React.createRef();
        function Test() {
          const matches = useMediaQuery('(min-width:2000px)', {
            defaultMatches: true,
          });

          return (
            <RenderCounter ref={getRenderCountRef}>
              <span data-testid="matches">{`${matches}`}</span>
            </RenderCounter>
          );
        }

        render(<Test />);
        expect(screen.getByTestId('matches').textContent).to.equal('false');
        expect(getRenderCountRef.current()).to.equal(usesUseSyncExternalStore ? 1 : 2);
      });

      it('render API: should render once if the default value does not match the expectation but `noSsr` is enabled', () => {
        const getRenderCountRef = React.createRef();
        function Test() {
          const matches = useMediaQuery('(min-width:2000px)', {
            defaultMatches: true,
            noSsr: true,
          });

          return (
            <RenderCounter ref={getRenderCountRef}>
              <span data-testid="matches">{`${matches}`}</span>
            </RenderCounter>
          );
        }

        render(<Test />);
        expect(screen.getByTestId('matches').textContent).to.equal('false');
        expect(getRenderCountRef.current()).to.equal(1);
      });

      it('hydrate API: should render twice if the default value does not match the expectation', () => {
        const getRenderCountRef = React.createRef();
        function Test() {
          const matches = useMediaQuery('(min-width:2000px)', {
            defaultMatches: true,
          });

          return (
            <RenderCounter ref={getRenderCountRef}>
              <span data-testid="matches">{`${matches}`}</span>
            </RenderCounter>
          );
        }

        const { hydrate } = renderToString(<Test />);
        hydrate();
        expect(screen.getByTestId('matches').textContent).to.equal('false');
        expect(getRenderCountRef.current()).to.equal(2);
      });

      it('hydrate API: should render once if the default value does not match the expectation but `noSsr` is enabled', () => {
        const getRenderCountRef = React.createRef();
        function Test() {
          const matches = useMediaQuery('(min-width:2000px)', {
            defaultMatches: true,
            noSsr: true,
          });

          return (
            <RenderCounter ref={getRenderCountRef}>
              <span data-testid="matches">{`${matches}`}</span>
            </RenderCounter>
          );
        }

        const { hydrate } = renderToString(<Test />);
        hydrate();
        expect(screen.getByTestId('matches').textContent).to.equal('false');
        expect(getRenderCountRef.current()).to.equal(1);
      });
    });

    it('should try to reconcile each time', () => {
      const getRenderCountRef = React.createRef();
      function Test() {
        const matches = useMediaQuery('(min-width:2000px)', {
          defaultMatches: true,
        });

        return (
          <RenderCounter ref={getRenderCountRef}>
            <span data-testid="matches">{`${matches}`}</span>
          </RenderCounter>
        );
      }

      const { unmount } = render(<Test />);
      expect(screen.getByTestId('matches').textContent).to.equal('false');
      expect(getRenderCountRef.current()).to.equal(usesUseSyncExternalStore ? 1 : 2);

      unmount();

      render(<Test />);
      expect(screen.getByTestId('matches').textContent).to.equal('false');
      expect(getRenderCountRef.current()).to.equal(usesUseSyncExternalStore ? 1 : 2);
    });

    it('should be able to change the query dynamically', () => {
      const getRenderCountRef = React.createRef();
      function Test(props) {
        const matches = useMediaQuery(props.query, {
          defaultMatches: true,
        });

        return (
          <RenderCounter ref={getRenderCountRef}>
            <span data-testid="matches">{`${matches}`}</span>
          </RenderCounter>
        );
      }
      Test.propTypes = {
        query: PropTypes.string.isRequired,
      };

      const { setProps } = render(<Test query="(min-width:2000px)" />);
      expect(screen.getByTestId('matches').textContent).to.equal('false');
      expect(getRenderCountRef.current()).to.equal(usesUseSyncExternalStore ? 1 : 2);
      setProps({ query: '(min-width:100px)' });
      expect(screen.getByTestId('matches').textContent).to.equal('true');
      expect(getRenderCountRef.current()).to.equal(usesUseSyncExternalStore ? 2 : 4);
    });

    it('should observe the media query', () => {
      const getRenderCountRef = React.createRef();
      function Test(props) {
        const matches = useMediaQuery(props.query);

        return (
          <RenderCounter ref={getRenderCountRef}>
            <span data-testid="matches">{`${matches}`}</span>
          </RenderCounter>
        );
      }
      Test.propTypes = {
        query: PropTypes.string.isRequired,
      };

      render(<Test query="(min-width:2000px)" />);
      expect(getRenderCountRef.current()).to.equal(1);
      expect(screen.getByTestId('matches').textContent).to.equal('false');

      act(() => {
        matchMediaInstances[matchMediaInstances.length - 1].instance.matches = true;
        matchMediaInstances[matchMediaInstances.length - 1].listeners[0]();
      });
      expect(screen.getByTestId('matches').textContent).to.equal('true');
      expect(getRenderCountRef.current()).to.equal(2);
    });
  });

  describe('server-side', () => {
    it('should use the ssr match media ponyfill', () => {
      function MyComponent() {
        const matches = useMediaQuery('(min-width:2000px)');

        return <span>{`${matches}`}</span>;
      }

      function Test() {
        const ssrMatchMedia = (query) => ({
          matches: mediaQuery.match(query, {
            width: 3000,
          }),
        });

        return (
          <ThemeProvider
            theme={{ components: { MuiUseMediaQuery: { defaultProps: { ssrMatchMedia } } } }}
          >
            <MyComponent />
          </ThemeProvider>
        );
      }

      const { container } = renderToString(<Test />);

      expect(container.firstChild).to.have.text('true');
    });
  });

  describe('warnings', () => {
    it('warns on invalid `query` argument', () => {
      function MyComponent() {
        useMediaQuery(() => '(min-width:2000px)');
        return null;
      }

      expect(() => {
        render(<MyComponent />);
      }).toErrorDev([
        'MUI: The `query` argument provided is invalid',
        !strictModeDoubleLoggingSuppressed && 'MUI: The `query` argument provided is invalid',
      ]);
    });
  });
});
