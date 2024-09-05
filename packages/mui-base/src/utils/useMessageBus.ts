'use client';
import * as React from 'react';

export interface MessageBus {
  subscribe(topic: string, callback: Function): () => void;
  publish(topic: string, ...args: unknown[]): void;
}

export function createMessageBus(): MessageBus {
  const listeners = new Map<string, Set<Function>>();

  function subscribe(topic: string, callback: Function) {
    let topicListeners = listeners.get(topic);
    if (!topicListeners) {
      topicListeners = new Set([callback]);
      listeners.set(topic, topicListeners);
    } else {
      topicListeners.add(callback);
    }

    return () => {
      topicListeners!.delete(callback);
      if (topicListeners!.size === 0) {
        listeners.delete(topic);
      }
    };
  }

  function publish(topic: string, ...args: unknown[]) {
    const topicListeners = listeners.get(topic);
    if (topicListeners) {
      topicListeners.forEach((callback) => callback(...args));
    }
  }

  return { subscribe, publish };
}

/**
 * @ignore - internal hook.
 */
export function useMessageBus() {
  const bus = React.useRef<MessageBus | undefined>(undefined);
  if (!bus.current) {
    bus.current = createMessageBus();
  }

  return bus.current;
}
