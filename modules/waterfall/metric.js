// The API is inspired by console.time
// The implementation is isomorphic.
import warning from 'warning';

const times = new Map();

const implementations = {
  mark: {
    start: name => {
      times.set(name, performance.now());
      performance.mark(`metric_${name}_start`);
    },
    end: name => {
      const endMark = `metric_${name}_end`;
      performance.mark(endMark);
      const startMark = `metric_${name}_start`;
      performance.measure(name, startMark, endMark);
      const duration = performance.getEntriesByName(name)[0].duration;
      return duration;
    },
  },
  now: {
    start: name => {
      times.set(name, performance.now());
    },
    end: name => {
      const time = times.get(name);
      const duration = performance.now() - time;
      return duration;
    },
  },
  hrtime: {
    start: name => {
      // https://nodejs.org/api/process.html#process_process_hrtime_time
      times.set(name, process.hrtime());
    },
    end: name => {
      const time = times.get(name);
      const durations = process.hrtime(time);
      const duration = durations[0] / 1e3 + durations[1] / 1e6;
      return duration;
    },
  },
};

let getImplementationCache;

function getImplementation() {
  if (getImplementationCache) {
    return getImplementationCache;
  }

  if (typeof performance !== 'undefined' && performance.mark) {
    getImplementationCache = implementations.mark;
  } else if (typeof performance !== 'undefined' && performance.now) {
    getImplementationCache = implementations.now;
  } else if (process.hrtime) {
    getImplementationCache = implementations.hrtime;
  } else {
    throw new Error('No performance API available');
  }

  return getImplementationCache;
}

class Metric {
  /**
   * Call to begin a measurement.
   */
  static start(name) {
    warning(!times.get(name), 'Recording already started');
    getImplementation().start(name);
  }

  /**
   * Returns the duration of the timing metric. The unit is milliseconds.
   * @type {number}
   */
  static end(name) {
    if (!times.get(name)) {
      throw new Error(`No such name '${name}' for metric`);
    }

    const duration = getImplementation().end(name);
    times.delete(name);
    return duration;
  }

  name = '';

  /**
   * @param {string} name A name for the metric.
   */
  constructor(name) {
    if (!name) {
      throw new Error('Please provide a metric name');
    }

    this.name = name;
  }

  /**
   * Call to begin a measurement.
   */
  start(name) {
    if (name) {
      throw new Error('The name argument is not supported');
    }

    Metric.start(this.name);
  }

  /**
   * Returns the duration of the timing metric. The unit is milliseconds.
   * @type {number}
   */
  end(name) {
    if (name) {
      throw new Error('The name argument is not supported');
    }

    return Metric.end(this.name);
  }
}

export default Metric;
