// File is not transpiled.
const path = require('path');
const fse = require('fs-extra');

/**
 * @typedef {object} Browser
 * @property {string} id -  Seem random
 * @property {string} name - Includes name, version and OS
 */

/**
 * Records results from the Profiler injected
 * @param {*} karmaConfig
 */
function KarmaReporterReactProfiler(karmaConfig) {
  /**
   * Mapping from browser.id to all profiler results it received
   * @type {Map<string, Record<string, unknown[]>}
   */
  const allRenders = new Map();

  const { outputDir } = karmaConfig.reactProfilerReporter || {};
  if (typeof outputDir !== 'string') {
    throw new TypeError(
      `Expected karma config to contain reactProfilerReporter.outputDir of type 'string' but got type '${typeof outputDir}'.`,
    );
  }
  fse.ensureDirSync(outputDir);

  /**
   * @param {Browser} browser
   * @param {unknown | { type: 'reactProfilerResults', detail: Record<string, unknown[]>}} info
   */
  function handleBrowserInfo(browser, info) {
    // `info?.type`
    if (info != null && info.type === 'reactProfilerResults') {
      Object.assign(allRenders.get(browser.id), info.detail);
    }
  }

  /**
   * @param {Browser} browser
   */
  this.onBrowserStart = (browser) => {
    allRenders.set(browser.id, {});
    // Create it on start to signal to users where the files will appear
    fse.ensureDirSync(path.join(outputDir, browser.name));

    browser.emitter.addListener('browser_info', handleBrowserInfo);
  };

  /**
   * @param {Browser} browser
   */
  this.onBrowserComplete = (browser) => {
    browser.emitter.removeListener('browser_info', handleBrowserInfo);

    const browserRenders = allRenders.get(browser.id);
    if (browserRenders === undefined) {
      // Can be undefined if the run for this browser never started.
      // For example, when starting the browser timed out in https://app.circleci.com/pipelines/github/mui/material-ui/32869/workflows/a2f398d9-2eb4-4390-a912-40c1b8d458d8/jobs/211413.
      console.warn(
        `Unable to find browser renders for '${browser.id}'. ` +
          `Only recorded renders for '${Array.from(allRenders.keys()).join("', '")}. ` +
          `Maybe the browser never started?'`,
      );
      return;
    }

    fse.ensureDirSync(path.join(outputDir, browser.name));
    fse.writeJSONSync(path.join(outputDir, browser.name, `${Date.now()}.json`), browserRenders, {
      spaces: 2,
    });
  };
}

KarmaReporterReactProfiler.$inject = ['config'];

module.exports = {
  'reporter:profiler': ['type', KarmaReporterReactProfiler],
};
