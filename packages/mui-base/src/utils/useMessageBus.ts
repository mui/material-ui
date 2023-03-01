import * as React from 'react';

export interface MessageBus {
  subscribe(topic: symbol, callback: Function): () => void;
  publish(topic: symbol, ...args: unknown[]): void;
}

export function createMessageBus(): MessageBus {
  const listeners = new Map<symbol, Set<Function>>();

  function subscribe(topic: symbol, callback: Function) {
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

  function publish(topic: symbol, ...args: unknown[]) {
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
export default function useMessageBus() {
  const bus = React.useRef<MessageBus>();
  if (!bus.current) {
    bus.current = createMessageBus();
  }

  return bus.current;
}
