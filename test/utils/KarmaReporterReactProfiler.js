// File is not transpiled.
const fse = require('fs-extra');
const path = require('path');

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

    fse.ensureDirSync(path.join(outputDir, browser.name));
    fse.writeJSONSync(
      path.join(outputDir, browser.name, `${Date.now()}.json`),
      allRenders.get(browser.id),
      {
        spaces: 2,
      },
    );
  };
}

KarmaReporterReactProfiler.$inject = ['config'];

module.exports = {
  'reporter:profiler': ['type', KarmaReporterReactProfiler],
};
