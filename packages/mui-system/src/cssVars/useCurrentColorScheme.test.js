import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createClientRender, fireEvent, act, screen } from 'test/utils';
import {
  DEFAULT_MODE_STORAGE_KEY,
  DEFAULT_COLOR_SCHEME_STORAGE_KEY,
} from './getInitColorSchemeScript';
import useCurrentColorScheme, { getColorScheme } from './useCurrentColorScheme';

describe('useCurrentColorScheme', () => {
  const render = createClientRender();
  let storage = {};
  let storageHandler = {};
  let trigger;

  const createMatchMedia = (matches) => () => ({
    matches,
    addListener: (listener) => {
      trigger = listener;
    },
    removeListener: () => {},
  });
  before(() => {
    // Create mocks of localStorage getItem and setItem functions
    Object.defineProperty(global, 'localStorage', {
      value: {
        getItem: spy((key) => storage[key]),
        setItem: spy((key, value) => {
          storage[key] = value;
        }),
      },
      configurable: true,
    });
    window.addEventListener = (key, handler) => {
      storageHandler[key] = handler;
    };
    window.removeEventListener = (key) => {
      delete storageHandler[key];
    };
  });

  beforeEach(() => {
    // clear the localstorage
    storage = {};
    storageHandler = {};
    window.matchMedia = createMatchMedia(false);
  });

  describe('getColorScheme', () => {
    it('use dayColorScheme given mode=day', () => {
      expect(getColorScheme({ mode: 'day', dayColorScheme: 'light' })).to.equal('light');
    });

    it('use nightColorScheme given mode=night', () => {
      expect(getColorScheme({ mode: 'night', nightColorScheme: 'dark' })).to.equal('dark');
    });

    it('use dayColorScheme given mode=system, systemMode=day', () => {
      expect(
        getColorScheme({ mode: 'system', systemMode: 'day', dayColorScheme: 'light' }),
      ).to.equal('light');
    });

    it('use dayColorScheme given mode=system, systemMode=night', () => {
      expect(
        getColorScheme({ mode: 'system', systemMode: 'night', nightColorScheme: 'dark' }),
      ).to.equal('dark');
    });

    it('return undefined if no conditions are matched', () => {
      expect(
        getColorScheme({ mode: undefined, dayColorScheme: 'light', nightColorScheme: 'dark' }),
      ).to.equal(undefined);
      expect(
        getColorScheme({ mode: 'unknown', dayColorScheme: 'light', nightColorScheme: 'dark' }),
      ).to.equal(undefined);
      expect(
        getColorScheme({
          mode: 'system',
          systemMode: undefined,
          dayColorScheme: 'light',
          nightColorScheme: 'dark',
        }),
      ).to.equal(undefined);
    });
  });

  describe('Client', () => {
    it('has default mode=`day`', () => {
      const Data = () => {
        const data = useCurrentColorScheme({
          defaultDayColorScheme: 'light',
          defaultNightColorScheme: 'dark',
          supportedColorSchemes: ['light', 'dark'],
        });
        return <div>{JSON.stringify(data)}</div>;
      };
      const { container } = render(<Data />);

      expect(JSON.parse(container.firstChild.textContent)).to.deep.equal({
        mode: 'day',
        dayColorScheme: 'light',
        nightColorScheme: 'dark',
        colorScheme: 'light',
      });
    });

    it('defaultMode=`night`', () => {
      const Data = () => {
        const data = useCurrentColorScheme({
          defaultMode: 'night',
          defaultDayColorScheme: 'light',
          defaultNightColorScheme: 'dark',
          supportedColorSchemes: ['light', 'dark'],
        });
        return <div>{JSON.stringify(data)}</div>;
      };
      const { container } = render(<Data />);

      expect(JSON.parse(container.firstChild.textContent)).to.deep.equal({
        mode: 'night',
        dayColorScheme: 'light',
        nightColorScheme: 'dark',
        colorScheme: 'dark',
      });
    });

    it('defaultMode=`system`', () => {
      const Data = () => {
        const data = useCurrentColorScheme({
          defaultMode: 'system',
          defaultDayColorScheme: 'light',
          defaultNightColorScheme: 'dark',
          supportedColorSchemes: ['light', 'dark'],
        });
        return <div>{JSON.stringify(data)}</div>;
      };
      const { container } = render(<Data />);

      expect(JSON.parse(container.firstChild.textContent)).to.deep.equal({
        mode: 'system',
        systemMode: 'day',
        dayColorScheme: 'light',
        nightColorScheme: 'dark',
        colorScheme: 'light',
      });

      act(() => {
        trigger({ matches: true }); // system matches 'prefers-color-scheme: dark'
      });

      expect(JSON.parse(container.firstChild.textContent)).to.deep.equal({
        mode: 'system',
        systemMode: 'night',
        dayColorScheme: 'light',
        nightColorScheme: 'dark',
        colorScheme: 'dark',
      });
    });

    it('change to `night` mode', () => {
      const Data = () => {
        const { setMode, ...data } = useCurrentColorScheme({
          defaultDayColorScheme: 'light',
          defaultNightColorScheme: 'dark',
          supportedColorSchemes: ['light', 'dark'],
        });
        return <button onClick={() => setMode('night')}>{JSON.stringify(data)}</button>;
      };
      const { container } = render(<Data />);

      fireEvent.click(container.firstChild);

      expect(JSON.parse(container.firstChild.textContent)).to.deep.equal({
        mode: 'night',
        dayColorScheme: 'light',
        nightColorScheme: 'dark',
        colorScheme: 'dark',
      });
    });

    it('change to `system` mode', () => {
      window.matchMedia = createMatchMedia(true); // system matches 'prefers-color-scheme: dark'
      const Data = () => {
        const { setMode, ...data } = useCurrentColorScheme({
          defaultDayColorScheme: 'light',
          defaultNightColorScheme: 'dark',
          supportedColorSchemes: ['light', 'dark'],
        });
        return <button onClick={() => setMode('system')}>{JSON.stringify(data)}</button>;
      };
      const { container } = render(<Data />);

      fireEvent.click(container.firstChild);

      expect(JSON.parse(container.firstChild.textContent)).to.deep.equal({
        mode: 'system',
        systemMode: 'night',
        dayColorScheme: 'light',
        nightColorScheme: 'dark',
        colorScheme: 'dark',
      });
    });

    it('reset mode', () => {
      const Data = () => {
        const { setMode, ...data } = useCurrentColorScheme({
          defaultDayColorScheme: 'light',
          defaultNightColorScheme: 'dark',
          supportedColorSchemes: ['light', 'dark'],
        });
        return (
          <div>
            <div data-testid="data">{JSON.stringify(data)}</div>
            <button data-testid="night" onClick={() => setMode('night')} />
            <button data-testid="reset" onClick={() => setMode(null)} />
          </div>
        );
      };
      render(<Data />);

      fireEvent.click(screen.getByTestId('night'));

      fireEvent.click(screen.getByTestId('reset'));

      expect(JSON.parse(screen.getByTestId('data').textContent)).to.deep.equal({
        mode: 'day',
        dayColorScheme: 'light',
        nightColorScheme: 'dark',
        colorScheme: 'light',
      });
    });

    it('change colorScheme when mode is `day` should change `dayColorScheme`', () => {
      const Data = () => {
        const { setColorScheme, ...data } = useCurrentColorScheme({
          defaultDayColorScheme: 'light',
          defaultNightColorScheme: 'dark',
          supportedColorSchemes: ['light', 'paper', 'dark'],
        });
        return <button onClick={() => setColorScheme('paper')}>{JSON.stringify(data)}</button>;
      };
      const { container } = render(<Data />);

      fireEvent.click(container.firstChild);

      expect(JSON.parse(container.firstChild.textContent)).to.deep.equal({
        mode: 'day',
        dayColorScheme: 'paper',
        nightColorScheme: 'dark',
        colorScheme: 'paper',
      });
    });

    it('change colorScheme when mode is `system` should look at systemMode', () => {
      window.matchMedia = createMatchMedia(true); // system matches 'prefers-color-scheme: dark'
      const Data = () => {
        const { setColorScheme, ...data } = useCurrentColorScheme({
          defaultMode: 'system',
          defaultDayColorScheme: 'light',
          defaultNightColorScheme: 'dark',
          supportedColorSchemes: ['light', 'paper', 'dark', 'dim'],
        });
        return <button onClick={() => setColorScheme('dim')}>{JSON.stringify(data)}</button>;
      };
      const { container } = render(<Data />);

      fireEvent.click(container.firstChild);

      expect(JSON.parse(container.firstChild.textContent)).to.deep.equal({
        mode: 'system',
        systemMode: 'night',
        dayColorScheme: 'light',
        nightColorScheme: 'dim',
        colorScheme: 'dim',
      });
    });

    it('change both day & night color scheme at the same time', () => {
      const Data = () => {
        const { setColorScheme, ...data } = useCurrentColorScheme({
          defaultMode: 'system',
          defaultDayColorScheme: 'light',
          defaultNightColorScheme: 'dark',
          supportedColorSchemes: ['light', 'paper', 'dark', 'dim'],
        });
        return (
          <button
            onClick={() => setColorScheme({ dayColorScheme: 'paper', nightColorScheme: 'dim' })}
          >
            {JSON.stringify(data)}
          </button>
        );
      };
      const { container } = render(<Data />);

      fireEvent.click(container.firstChild);

      expect(JSON.parse(container.firstChild.textContent)).to.deep.equal({
        mode: 'system',
        systemMode: 'day',
        dayColorScheme: 'paper',
        nightColorScheme: 'dim',
        colorScheme: 'paper',
      });

      act(() => {
        trigger({ matches: true }); // system matches 'prefers-color-scheme: dark'
      });

      expect(JSON.parse(container.firstChild.textContent)).to.deep.equal({
        mode: 'system',
        systemMode: 'night',
        dayColorScheme: 'paper',
        nightColorScheme: 'dim',
        colorScheme: 'dim',
      });
    });

    it('reset colorScheme', () => {
      const Data = () => {
        const { setColorScheme, ...data } = useCurrentColorScheme({
          defaultDayColorScheme: 'light',
          defaultNightColorScheme: 'dark',
          supportedColorSchemes: ['light', 'dark'],
        });
        return (
          <div>
            <div data-testid="data">{JSON.stringify(data)}</div>
            <button data-testid="dark" onClick={() => setColorScheme('dark')} />
            <button data-testid="reset" onClick={() => setColorScheme(null)} />
          </div>
        );
      };
      render(<Data />);

      fireEvent.click(screen.getByTestId('dark'));

      fireEvent.click(screen.getByTestId('reset'));

      expect(JSON.parse(screen.getByTestId('data').textContent)).to.deep.equal({
        mode: 'day',
        dayColorScheme: 'light',
        nightColorScheme: 'dark',
        colorScheme: 'light',
      });
    });

    it('reset day & night colorScheme', () => {
      const Data = () => {
        const { setColorScheme, ...data } = useCurrentColorScheme({
          defaultDayColorScheme: 'light',
          defaultNightColorScheme: 'dark',
          supportedColorSchemes: ['light', 'dark', 'light-dim', 'dark-dim'],
        });
        return (
          <div>
            <div data-testid="data">{JSON.stringify(data)}</div>
            <button
              data-testid="dark"
              onClick={() =>
                setColorScheme({ dayColorScheme: 'light-dim', nightColorScheme: 'dark-dim' })
              }
            />
            <button
              data-testid="reset"
              onClick={() => setColorScheme({ dayColorScheme: null, nightColorScheme: null })}
            />
          </div>
        );
      };
      render(<Data />);

      fireEvent.click(screen.getByTestId('dark'));

      fireEvent.click(screen.getByTestId('reset'));

      expect(JSON.parse(screen.getByTestId('data').textContent)).to.deep.equal({
        mode: 'day',
        dayColorScheme: 'light',
        nightColorScheme: 'dark',
        colorScheme: 'light',
      });
    });
  });

  describe('Storage', () => {
    it('save mode', () => {
      const Data = () => {
        useCurrentColorScheme({
          defaultMode: 'system',
          defaultDayColorScheme: 'light',
          defaultNightColorScheme: 'dark',
          supportedColorSchemes: ['light', 'dark'],
        });
        return null;
      };
      render(<Data />);
      expect(global.localStorage.setItem.calledWith(DEFAULT_MODE_STORAGE_KEY, 'system')).to.equal(
        true,
      );
    });

    it('save dayColorScheme and nightColorScheme', () => {
      const Data = () => {
        const { setMode, setColorScheme, ...data } = useCurrentColorScheme({
          defaultMode: 'system',
          defaultDayColorScheme: 'light',
          defaultNightColorScheme: 'dark',
          supportedColorSchemes: ['light', 'dark', 'dim'],
        });
        return (
          <button
            onClick={() => {
              setMode('night');
              setColorScheme('dim');
            }}
          >
            {JSON.stringify(data)}
          </button>
        );
      };
      render(<Data />);

      expect(global.localStorage.setItem.calledWith(DEFAULT_MODE_STORAGE_KEY, 'night')).to.equal(
        true,
      );
      expect(
        global.localStorage.setItem.calledWith(`${DEFAULT_COLOR_SCHEME_STORAGE_KEY}-night`, 'dim'),
      ).to.equal(true);
    });

    it('use mode from localStorage if exists', () => {
      storage[DEFAULT_MODE_STORAGE_KEY] = 'night';
      const Data = () => {
        const { setMode, setColorScheme, ...data } = useCurrentColorScheme({
          defaultDayColorScheme: 'light',
          defaultNightColorScheme: 'dark',
          supportedColorSchemes: ['light', 'dark'],
        });
        return <div>{JSON.stringify(data)}</div>;
      };
      const { container } = render(<Data />);

      expect(JSON.parse(container.firstChild.textContent)).to.deep.equal({
        mode: 'night',
        dayColorScheme: 'light',
        nightColorScheme: 'dark',
        colorScheme: 'dark',
      });
    });

    it('use mode & colorScheme from localStorage if exists', () => {
      storage[DEFAULT_MODE_STORAGE_KEY] = 'night';
      storage[`${DEFAULT_COLOR_SCHEME_STORAGE_KEY}-night`] = 'dim';
      const Data = () => {
        const { setMode, setColorScheme, ...data } = useCurrentColorScheme({
          defaultDayColorScheme: 'light',
          defaultNightColorScheme: 'dark',
          supportedColorSchemes: ['light', 'dark', 'dim'],
        });
        return <div>{JSON.stringify(data)}</div>;
      };
      const { container } = render(<Data />);

      expect(JSON.parse(container.firstChild.textContent)).to.deep.equal({
        mode: 'night',
        dayColorScheme: 'light',
        nightColorScheme: 'dim',
        colorScheme: 'dim',
      });
    });

    it('storage mode changes from `light` to `dark`', () => {
      const Data = () => {
        const { ...data } = useCurrentColorScheme({
          defaultDayColorScheme: 'light',
          defaultNightColorScheme: 'dark',
          supportedColorSchemes: ['light', 'dark'],
        });
        return <button>{JSON.stringify(data)}</button>;
      };
      const { container } = render(<Data />);

      act(() => {
        storageHandler.storage?.({ key: DEFAULT_MODE_STORAGE_KEY, newValue: 'night' });
      });

      expect(JSON.parse(container.firstChild.textContent)).to.deep.equal({
        mode: 'night',
        dayColorScheme: 'light',
        nightColorScheme: 'dark',
        colorScheme: 'dark',
      });
    });

    it('storage mode changes from `light` to `auto`', () => {
      window.matchMedia = createMatchMedia(true); // system matches 'prefers-color-scheme: dark'
      const Data = () => {
        const { ...data } = useCurrentColorScheme({
          defaultDayColorScheme: 'light',
          defaultNightColorScheme: 'dark',
          supportedColorSchemes: ['light', 'dark'],
        });
        return <button>{JSON.stringify(data)}</button>;
      };
      const { container } = render(<Data />);

      act(() => {
        storageHandler.storage?.({ key: DEFAULT_MODE_STORAGE_KEY, newValue: 'system' });
      });

      expect(JSON.parse(container.firstChild.textContent)).to.deep.equal({
        mode: 'system',
        systemMode: 'night',
        dayColorScheme: 'light',
        nightColorScheme: 'dark',
        colorScheme: 'dark',
      });
    });

    it('storage mode is deleted', () => {
      storage[DEFAULT_MODE_STORAGE_KEY] = 'night';
      const Data = () => {
        const { ...data } = useCurrentColorScheme({
          defaultMode: 'system',
          defaultDayColorScheme: 'light',
          defaultNightColorScheme: 'dark',
          supportedColorSchemes: ['light', 'dark'],
        });
        return <button>{JSON.stringify(data)}</button>;
      };
      const { container } = render(<Data />);

      act(() => {
        storageHandler.storage?.({ key: DEFAULT_MODE_STORAGE_KEY, newValue: null });
      });

      expect(JSON.parse(container.firstChild.textContent)).to.deep.equal({
        mode: 'system',
        systemMode: 'day',
        dayColorScheme: 'light',
        nightColorScheme: 'dark',
        colorScheme: 'light',
      });
    });

    it('storage dayColorScheme & nightColorScheme changes', () => {
      const Data = () => {
        const { ...data } = useCurrentColorScheme({
          defaultMode: 'system',
          defaultDayColorScheme: 'light',
          defaultNightColorScheme: 'dark',
          supportedColorSchemes: ['light', 'dark', 'light-dim', 'dark-dim'],
        });
        return <button>{JSON.stringify(data)}</button>;
      };
      const { container } = render(<Data />);

      act(() => {
        storageHandler.storage?.({
          key: `${DEFAULT_COLOR_SCHEME_STORAGE_KEY}-day`,
          newValue: 'light-dim',
        });
      });

      expect(JSON.parse(container.firstChild.textContent)).to.deep.equal({
        mode: 'system',
        systemMode: 'day',
        dayColorScheme: 'light-dim',
        nightColorScheme: 'dark',
        colorScheme: 'light-dim',
      });

      act(() => {
        storageHandler.storage?.({
          key: `${DEFAULT_COLOR_SCHEME_STORAGE_KEY}-night`,
          newValue: 'dark-dim',
        });
      });

      act(() => {
        trigger({ matches: true });
      });

      expect(JSON.parse(container.firstChild.textContent)).to.deep.equal({
        mode: 'system',
        systemMode: 'night',
        dayColorScheme: 'light-dim',
        nightColorScheme: 'dark-dim',
        colorScheme: 'dark-dim',
      });
    });
  });
});
