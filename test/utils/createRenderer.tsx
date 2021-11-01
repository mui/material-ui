/* eslint-env mocha */
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import createEmotionCache from '@emotion/cache';
import { CacheProvider as EmotionCacheProvider } from '@emotion/react';
import {
  buildQueries,
  cleanup,
  queries,
  queryHelpers,
  render as testingLibraryRender,
  RenderResult,
} from '@testing-library/react/pure';

interface Interaction {
  id: number;
  name: string;
  timestamp: number;
}

const enableDispatchingProfiler = process.env.TEST_GATE === 'enable-dispatching-profiler';

function noTrace<T>(interactionName: string, callback: () => T): T {
  return callback();
}

/**
 * Path used in Error.prototype.stack.
 *
 * Computed in `before` hook.
 */
let workspaceRoot: string;

let interactionID = 0;
const interactionStack: Interaction[] = [];
/**
 * interactionName - Human readable label for this particular interaction.
 */
function traceByStackSync<T>(interactionName: string, callback: () => T): T {
  const { stack } = new Error();
  const testLines = stack!
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
    .filter((maybeTestFile): maybeTestFile is NonNullable<typeof maybeTestFile> => {
      return maybeTestFile !== null;
    })
    .map((file) => {
      return `${file.name.replace(workspaceRoot, '')}:${file.line}:${file.column}`;
    });
  const originLine = testLines[testLines.length - 1] ?? 'unknown line';

  interactionID += 1;
  const interaction: Interaction = {
    id: interactionID,
    name: `${originLine} (${interactionName})`,
    timestamp: performance.now(),
  };

  interactionStack.push(interaction);
  try {
    return callback();
  } finally {
    interactionStack.pop();
  }
}

interface Profiler {
  id: string;
  onRender: import('react').ProfilerOnRenderCallback;
  report(): void;
}

class NoopProfiler implements Profiler {
  id = 'noop';

  // eslint-disable-next-line class-methods-use-this
  onRender() {}

  // eslint-disable-next-line class-methods-use-this
  report() {}
}

type RenderMark = [
  id: string,
  phase: 'mount' | 'update',
  actualDuration: number,
  baseDuration: number,
  startTime: number,
  commitTime: number,
  interactions: Interaction[],
];

class DispatchingProfiler implements Profiler {
  id: string;

  private renders: RenderMark[] = [];

  constructor(test: import('mocha').Test) {
    this.id = test.fullTitle();
  }

  onRender: Profiler['onRender'] = (
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
  ) => {
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
      interactionStack.slice(),
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
            interactions: entry[6],
          };
        }),
      },
    });
    window.dispatchEvent(event);
  }
}

const UsedProfiler = enableDispatchingProfiler ? DispatchingProfiler : NoopProfiler;
const traceSync = enableDispatchingProfiler ? traceByStackSync : noTrace;

// holes are *All* selectors which aren't necessary for id selectors
const [queryDescriptionOf, , getDescriptionOf, , findDescriptionOf] = buildQueries(
  function queryAllDescriptionsOf(container, element) {
    return Array.from(container.querySelectorAll(`#${element.getAttribute('aria-describedby')}`));
  },
  function getMultipleError() {
    return `Found multiple descriptions. An element should be described by a unique element.`;
  },
  function getMissingError() {
    return `Found no describing element.`;
  },
);

const queryAllByMuiTest = queryHelpers.queryAllByAttribute.bind(null, 'data-mui-test');
const [queryByMuiTest, getAllByMuiTest, getByMuiTest, findAllByMuiTest, findByMuiTest] =
  buildQueries(
    queryAllByMuiTest,
    function getMultipleError(container, dataMuiTest) {
      return `Found multiple elements with the data-mui-test attribute of: ${dataMuiTest}`;
    },
    function getMissingError(container, dataMuiTest) {
      return `Found no element with the data-mui-test attribute of: ${dataMuiTest}`;
    },
  );

const customQueries = {
  queryDescriptionOf,
  getDescriptionOf,
  findDescriptionOf,
  /**
   * @deprecated Use `queryAllByTestId` instead
   */
  queryAllByMuiTest,
  /**
   * @deprecated Use `queryByTestId` instead
   */
  queryByMuiTest,
  /**
   * @deprecated Use `getAllByTestId` instead
   */
  getAllByMuiTest,
  /**
   * @deprecated Use `getByTestId` instead
   */
  getByMuiTest,
  /**
   * @deprecated Use `findAllByTestId` instead
   */
  findAllByMuiTest,
  /**
   * @deprecated Use `findByTestId` instead
   */
  findByMuiTest,
};

interface RenderConfiguration {
  /**
   * https://testing-library.com/docs/react-testing-library/api#container
   */
  container: HTMLElement;
  /**
   * if true does not cleanup before mount
   */
  disableUnmount?: boolean;
  /**
   * Set to true if the test fails in React 18.
   */
  legacyRoot?: boolean;
  /**
   * wrap in React.StrictMode?
   */
  strict?: boolean;
  /**
   * Set to `true` if the test fails due to [Strict Effects](https://github.com/reactwg/react-18/discussions/19).
   */
  strictEffects?: boolean;
  wrapper: React.JSXElementConstructor<{ children?: React.ReactNode }>;
}

interface ClientRenderConfiguration extends RenderConfiguration {
  /**
   * https://testing-library.com/docs/react-testing-library/api#hydrate
   */
  hydrate: boolean;
}

interface ServerRenderConfiguration extends RenderConfiguration {}

export type RenderOptions = Partial<RenderConfiguration>;

export interface MuiRenderResult extends RenderResult<typeof queries & typeof customQueries> {
  forceUpdate(): void;
  /**
   * convenience helper. Better than repeating all props.
   */
  setProps(props: object): void;
}

export interface MuiRenderToStringResult {
  hydrate(): MuiRenderResult;
}

function render(
  element: React.ReactElement,
  configuration: ClientRenderConfiguration,
): MuiRenderResult {
  const { container, hydrate, legacyRoot, wrapper } = configuration;

  const testingLibraryRenderResult = traceSync('render', () =>
    testingLibraryRender(element, {
      container,
      hydrate,
      // @ts-ignore Available in the `@testing-library/react` fork used when running with React 18
      legacyRoot,
      queries: { ...queries, ...customQueries },
      wrapper,
    }),
  );
  const result: MuiRenderResult = {
    ...testingLibraryRenderResult,
    forceUpdate() {
      traceSync('forceUpdate', () =>
        testingLibraryRenderResult.rerender(
          React.cloneElement(element, {
            'data-force-update': String(Math.random()),
          }),
        ),
      );
    },
    setProps(props) {
      traceSync('setProps', () =>
        testingLibraryRenderResult.rerender(React.cloneElement(element, props)),
      );
    },
  };

  return result;
}

function renderToString(
  element: React.ReactElement,
  configuration: ServerRenderConfiguration,
): { container: HTMLElement; hydrate(): MuiRenderResult } {
  const { container, wrapper: Wrapper } = configuration;

  traceSync('renderToString', () => {
    container.innerHTML = ReactDOMServer.renderToString(<Wrapper>{element}</Wrapper>);
  });

  return {
    container,
    hydrate() {
      return render(element, { ...configuration, hydrate: true });
    },
  };
}

interface Renderer {
  render(element: React.ReactElement, options?: RenderOptions): MuiRenderResult;
  renderToString(element: React.ReactElement, options?: RenderOptions): MuiRenderToStringResult;
}

export default function createRenderer(globalOptions: RenderOptions = {}): Renderer {
  const {
    legacyRoot: globalLegacyRoot,
    strict: globalStrict,
    strictEffects: globalStrictEffects,
  } = globalOptions;
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
      const filename = new Error()
        .stack!.split(/\r?\n/)
        .map((line) => {
          const fileMatch =
            // chrome: "    at Context.beforeHook (webpack-internal:///./test/utils/createClientRender.tsx:257:24)""
            line.match(/\(([^)]+):\d+:\d+\)/) ??
            // firefox: "beforeHook@webpack-internal:///./test/utils/createClientRender.tsx:257:24"
            line.match(/@(.*?):\d+:\d+$/);
          if (fileMatch === null) {
            return null;
          }
          return fileMatch[1];
        })
        .find((file) => {
          return file?.endsWith('createClientRender.tsx');
        });
      workspaceRoot = filename!.replace('test/utils/createClientRender.tsx', '');
    }
  });

  let emotionCache: import('@emotion/cache').EmotionCache = null!;
  let globalContainer: HTMLElement;
  /**
   * Flag whether all setup for `configuredClientRender` was completed.
   * For legacy reasons `configuredClientRender` might accidentally be called in a before(Each) hook.
   */
  let prepared = false;
  let profiler: Profiler = null!;
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
    profiler = new UsedProfiler(test);

    emotionCache = createEmotionCache({ key: 'emotion-client-render' });

    globalContainer = document.createElement('div');
    document.body.appendChild(globalContainer);

    prepared = true;
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
    profiler = null!;

    emotionCache.sheet.tags.forEach((styleTag) => {
      styleTag.remove();
    });
    emotionCache = null!;

    globalContainer.remove();
    globalContainer = null!;
  });

  function createWrapper(options: Partial<RenderConfiguration>) {
    const {
      strict = globalStrict,
      strictEffects = globalStrictEffects,
      wrapper: InnerWrapper = React.Fragment,
    } = options;

    const usesLegacyRoot = !React.version.startsWith('18');
    const Mode = strict && (strictEffects || usesLegacyRoot) ? React.StrictMode : React.Fragment;
    return function Wrapper({ children }: { children?: React.ReactNode }) {
      return (
        <Mode>
          <EmotionCacheProvider value={emotionCache}>
            <React.Profiler id={profiler.id} onRender={profiler.onRender}>
              <InnerWrapper>{children}</InnerWrapper>
            </React.Profiler>
          </EmotionCacheProvider>
        </Mode>
      );
    };
  }

  return {
    render(element: React.ReactElement, options: RenderOptions = {}) {
      if (!prepared) {
        throw new Error(
          'Unable to finish setup before `render()` was called. ' +
            'This usually indicates that `render()` was called in a `before()` or `beforeEach` hook. ' +
            'Move the call into each `it()`. Otherwise you cannot run a specific test and we cannot isolate each test.',
        );
      }

      const {
        container = globalContainer,
        legacyRoot = globalLegacyRoot,
        ...localOptions
      } = options;
      return render(element, {
        ...localOptions,
        container,
        hydrate: false,
        legacyRoot,
        wrapper: createWrapper(options),
      });
    },
    renderToString(element: React.ReactElement, options: RenderOptions = {}) {
      if (!prepared) {
        throw new Error(
          'Unable to finish setup before `render()` was called. ' +
            'This usually indicates that `render()` was called in a `before()` or `beforeEach` hook. ' +
            'Move the call into each `it()`. Otherwise you cannot run a specific test and we cannot isolate each test.',
        );
      }

      const {
        container = globalContainer,
        legacyRoot = globalLegacyRoot,
        ...localOptions
      } = options;
      return renderToString(element, {
        ...localOptions,
        container,
        legacyRoot,
        wrapper: createWrapper(options),
      });
    },
  };
}
