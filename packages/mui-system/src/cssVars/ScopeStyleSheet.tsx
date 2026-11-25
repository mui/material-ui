'use client';
import * as React from 'react';
import { GlobalStyles, internal_useStyleCache as useStyleCache } from '@mui/styled-engine';
import useEnhancedEffect from '@mui/utils/useEnhancedEffect';

interface ScopeStyleSheets {
  // The provider that inserts the stylesheet of each class.
  owners: Map<string, object>;
  // The mounted providers that use each class.
  users: Map<string, object[]>;
  // Re-renders a provider when it starts or stops inserting the stylesheet.
  listeners: Map<object, () => void>;
}

/**
 * The stylesheets of the providers in one tree, by style engine cache and by class name.
 * A class name is a hash of its declarations, so one stylesheet serves every provider that uses it.
 * A cache inserts its styles in its own container, like a shadow root, so each one gets its stylesheets.
 */
export type ScopeStyleSheetRegistry = WeakMap<object, ScopeStyleSheets>;

export function createScopeStyleSheetRegistry(): ScopeStyleSheetRegistry {
  return new WeakMap();
}

// For a style engine without a cache in context.
const defaultCache = {};

function getStyleSheets(registry: ScopeStyleSheetRegistry, cache: object): ScopeStyleSheets {
  let styleSheets = registry.get(cache);
  if (!styleSheets) {
    styleSheets = { owners: new Map(), users: new Map(), listeners: new Map() };
    registry.set(cache, styleSheets);
  }
  return styleSheets;
}

// React 17 has no `useInsertionEffect`; spread into a plain object so reading the missing property returns `undefined`
// instead of throwing under strict ESM. See #41190 (comment).
const safeReact = { ...React };
// Insertion effects run before the layout effects of the whole commit, so these see every provider it mounts.
// With React 17, a provider can take over the stylesheet from an ancestor that mounts in the same commit,
// which then gives it up: the stylesheet is still inserted once.
const useInsertionEffect: typeof React.useLayoutEffect =
  safeReact.useInsertionEffect ?? useEnhancedEffect;

interface ScopeStyleSheetProps {
  registry: ScopeStyleSheetRegistry;
  className: string;
  styles: any;
}

/**
 * The first provider that renders claims the stylesheet, so the others render nothing.
 * When it doesn't mount, for example because it suspended, or when it unmounts, another provider takes over.
 */
function SharedScopeStyleSheet(props: ScopeStyleSheetProps) {
  const { registry, className, styles } = props;
  const styleSheets = getStyleSheets(registry, useStyleCache() ?? defaultCache);
  const token = React.useRef<object>(null);
  if (!token.current) {
    token.current = {};
  }
  const [, forceUpdate] = React.useReducer((count: number) => count + 1, 0);

  if (!styleSheets.owners.has(className)) {
    styleSheets.owners.set(className, token.current);
  }
  const insertsStyles = styleSheets.owners.get(className) === token.current;

  useInsertionEffect(() => {
    const user = token.current!;
    const users = styleSheets.users.get(className) ?? [];
    users.push(user);
    styleSheets.users.set(className, users);
    return () => {
      const current = styleSheets.users.get(className)!;
      current.splice(current.indexOf(user), 1);
      if (current.length === 0) {
        styleSheets.users.delete(className);
      }
    };
  }, [styleSheets, className]);

  useEnhancedEffect(() => {
    const user = token.current!;
    styleSheets.listeners.set(user, forceUpdate);
    return () => {
      styleSheets.listeners.delete(user);
      if (styleSheets.owners.get(className) === user) {
        // The next provider inserts the stylesheet now.
        const next = styleSheets.users.get(className)?.find((other) => other !== user);
        if (next) {
          styleSheets.owners.set(className, next);
          styleSheets.listeners.get(next)?.();
        } else {
          styleSheets.owners.delete(className);
        }
      }
    };
  }, [styleSheets, className]);

  useEnhancedEffect(() => {
    const user = token.current!;
    const owner = styleSheets.owners.get(className);
    if (owner === undefined || !styleSheets.users.get(className)?.includes(owner)) {
      // The provider that claimed the stylesheet didn't mount.
      styleSheets.owners.set(className, user);
    }
    if ((styleSheets.owners.get(className) === user) !== insertsStyles) {
      forceUpdate();
    }
  });

  return insertsStyles ? <GlobalStyles styles={styles} /> : null;
}

/**
 * Inserts the stylesheet of a class once for all the providers of a tree that use it, instead of once per provider,
 * since a theme used by many components, like a themed card in a list, renders many providers.
 */
export default function ScopeStyleSheet(props: ScopeStyleSheetProps) {
  if (typeof document === 'undefined') {
    // The server can't tell which providers reach the HTML, since no effect runs there: the content of
    // a Suspense boundary that suspends doesn't. So each provider renders the stylesheet,
    // and a style engine that extracts the styles inserts it once.
    return <GlobalStyles styles={props.styles} />;
  }
  return <SharedScopeStyleSheet {...props} />;
}
