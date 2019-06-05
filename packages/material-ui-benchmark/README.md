# Material-UI benchmark

## `@material-ui/core`

*Synthetic benchmark*

```sh
yarn core

ButtonBase x 40,724 ops/sec ±1.58% (189 runs sampled)
HocButton x 166,229 ops/sec ±1.04% (191 runs sampled)
NakedButton x 228,473 ops/sec ±0.99% (187 runs sampled)
ButtonBase enable ripple x 56,019 ops/sec ±0.87% (189 runs sampled)
ButtonBase disable ripple x 61,748 ops/sec ±0.35% (190 runs sampled)
Markdown x 954 ops/sec ±1.35% (187 runs sampled)
```

## `@material-ui/docs`

*Synthetic benchmark*

```sh
yarn docs

Markdown x 946 ops/sec ±4.04% (176 runs sampled)
MarkdownElement x 3,941 ops/sec ±5.53% (185 runs sampled)
```

## `@material-ui/styles`

*Synthetic benchmark*

```sh
yarn styles

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

## `@material-ui/system`

*Synthetic benchmark*

```sh
yarn system

colors @material-ui/system  x 340,028 ops/sec ±3.73% (163 runs sampled)
colors styled-system x 158,271 ops/sec ±2.20% (183 runs sampled)
spaces @material-ui/system x 295,214 ops/sec ±0.63% (183 runs sampled)
spaces styled-system x 115,424 ops/sec ±3.13% (187 runs sampled)
compose @material-ui/system x 59,122 ops/sec ±1.85% (183 runs sampled)
compose styled-system x 27,458 ops/sec ±0.66% (186 runs sampled)
@material-ui/core all-inclusive x 44,536 ops/sec ±5.64% (181 runs sampled)
styled-components Box + @material-ui/system x 11,381 ops/sec ±1.05% (186 runs sampled)
styled-components Box + styled-system x 7,990 ops/sec ±1.89% (185 runs sampled)
Box emotion x 21,568 ops/sec ±3.01% (181 runs sampled)
Box @material-ui/styles x 11,143 ops/sec ±2.84% (182 runs sampled)
Box styled-components x 10,474 ops/sec ±1.04% (188 runs sampled)
```

## Real-world benchmark

```sh
yarn server

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
