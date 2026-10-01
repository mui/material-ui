import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { spy } from 'sinon';
import { act, createRenderer, screen } from '@mui/internal-test-utils';
import useCurrentColorScheme from './useCurrentColorScheme';

const options = {
  modeStorageKey: 'mui-mode',
  colorSchemeStorageKey: 'mui-color-scheme',
  defaultMode: 'light',
  defaultLightColorScheme: 'light',
  defaultDarkColorScheme: 'dark',
  supportedColorSchemes: ['light', 'dark', 'light-alt', 'dark-alt'],
  noSsr: true,
};

// Storage events are queued for other windows, and identical writes do not emit events.
function createTabs(count) {
  const storage = new Map();
  const events = [];
  const tabs = [];
  function write(source, key, newValue) {
    const oldValue = storage.get(key) ?? null;
    if (newValue === null) {
      storage.delete(key);
    } else {
      storage.set(key, newValue);
    }
    if (oldValue !== newValue) {
      tabs.forEach((tab) => {
        if (tab !== source) {
          events.push(() => tab.listeners.forEach((listener) => listener({ key, newValue })));
        }
      });
    }
  }
  for (let i = 0; i < count; i += 1) {
    const tab = {
      listeners: new Set(),
      localStorage: {
        getItem: (key) => storage.get(key) ?? null,
        setItem: spy((key, value) => write(tab, key, value)),
        removeItem: (key) => write(tab, key, null),
      },
      addEventListener: (type, listener) => tab.listeners.add(listener),
      removeEventListener: (type, listener) => tab.listeners.delete(listener),
    };
    tabs.push(tab);
  }
  return {
    tabs,
    storage,
    async flushEvents() {
      let processed = 0;
      while (events.length && processed < 100) {
        const dispatch = events.shift();
        // Each event must commit before delivering the next queued event.
        // eslint-disable-next-line no-await-in-loop
        await act(dispatch);
        processed += 1;
      }
      expect(events.length, 'storage events should converge').to.equal(0);
    },
  };
}

describe('useCurrentColorScheme storage subscriptions', () => {
  const { render } = createRenderer();

  function Tab({ storageWindow, storageManager }) {
    const state = useCurrentColorScheme({ ...options, storageWindow, storageManager });
    return (
      <div>
        <output>{`${state.mode}:${state.lightColorScheme}:${state.darkColorScheme}`}</output>
        <button onClick={() => state.setMode('dark')}>Dark</button>
        <button onClick={() => state.setMode('light')}>Light</button>
        <button onClick={() => state.setColorScheme({ light: 'light-alt', dark: 'dark-alt' })}>
          Alternate schemes
        </button>
      </div>
    );
  }

  it('converges after rapid mode and scheme changes without echoing writes', async () => {
    const { tabs, storage, flushEvents } = createTabs(9);
    const { user } = render(
      <React.Fragment>
        {tabs.map((tab, index) => (
          <Tab key={index} storageWindow={tab} />
        ))}
      </React.Fragment>,
    );

    await user.click(screen.getAllByRole('button', { name: 'Dark' })[0]);
    await user.click(screen.getAllByRole('button', { name: 'Light' })[0]);
    await user.click(screen.getAllByRole('button', { name: 'Dark' })[0]);
    await user.click(screen.getAllByRole('button', { name: 'Alternate schemes' })[0]);
    const writes = tabs[0].localStorage.setItem.args.slice();
    await flushEvents();

    expect(storage.get('mui-mode')).to.equal('dark');
    expect(storage.get('mui-color-scheme-light')).to.equal('light-alt');
    expect(storage.get('mui-color-scheme-dark')).to.equal('dark-alt');
    screen.getAllByRole('status').forEach((output) => {
      expect(output).to.have.text('dark:light-alt:dark-alt');
    });
    tabs.slice(1).forEach((tab) => expect(tab.localStorage.setItem.callCount).to.equal(0));
    expect(tabs[0].localStorage.setItem.args).to.deep.equal(writes);
  });

  it('restores defaults when keys are removed without writing them back', async () => {
    const { tabs, storage, flushEvents } = createTabs(2);
    storage.set('mui-mode', 'dark');
    storage.set('mui-color-scheme-light', 'light-alt');
    storage.set('mui-color-scheme-dark', 'dark-alt');
    const { unmount } = render(<Tab storageWindow={tabs[1]} />);

    ['mui-mode', 'mui-color-scheme-light', 'mui-color-scheme-dark'].forEach((key) => {
      tabs[0].localStorage.removeItem(key);
    });
    await flushEvents();

    expect(screen.getByRole('status')).to.have.text('light:light:dark');
    expect(storage.size).to.equal(0);
    expect(tabs[1].localStorage.setItem.callCount).to.equal(0);
    unmount();
    expect(tabs[1].listeners.size).to.equal(0);
  });

  it('uses custom subscription values without persisting or rereading them', async () => {
    const handlers = new Map();
    const set = spy();
    const storageManager = ({ key }) => ({
      get: (defaultValue) => defaultValue,
      set,
      subscribe: (handler) => {
        handlers.set(key, handler);
        return () => handlers.delete(key);
      },
    });
    render(<Tab storageManager={storageManager} />);

    await act(() => {
      handlers.get('mui-mode')('dark');
      handlers.get('mui-color-scheme-dark')('dark-alt');
    });
    expect(screen.getByRole('status')).to.have.text('dark:light:dark-alt');
    expect(set.callCount).to.equal(0);
  });
});
