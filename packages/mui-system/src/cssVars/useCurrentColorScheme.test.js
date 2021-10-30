import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createClientRender, fireEvent, act } from 'test/utils';
import {
  DEFAULT_MODE_STORAGE_KEY,
  DEFAULT_COLOR_SCHEME_STORAGE_KEY,
} from './getInitColorSchemeScript';
import useCurrentColorScheme, { getColorScheme } from './useCurrentColorScheme';

describe('useCurrentColorScheme', () => {
  const render = createClientRender();
  let storage = {};
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
  });

  beforeEach(() => {
    // clear the localstorage
    storage = {};
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
  });

  describe('Storage', () => {
    it('save mode & systemMode', () => {
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
      expect(
        global.localStorage.setItem.calledWith(`${DEFAULT_MODE_STORAGE_KEY}-system`, 'day'),
      ).to.equal(true);
    });

    it('save mode, systemMode, dayColorScheme and nightColorScheme', () => {
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

    it.skip('storage mode change', () => {});
  });
});
