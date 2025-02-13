# Benchmark

## `@mui/material`

_Synthetic benchmark_

```bash
pnpm server:core

ButtonBase x 40,724 ops/sec ±1.58% (189 runs sampled)
HocButton x 166,229 ops/sec ±1.04% (191 runs sampled)
NakedButton x 228,473 ops/sec ±0.99% (187 runs sampled)
ButtonBase enable ripple x 56,019 ops/sec ±0.87% (189 runs sampled)
ButtonBase disable ripple x 61,748 ops/sec ±0.35% (190 runs sampled)
```

## `@mui/docs`

_Synthetic benchmark_

```bash
pnpm server:docs

MarkdownElement x 3,941 ops/sec ±5.53% (185 runs sampled)
```

## `@mui/styles`

_Synthetic benchmark_

```bash
pnpm server:styles

Box x 3,850 ops/sec ±3.58% (178 runs sampled)
JSS naked x 35,493 ops/sec ±2.29% (183 runs sampled)
WithStylesButton x 16,844 ops/sec ±0.34% (191 runs sampled)
HookButton x 23,213 ops/sec ±0.88% (191 runs sampled)
StyledComponentsButton x 7,442 ops/sec ±2.09% (180 runs sampled)
EmotionButton x 11,345 ops/sec ±2.45% (185 runs sampled)
EmotionCssButton x 53,807 ops/sec ±0.40% (191 runs sampled)
EmotionServerCssButton x 43,701 ops/sec ±1.04% (190 runs sampled)
Naked x 58,694 ops/sec ±0.86% (188 runs sampled)
```

## `@mui/system`

_Synthetic benchmark_

```bash
pnpm server:system

@styled-system/css x 64,606 ops/sec ±0.45% (188 runs sampled)
@chakra-ui/system/css x 126,272 ops/sec ±0.21% (191 runs sampled)
@mui/system styleFunctionSx x 40,867 ops/sec ±0.50% (191 runs sampled)
```

## Real-world benchmark

```bash
pnpm server:server

bombardier \
  -c 100 \
  -l \
  -d 30s \
  -m GET \
  '0.0.0.0:3001/avatar'

Statistics        Avg      Stdev        Max
  Reqs/sec       442.47      55.44     547.63
  Latency      225.64ms    17.11ms   471.31ms
  Latency Distribution
     50%   221.98ms
     75%   230.69ms
     90%   241.19ms
     95%   247.87ms
     99%   273.88ms
  HTTP codes:
    1xx - 0, 2xx - 26642, 3xx - 0, 4xx - 0, 5xx - 0
    others - 0
  Throughput:    11.61MB/s
```

## Resources

- [Bombardier](https://github.com/codesenberg/bombardier)
