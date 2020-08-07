/* eslint-disable no-console */
// https://github.com/trentm/node-bunyan#levels
const logTypes = {
  // Detail on regular operation.
  info: { level: 3, method: 'log' },
  // A note on something that should probably be looked at by an operator eventually.
  warn: { level: 4, method: 'warn' },
  // Fatal for a particular request, but the service/app continues servicing other requests.
  // An operator should look at this soon(ish).
  error: { level: 5, method: 'error' },
  // The service/app is going to stop or become unusable now.
  // An operator should definitely look into this soon.
  fatal: { level: 6, method: 'error' },
};

function serializeErr(msg) {
  if (!msg.err.stack) {
    return msg.err;
  }

  return {
    ...msg,
    err: {
      message: msg.err.message,
      name: msg.err.name,
    },
  };
}

function serializeDuration(msg) {
  return {
    ...msg,
    duration: `${msg.duration.toFixed(2)}ms`,
  };
}

function safeCycles() {
  const seen = new Set();
  return function handleKey(key, val) {
    if (!val || typeof val !== 'object') {
      return val;
    }
    if (seen.has(val)) {
      return '[Circular]';
    }
    seen.add(val);
    return val;
  };
}

/**
 * A fast JSON.stringify that handles cycles and getter exceptions (when
 * safeJsonStringify is installed).
 *
 * This function attempts to use the regular JSON.stringify for speed, but on
 * error (e.g. JSON cycle detection exception) it falls back to safe stringify
 * handlers that can deal with cycles and/or getter exceptions.
 *
 * From: https://github.com/trentm/node-bunyan/blob/c0932196dd6846189ec82623c12d051eee799d4f/lib/bunyan.js#L1208
 */
function fastAndSafeJsonStringify(object) {
  try {
    return JSON.stringify(object);
  } catch (err) {
    try {
      return JSON.stringify(object, safeCycles());
    } catch (err2) {
      console.log('err', err);
      console.log('err2', err2);
      console.log('object', object);
      return 'modules/scripts/log: something is wrong';
    }
  }
}

function logMethod(process, console, type) {
  return (object) => {
    const { name, msg, force = false } = object;
    let formatedMsg = msg;

    if (process.env.NODE_ENV === 'test' && !force) {
      return;
    }

    if (process.env.NODE_ENV !== 'production' && !name) {
      throw new Error(`Missing name ${JSON.stringify(object)}`);
    }

    const format =
      process.env.NODE_ENV === 'production' &&
      process.env.LOG_FORMAT !== 'human' &&
      !process.browser
        ? 'json'
        : 'human';

    if (formatedMsg.duration) {
      formatedMsg = serializeDuration(formatedMsg);
    }

    if (format === 'json') {
      if (formatedMsg.err) {
        formatedMsg = serializeErr(formatedMsg);
      }

      const message = fastAndSafeJsonStringify({
        level: logTypes[type].level,
        msg: formatedMsg,
        name,
        ...(process.browser ? {} : { pid: process.pid }),
      });

      if (process.browser) {
        console[logTypes[type].method](message);
        return;
      }

      // Faster than calling console.x.
      process.stdout.write(`${message}\n`);
    } else {
      const messages = [];

      if (process.browser) {
        messages.push(`${name}:`);
      } else {
        messages.push(`${type.toUpperCase()} ${process.pid} ${name}:`);
      }

      if (formatedMsg.err) {
        messages.push(formatedMsg.err);
        delete formatedMsg.err;
      }
      messages.push(formatedMsg);

      console[logTypes[type].method](...messages);
    }
  };
}

const log = {
  info: logMethod(process, console, 'info'),
  warn: logMethod(process, console, 'warn'),
  error: logMethod(process, console, 'error'),
  fatal: logMethod(process, console, 'fatal'),
};

module.exports = log;
