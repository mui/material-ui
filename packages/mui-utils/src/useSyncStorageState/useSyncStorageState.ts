'use client';
import * as React from 'react';

// storage events only work across tabs, we'll use an event emitter to announce within the current tab
const currentTabChangeListeners = new Map<string, Set<() => void>>();

let defaultSerializer = JSON.stringify;
let defaultDeserializer = JSON.parse;

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

function subscribe(area: Storage, key: string | null, callback: () => void): () => void {
  if (!key) {
    return () => {};
  }
  const storageHandler = (event: StorageEvent) => {
    if (event.storageArea === area && event.key === key) {
      callback();
    }
  };
  window.addEventListener('storage', storageHandler);
  onCurrentTabStorageChange(key, callback);
  return () => {
    window.removeEventListener('storage', storageHandler);
    offCurrentTabStorageChange(key, callback);
  };
}

function getSnapshot<T>(area: Storage, key: string | null): T | null {
  if (!key) {
    return null;
  }
  try {
    const storedValue = area.getItem(key);
    if (!storedValue) {
      return null;
    }

    return defaultDeserializer(storedValue);
  } catch {
    // ignore
    // See https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#feature-detecting_localstorage
    return null;
  }
}

function setValue<T>(area: Storage, key: string | null, value: T | null) {
  if (!key) {
    return;
  }
  try {
    if (value === null) {
      area.removeItem(key);
    } else {
      area.setItem(key, defaultSerializer(value));
    }
  } catch {
    // ignore
    // See https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#feature-detecting_localstorage
    return;
  }
  emitCurrentTabStorageChange(key);
}

type Initializer<T> = () => T | null;

type Serializer<T> = (object: T | undefined) => string;
type Parser<T> = (cachedString: string) => T | undefined;

interface Options<T> {
  /**
   * The storage client
   * @default `localStorage`
   */
  storage?: Storage | null;
  /**
   * Serialize the data to storage.
   * @default `JSON.stringify`
   */
  serialize?: Serializer<T>;
  /**
   * Deserialize the data from storage.
   * @default `JSON.parse`
   */
  deserialize?: Parser<T>;
}

type UseSyncStorageStateHookResult<T> = [T | null, React.Dispatch<React.SetStateAction<T | null>>];

const serverValue: UseSyncStorageStateHookResult<null> = [null, () => {}];

function useSyncStorageStateServer() {
  return serverValue;
}

/**
 * Sync state to local storage so that it persists through a page refresh. Usage is
 * similar to useState except we pass in a storage key so that we can default
 * to that value on page load instead of the specified initial value.
 *
 * Since the storage API isn't available in server-rendering environments, we
 * return null during SSR and hydration.
 */
function useSyncStorageStateBrowser<T>(
  key: string | null,
  initializer: T | null | Initializer<T> = null,
  options?: Options<T>,
): UseSyncStorageStateHookResult<T> {
  const { storage = window.localStorage } = options || {};

  // Override serializer or deserializer default function
  React.useEffect(() => {
    if (options?.serialize) {
      defaultSerializer = options.serialize;
    }

    if (options?.deserialize) {
      defaultDeserializer = options.deserialize;
    }
  }, [options?.serialize, options?.deserialize]);

  const [initialValue] = React.useState(initializer);

  const area = storage!;
  const subscribeKey = React.useCallback(
    (callback: () => void) => subscribe(area, key, callback),
    [area, key],
  );
  const getKeySnapshot = React.useCallback(
    () => getSnapshot<T>(area, key) ?? initialValue,
    [area, initialValue, key],
  );

  // Start with null for the hydration, and then switch to the actual value.
  const getKeyServerSnapshot = () => null;

  const storedValue = React.useSyncExternalStore(
    subscribeKey,
    getKeySnapshot,
    getKeyServerSnapshot,
  );

  const setStoredValue = React.useCallback(
    (value: React.SetStateAction<T | null>) => {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setValue(area, key, valueToStore);
    },
    [area, key, storedValue],
  );

  const [nonStoredValue, setNonStoredValue] = React.useState(initialValue);

  if (!key) {
    return [nonStoredValue, setNonStoredValue];
  }

  return [storedValue, setStoredValue];
}

const useSyncStorageState =
  typeof window === 'undefined' ? useSyncStorageStateServer : useSyncStorageStateBrowser;

export default useSyncStorageState;
