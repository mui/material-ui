'use client';

import * as React from 'react';

const NOOP = () => {};

// storage events only work across tabs, we'll use an event emitter to announce within the current tab
const currentTabChangeListeners = new Map<string, Set<() => void>>();

function onCurrentTabStorageChange(key: string, handler: () => void) {
  let listeners = currentTabChangeListeners.get(key);

  if (!listeners) {
    listeners = new Set();
    currentTabChangeListeners.set(key, listeners);
  }

  listeners.add(handler);
}

function offCurrentTabStorageChange(key: string, handler: () => void) {
  const listeners = currentTabChangeListeners.get(key);
  if (!listeners) {
    return;
  }

  listeners.delete(handler);

  if (listeners.size === 0) {
    currentTabChangeListeners.delete(key);
  }
}

function emitCurrentTabStorageChange(key: string) {
  const listeners = currentTabChangeListeners.get(key);
  if (listeners) {
    listeners.forEach((listener) => listener());
  }
}

function subscribe(area: Storage, key: string, cb: () => void): () => void {
  const storageHandler = (event: StorageEvent) => {
    if (event.storageArea === area && event.key === key) {
      cb();
    }
  };
  window.addEventListener('storage', storageHandler);
  onCurrentTabStorageChange(key, cb);
  return () => {
    window.removeEventListener('storage', storageHandler);
    offCurrentTabStorageChange(key, cb);
  };
}

function getSnapshot(area: Storage, key: string): string | null {
  return area.getItem(key);
}

function setValue(area: Storage, key: string, value: string | null) {
  if (typeof window !== 'undefined') {
    if (value === null) {
      area.removeItem(key);
    } else {
      area.setItem(key, String(value));
    }
    emitCurrentTabStorageChange(key);
  }
}

type Initializer<T> = () => T;

type UseStorageStateHookResult<T> = [T, React.Dispatch<React.SetStateAction<T>>];

function useLocalStorageStateServer(
  key: string | null,
  initializer: string | Initializer<string>,
): UseStorageStateHookResult<string>;
function useLocalStorageStateServer(
  key: string | null,
  initializer?: string | null | Initializer<string | null>,
): UseStorageStateHookResult<string | null>;
function useLocalStorageStateServer(
  key: string | null,
  initializer: string | null | Initializer<string | null> = null,
): UseStorageStateHookResult<string | null> | UseStorageStateHookResult<string> {
  const [initialValue] = React.useState(initializer);
  return [initialValue, () => {}];
}

/**
 * Sync state to local storage so that it persists through a page refresh. Usage is
 * similar to useState except we pass in a storage key so that we can default
 * to that value on page load instead of the specified initial value.
 *
 * Since the storage API isn't available in server-rendering environments, we
 * return initialValue during SSR and hydration.
 *
 * Things this hook does different from existing solutions:
 * - SSR-capable: it shows initial value during SSR and hydration, but immediately
 *   initializes when clientside mounted.
 * - Sync state across tabs: When another tab changes the value in the storage area, the
 *   current tab follows suit.
 */
function useLocalStorageStateBrowser(
  key: string | null,
  initializer: string | Initializer<string>,
): UseStorageStateHookResult<string>;
function useLocalStorageStateBrowser(
  key: string | null,
  initializer?: string | null | Initializer<string | null>,
): UseStorageStateHookResult<string | null>;
function useLocalStorageStateBrowser(
  key: string | null,
  initializer: string | null | Initializer<string | null> = null,
): UseStorageStateHookResult<string | null> | UseStorageStateHookResult<string> {
  const [initialValue] = React.useState(initializer);
  const area = window.localStorage;
  const subscribeKey = React.useCallback(
    (cb: () => void) => (key ? subscribe(area, key, cb) : NOOP),
    [area, key],
  );
  const getKeySnapshot = React.useCallback(
    () => (key && getSnapshot(area, key)) ?? initialValue,
    [area, initialValue, key],
  );
  const getKeyServerSnapshot = React.useCallback(() => initialValue, [initialValue]);

  const storedValue = React.useSyncExternalStore(
    subscribeKey,
    getKeySnapshot,
    getKeyServerSnapshot,
  );

  const setStoredValue = React.useCallback(
    (value: React.SetStateAction<string | null>) => {
      if (key) {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setValue(area, key, valueToStore);
      }
    },
    [area, key, storedValue],
  );

  const [nonStoredValue, setNonStoredValue] = React.useState(initialValue);

  if (!key) {
    return [nonStoredValue, setNonStoredValue];
  }

  return [storedValue, setStoredValue];
}

export default typeof window === 'undefined'
  ? useLocalStorageStateServer
  : useLocalStorageStateBrowser;
