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

colors @material-ui/system  x 333,431 ops/sec ±2.02% (171 runs sampled)
colors styled-system x 304,604 ops/sec ±3.21% (179 runs sampled)
spaces @material-ui/system x 271,556 ops/sec ±1.49% (184 runs sampled)
spaces styled-system x 263,736 ops/sec ±1.46% (184 runs sampled)
compose @material-ui/system x 37,278 ops/sec ±6.57% (171 runs sampled)
compose styled-system x 61,762 ops/sec ±3.30% (179 runs sampled)
@material-ui/core all-inclusive x 42,120 ops/sec ±1.24% (183 runs sampled)
styled-components Box + @material-ui/system x 11,337 ops/sec ±4.52% (174 runs sampled)
styled-components Box + styled-system x 13,114 ops/sec ±2.47% (180 runs sampled)
Box emotion x 18,773 ops/sec ±2.08% (182 runs sampled)
Box @material-ui/styles x 5,605 ops/sec ±4.45% (183 runs sampled)
Box styled-components x 11,857 ops/sec ±1.04% (186 runs sampled)
Naked styled-components x 19,036 ops/sec ±0.88% (189 runs sampled)
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
