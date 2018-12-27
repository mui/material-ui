# Material-UI benchmark

## `@material-ui/core`

*Synthetic benchmark*

```sh
yarn core

ButtonBase no cache x 5,226 ops/sec ±7.01% (181 runs sampled)
ButtonBase cache requests x 40,400 ops/sec ±1.15% (187 runs sampled)
HocButton x 147,810 ops/sec ±1.21% (186 runs sampled)
NakedButton x 209,086 ops/sec ±1.26% (190 runs sampled)
ButtonBase enable ripple x 55,893 ops/sec ±0.89% (188 runs sampled)
ButtonBase disable ripple x 57,364 ops/sec ±2.35% (187 runs sampled)
Markdown x 924 ops/sec ±3.05% (184 runs sampled)
```

## `@material-ui/styles`

*Synthetic benchmark*

```sh
yarn styles

JSSButton x 13,573 ops/sec ±5.01% (78 runs sampled)
Box x 3,043 ops/sec ±4.14% (179 runs sampled)
JSS naked x 21,021 ops/sec ±7.27% (72 runs sampled)
WithStylesButton x 8,442 ops/sec ±3.31% (176 runs sampled)
HookButton x 11,265 ops/sec ±3.43% (178 runs sampled)
StyledComponentsButton x 6,745 ops/sec ±2.91% (181 runs sampled)
EmotionButton x 6,856 ops/sec ±5.06% (165 runs sampled)
Naked x 32,683 ops/sec ±3.54% (172 runs sampled)
hashing x 221,423 ops/sec ±1.22% (190 runs sampled)
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
