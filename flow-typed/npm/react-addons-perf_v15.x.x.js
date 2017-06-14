// flow-typed signature: cb4b10c51560898b135037945ebf6748
// flow-typed version: 187dc46bbb/react-addons-perf_v15.x.x/flow_>=v0.23.x

declare module 'react-addons-perf' {
  declare function start(): void;
  declare function stop(): void;
  declare function printWasted(): void;
  declare function getLastMeasurements(): mixed;
  declare function printInclusive(): void;
  declare function printExclusive(): void;
  declare function printOperations(): void;
}

