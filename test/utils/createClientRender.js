/* eslint-env mocha */
import * as React from 'react';
import PropTypes from 'prop-types';
import {
  act as rtlAct,
  buildQueries,
  cleanup,
  fireEvent as rtlFireEvent,
  queries,
  render as testingLibraryRender,
  prettyDOM,
  within,
} from '@testing-library/react/pure';
import { unstable_trace } from 'scheduler/tracing';
import userEvent from './user-event';

const enableDispatchingProfiler = process.env.TEST_GATE === 'enable-dispatching-profiler';

function noTrace(interaction, callback) {
  return callback();
}

/**
 * Path used in Error.prototype.stack.
 *
 * Computed in `before` hook.
 * @type {string}
 */
let workspaceRoot;

/**
 * @param {string} interactionName - Human readable label for this particular interaction.
 * @param {() => T} callback
 * @returns {T}
 */
function traceByStack(interactionName, callback) {
  const { stack } = new Error();
  const testLines = stack
    .split(/\r?\n/)
    .map((line) => {
      // anonymous functions create a "weird" stackframe like
      // "at path/to/actual.test.js (path/to/utility/file.js <- karma.test.js)"
      // and we just want "path/to/actual.test.js" not "karma.test.js"
      // TODO: Only supports chrome at the moment
      const fileMatch = line.match(/([^\s(]+\.test\.(js|ts|tsx)):(\d+):(\d+)/);
      if (fileMatch === null) {
        return null;
      }
      return { name: fileMatch[1], line: +fileMatch[3], column: +fileMatch[4] };
    })
    .filter((maybeTestFile) => {
      return maybeTestFile !== null;
    })
    .map((file) => {
      return `${file.name.replace(workspaceRoot, '')}:${file.line}:${file.column}`;
    });
  const originLine = testLines[testLines.length - 1] ?? 'unknown line';

  return unstable_trace(`${originLine} (${interactionName})`, performance.now(), callback);
}

class NoopProfiler {
  id = 'noop';

  // eslint-disable-next-line class-methods-use-this
  onRender() {}

  // eslint-disable-next-line class-methods-use-this
  report() {}
}

class DispatchingProfiler {
  renders = [];

  /**
   *
   * @param {import('mocha').Test} test
   */
  constructor(test) {
    /**
     * @readonly
     */
    this.test = test;
    this.id = test.fullTitle();
  }

  /**
   * @type {import('react').ProfilerOnRenderCallback}
   */
  onRender = (id, phase, actualDuration, baseDuration, startTime, commitTime, interactions) => {
    // Do minimal work here to keep the render fast.
    // Though it's unclear whether work here affects the profiler results.
    // But even if it doesn't we'll keep the test feedback snappy.
    this.renders.push([
      id,
      phase,
      actualDuration,
      baseDuration,
      startTime,
      commitTime,
      interactions,
    ]);
  };

  report() {
    const event = new window.CustomEvent('reactProfilerResults', {
      detail: {
        [this.id]: this.renders.map((entry) => {
          return {
            phase: entry[1],
            actualDuration: entry[2],
            baseDuration: entry[3],
            startTime: entry[4],
            commitTime: entry[5],
            interactions: Array.from(entry[6]),
          };
        }),
      },
    });
    window.dispatchEvent(event);
  }
}

const Profiler = enableDispatchingProfiler ? DispatchingProfiler : NoopProfiler;
const trace = enableDispatchingProfiler ? traceByStack : noTrace;

// holes are *All* selectors which aren't necessary for id selectors
const [queryDescriptionOf, , getDescriptionOf, , findDescriptionOf] = buildQueries(
  function queryAllDescriptionsOf(container, element) {
    return container.querySelectorAll(`#${element.getAttribute('aria-describedby')}`);
  },
  function getMultipleError() {
    return `Found multiple descriptions. An element should be described by a unique element.`;
  },
  function getMissingError() {
    return `Found no describing element.`;
  },
);

// https://github.com/testing-library/dom-testing-library/issues/723
// hide ByLabelText queries since they only support firefox >= 56, not IE 1:
// - HTMLInputElement.prototype.labels https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/labels

function queryAllByLabelText(container, label) {
  throw new Error(
    `*ByLabelText() relies on features that are not available in older browsers. Prefer \`*ByRole(someRole, { name: '${label}' })\` `,
  );
}
const [
  queryByLabelText,
  getAllByLabelText,
  getByLabelText,
  findAllByLabelText,
  findByLabelText,
] = buildQueries(
  queryAllByLabelText,
  function getMultipleError() {
    throw new Error('not implemented');
  },
  function getMissingError() {
    throw new Error('not implemented');
  },
);

const customQueries = {
  queryDescriptionOf,
  getDescriptionOf,
  findDescriptionOf,
  queryAllByLabelText,
  queryByLabelText,
  getAllByLabelText,
  getByLabelText,
  findAllByLabelText,
  findByLabelText,
};

/**
 * @typedef {object} RenderOptions
 * @property {HTMLElement} [options.baseElement] - https://testing-library.com/docs/react-testing-library/api#baseelement-1
 * @property {HTMLElement} [options.container] - https://testing-library.com/docs/react-testing-library/api#container
 * @property {boolean} [options.disableUnnmount] - if true does not cleanup before mount
 * @property {boolean} [options.hydrate] - https://testing-library.com/docs/react-testing-library/api#hydrate
 * @property {boolean} [options.strict] - wrap in React.StrictMode?
 */

/**
 * @param {React.ReactElement} element
 * @param {RenderOptions} [options]
 * @returns {import('@testing-library/react').RenderResult<typeof queries & typeof customQueries> & { setProps(props: object): void}}
 * TODO: type return RenderResult in setProps
 */
function clientRender(element, options = {}) {
  const {
    baseElement,
    container,
    hydrate,
    strict = true,
    profiler,
    wrapper: InnerWrapper = React.Fragment,
  } = options;

  if (profiler === null) {
    // TODO: remove tests rendering in mocha hooks
    // throw new Error('Rendered outside of a test. Use the test renderer only in tests.');
  }

  const Mode = strict ? React.StrictMode : React.Fragment;
  function Wrapper({ children }) {
    if (profiler !== null) {
      return (
        <Mode>
          <React.Profiler id={profiler.id} onRender={profiler.onRender}>
            <InnerWrapper>{children}</InnerWrapper>
          </React.Profiler>
        </Mode>
      );
    }
    return (
      <Mode>
        <InnerWrapper>{children}</InnerWrapper>
      </Mode>
    );
  }
  Wrapper.propTypes = { children: PropTypes.node };

  const result = trace('render', () =>
    testingLibraryRender(element, {
      baseElement,
      container,
      hydrate,
      queries: { ...queries, ...customQueries },
      wrapper: Wrapper,
    }),
  );

  /**
   * convenience helper. Better than repeating all props.
   */
  result.setProps = function setProps(props) {
    trace('setProps', () => result.rerender(React.cloneElement(element, props)));
    return result;
  };

  result.forceUpdate = function forceUpdate() {
    trace('forceUpdate', () =>
      result.rerender(
        React.cloneElement(element, {
          'data-force-update': String(Math.random()),
        }),
      ),
    );
    return result;
  };

  return result;
}

/**
 * @param {RenderOptions} globalOptions
 * @returns {clientRender}
 */
export function createClientRender(globalOptions = {}) {
  const { strict: globalStrict } = globalOptions;
  // save stack to re-use in test-hooks
  const { stack: createClientRenderStack } = new Error();

  /**
   * Flag whether `createClientRender` was called in a suite i.e. describe() block.
   * For legacy reasons `createClientRender` might accidentally be called in a before(Each) hook.
   */
  let wasCalledInSuite = false;
  before(function beforeHook() {
    wasCalledInSuite = true;

    if (enableDispatchingProfiler) {
      // TODO windows?
      const filename = new Error().stack
        ?.split(/\r?\n/)
        .map((line) => {
          const fileMatch = line.match(/\(([^)]+):\d+:\d+\)/);
          if (fileMatch === null) {
            return null;
          }
          return fileMatch[1];
        })
        .find((file) => {
          return file?.endsWith('createClientRender.js');
        });
      workspaceRoot = filename?.replace('test/utils/createClientRender.js', '');
    }
  });

  let profiler = null;
  beforeEach(function beforeEachHook() {
    if (!wasCalledInSuite) {
      const error = new Error(
        'Unable to run `before` hook for `createClientRender`. This usually indicates that `createClientRender` was called in a `before` hook instead of in a `describe()` block.',
      );
      error.stack = createClientRenderStack;
      throw error;
    }

    const test = this.currentTest;
    if (test === undefined) {
      throw new Error(
        'Unable to find the currently running test. This is a bug with the client-renderer. Please report this issue to a maintainer.',
      );
    }
    profiler = new Profiler(this.currentTest);
  });

  afterEach(() => {
    if (setTimeout.hasOwnProperty('clock')) {
      const error = Error(
        "Can't cleanup before fake timers are restored.\n" +
          'Be sure to:\n' +
          '  1. Restore the clock in `afterEach` instead of `after`.\n' +
          '  2. Move the test hook to restore the clock before the call to `createClientRender()`.',
      );
      // Use saved stack otherwise the stack trace will not include the test location.
      error.stack = createClientRenderStack;
      throw error;
    }

    cleanup();
    profiler.report();
    profiler = null;
  });

  return function configuredClientRender(element, options = {}) {
    const { strict = globalStrict, ...localOptions } = options;

    return clientRender(element, { ...localOptions, strict, profiler });
  };
}

/**
 * @type {typeof rtlFireEvent}
 */
const fireEvent = (target, event, ...args) => {
  return trace(`firEvent.${event.type}`, () => rtlFireEvent(target, event, ...args));
};

Object.keys(rtlFireEvent).forEach((eventType) => {
  fireEvent[eventType] = (...args) =>
    trace(`firEvent.${eventType}`, () => rtlFireEvent[eventType](...args));
});

const originalFireEventKeyDown = rtlFireEvent.keyDown;
fireEvent.keyDown = (element, options = {}) => {
  // `element` shouldn't be `document` but we catch this later anyway
  const document = element.ownerDocument || element;
  const target = document.activeElement || document.body || document.documentElement;
  if (target !== element) {
    // see https://www.w3.org/TR/uievents/#keydown
    const error = new Error(
      `\`keydown\` events can only be targeted at the active element which is ${prettyDOM(
        target,
        undefined,
        { maxDepth: 1 },
      )}`,
    );
    // We're only interested in the callsite of fireEvent.keyDown
    error.stack = error.stack
      .split('\n')
      .filter((line) => !/at Function.key/.test(line))
      .join('\n');
    throw error;
  }

  trace('fireEvent.keyDown', () => originalFireEventKeyDown(element, options));
};

const originalFireEventKeyUp = rtlFireEvent.keyUp;
fireEvent.keyUp = (element, options = {}) => {
  // `element` shouldn't be `document` but we catch this later anyway
  const document = element.ownerDocument || element;
  const target = document.activeElement || document.body || document.documentElement;
  if (target !== element) {
    // see https://www.w3.org/TR/uievents/#keyup
    const error = new Error(
      `\`keyup\` events can only be targeted at the active element which is ${prettyDOM(
        target,
        undefined,
        { maxDepth: 1 },
      )}`,
    );
    // We're only interested in the callsite of fireEvent.keyUp
    error.stack = error.stack
      .split('\n')
      .filter((line) => !/at Function.key/.test(line))
      .join('\n');
    throw error;
  }

  trace('fireEvent.keyUp', () => originalFireEventKeyUp(element, options));
};

/**
 *
 * @param {Element} target
 * @param {'touchmove' | 'touchend'} type
 * @param {object} options
 * @param {Array<Pick<TouchInit, 'clientX' | 'clientY'>} options.changedTouches
 * @returns void
 */
export function fireTouchChangedEvent(target, type, options) {
  const { changedTouches } = options;
  const originalGetBoundingClientRect = target.getBoundingClientRect;
  target.getBoundingClientRect = () => ({
    x: 0,
    y: 0,
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
  });

  const event = new window.TouchEvent(type, {
    bubbles: true,
    cancelable: true,
    composed: true,
    changedTouches: changedTouches.map(
      (opts) =>
        new window.Touch({
          target,
          identifier: 0,
          ...opts,
        }),
    ),
  });

  fireEvent(target, event);
  target.getBoundingClientRect = originalGetBoundingClientRect;
}

export function act(callback) {
  return trace('act', () => rtlAct(callback));
}

export * from '@testing-library/react/pure';
export { cleanup, fireEvent, userEvent };
// We import from `@testing-library/react` and `@testing-library/dom` before creating a JSDOM.
// At this point a global document isn't available yet. Now it is.
export const screen = within(document.body);

export function render() {
  throw new Error(
    "Don't use `render` directly. Instead use the return value from `createClientRender`",
  );
}
