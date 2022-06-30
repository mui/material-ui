# TypeScript benchmark

This document is suppose to give you an overall idea of how you can do a benchmark when working on some TypeScript performance optimizations.

The idea is to run the baseline together with the scenario you are optimizing for, and compare them on both master and your current branch. You can use the commands:

```
yarn tsc benchmark/typescript/scenarios/Baseline.ts --generateTrace baseline-trace --incremental false
```

```
yarn tsc benchmark/typescript/scenarios/OverridableComponent.ts --generateTrace overridable-component-trace --incremental false
```

Using `chrome://about` you can load the `trace.json` files and compare the times.
