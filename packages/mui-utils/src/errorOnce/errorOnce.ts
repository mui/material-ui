const warnedMessages = new Set<string>();

/**
 * Logs an error or warning message only once.
 * @param condition - The condition to check.
 * @param message - The message to log.
 * @param level - The level of the message ('error' or 'warn').
 * @param key - An optional key to identify the message. If not provided, the message itself is used as the key.
 */
function errorOnce(condition: boolean, message: string, level: 'error' | 'warn', key?: string) {
  if (process.env.NODE_ENV !== 'production') {
    if (!condition) {
      return;
    }

    const identifier = key || message;

    if (warnedMessages.has(identifier)) {
      return;
    }

    warnedMessages.add(identifier);

    if (level === 'error') {
      console.error(message);
    } else {
      console.warn(message);
    }
  }
}

function reset() {
  warnedMessages.clear();
}

export default errorOnce;
export { reset };
