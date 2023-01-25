import * as React from 'react';

export interface MessageBus {
  subscribe(topic: string, callback: Function): () => void;
  publish(topic: string, ...args: unknown[]): void;
}

export function createMessageBus(): MessageBus {
  const listeners = new Map<string, Set<Function>>();

  function subscribe(topic: string, callback: Function) {
    const topicListeners = listeners.get(topic);
    if (topicListeners) {
      topicListeners.add(callback);
      return () => {
        topicListeners.delete(callback);
        if (topicListeners.size === 0) {
          listeners.delete(topic);
        }
      };
    }

    const newTopicListeners = new Set([callback]);
    listeners.set(topic, newTopicListeners);
    return () => {
      newTopicListeners.delete(callback);
      if (newTopicListeners.size === 0) {
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

export default function useMessageBus() {
  const bus = React.useRef<MessageBus>();
  if (!bus.current) {
    bus.current = createMessageBus();
  }

  return bus.current;
}
