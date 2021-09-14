/* eslint-disable import/prefer-default-export */

export const logReactMetrics = (
  id, // the "id" prop of the Profiler tree that has just committed
  phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
  actualDuration, // time spent rendering the committed update
  baseDuration, // estimated time to render the entire subtree without memoization
  startTime, // when React began rendering this update
  commitTime, // when React committed this update
) => {
  // eslint-disable-next-line no-console
  console.info({
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
  });
};
