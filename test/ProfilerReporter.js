/* eslint-disable no-console */
const Mocha = require('mocha');

const { EVENT_TEST_BEGIN, EVENT_TEST_END, EVENT_RUN_BEGIN, EVENT_RUN_END } = Mocha.Runner.constants;

/**
 * Simple mocha reporter logging reports from reacts profiling API
 *
 * TODO:
 * - create a rich profile report for each test that can be compared with other reports
 * - persist that profile report so that we can monitor it over time and compare it
 * - decide what we want to compare (#commit, duration (I think at some point it
 *   will include instruction count) between commits, multiple runs) and consider all the
 *   intricacies of benchmarks (mean, media, percentile and all the smart words)
 * - it's terribly hacky (`global`) is there another way to get `test.fullTitle` than using `this`?
 *    - maybe possible with https://github.com/reactjs/rfcs/pull/89
 *    - how does this behave if tests are run concurrently (do not confuse with Concurrent React)
 * - make test runnable in prod environment (at least Material-UI + React)
 *    - suggesting:
 *      - Move to public imports `./Button` -> `@material-ui/core/Button`
 *      - alias `@material-ui/core` to compiled lib or source depending on test environment
 * - move to CI
 * - how to integrate with karma?
 */
class ProfilerReporter {
  constructor(runner) {
    runner
      .once(EVENT_RUN_BEGIN, () => {
        /**
         * @type {React.ProfilerOnRenderCallback}
         */
        global.profilerOnRender = (id, phase, actualDuration, baseDuration) => {
          console.log(id, phase.replace('mount', 'mount '), actualDuration, baseDuration);
          //                                      ^^^^^^ rightPad to match `update` :)
        };
      })
      .once(EVENT_RUN_END, () => {
        global.profilerOnRender = undefined;
      })
      .on(EVENT_TEST_BEGIN, test => {
        global.profilerId = test.fullTitle();
      })
      .on(EVENT_TEST_END, () => {
        global.profilerId = undefined;
      });
  }
}

module.exports = ProfilerReporter;
