'use client';
import * as React from 'react';
import { GlobalStyles } from '@mui/styled-engine';
import useEnhancedEffect from '@mui/utils/useEnhancedEffect';

/**
 * The stylesheets of the providers in one tree, by class name. A class name is a hash of its declarations,
 * so one stylesheet serves every provider that uses it.
 */
export interface ScopeStyleSheetRegistry {
  // The provider that inserts the stylesheet of each class.
  owners: Map<string, object>;
  // The mounted providers that use each class.
  users: Map<string, object[]>;
  // Re-renders a provider when it starts or stops inserting the stylesheet.
  listeners: Map<object, () => void>;
}

export function createScopeStyleSheetRegistry(): ScopeStyleSheetRegistry {
  return { owners: new Map(), users: new Map(), listeners: new Map() };
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
  const token = React.useRef<object>(null);
  if (!token.current) {
    token.current = {};
  }
  const [, forceUpdate] = React.useReducer((count: number) => count + 1, 0);

  if (!registry.owners.has(className)) {
    registry.owners.set(className, token.current);
  }
  const insertsStyles = registry.owners.get(className) === token.current;

  useInsertionEffect(() => {
    const user = token.current!;
    const users = registry.users.get(className) ?? [];
    users.push(user);
    registry.users.set(className, users);
    return () => {
      const current = registry.users.get(className)!;
      current.splice(current.indexOf(user), 1);
      if (current.length === 0) {
        registry.users.delete(className);
      }
    };
  }, [registry, className]);

  useEnhancedEffect(() => {
    const user = token.current!;
    registry.listeners.set(user, forceUpdate);
    return () => {
      registry.listeners.delete(user);
      if (registry.owners.get(className) === user) {
        // The next provider inserts the stylesheet now.
        const next = registry.users.get(className)?.find((other) => other !== user);
        if (next) {
          registry.owners.set(className, next);
          registry.listeners.get(next)?.();
        } else {
          registry.owners.delete(className);
        }
      }
    };
  }, [registry, className]);

  useEnhancedEffect(() => {
    const user = token.current!;
    const owner = registry.owners.get(className);
    if (owner === undefined || !registry.users.get(className)?.includes(owner)) {
      // The provider that claimed the stylesheet didn't mount.
      registry.owners.set(className, user);
    }
    if ((registry.owners.get(className) === user) !== insertsStyles) {
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
