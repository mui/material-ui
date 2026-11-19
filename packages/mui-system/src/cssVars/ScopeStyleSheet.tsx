'use client';
import * as React from 'react';
import { GlobalStyles } from '@mui/styled-engine';
import useEnhancedEffect from '@mui/utils/useEnhancedEffect';

/**
 * The stylesheets of the providers in one tree, by class name. A class name is a hash of its declarations,
 * so one stylesheet serves every provider that uses it.
 */
export interface ScopeStyleSheetRegistry {
  // The mounted providers that use each class, the first one inserts its stylesheet.
  users: Map<string, object[]>;
  // Re-renders a provider when it becomes the first one.
  listeners: Map<object, () => void>;
}

export function createScopeStyleSheetRegistry(): ScopeStyleSheetRegistry {
  return { users: new Map(), listeners: new Map() };
}

/**
 * Inserts the stylesheet of a class once for all the providers of a tree that use it, instead of once per provider,
 * since a theme used by many components, like a themed card in a list, renders many providers.
 * Until it's mounted, on the server and during hydration, each provider inserts it.
 */
export default function ScopeStyleSheet(props: {
  registry: ScopeStyleSheetRegistry;
  className: string;
  styles: any;
}) {
  const { registry, className, styles } = props;
  const token = React.useRef<object>(null);
  if (!token.current) {
    token.current = {};
  }
  const [, forceUpdate] = React.useReducer((count: number) => count + 1, 0);

  useEnhancedEffect(() => {
    const user = token.current!;
    const users = registry.users.get(className) ?? [];
    users.push(user);
    registry.users.set(className, users);
    registry.listeners.set(user, forceUpdate);
    if (users[0] !== user) {
      // Another provider already inserts the stylesheet.
      forceUpdate();
    }
    return () => {
      const current = registry.users.get(className)!;
      const index = current.indexOf(user);
      current.splice(index, 1);
      registry.listeners.delete(user);
      if (current.length === 0) {
        registry.users.delete(className);
      } else if (index === 0) {
        // The next provider inserts it now.
        registry.listeners.get(current[0])?.();
      }
    };
  }, [registry, className]);

  const users = registry.users.get(className);
  if (users && users.length > 0 && users[0] !== token.current) {
    return null;
  }
  return <GlobalStyles styles={styles} />;
}
