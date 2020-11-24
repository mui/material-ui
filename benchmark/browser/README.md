# Browser benchmark

This project is used when running the following command:

```sh
yarn benchmark:browser
```

It is suppose to give developers comparable values between running different scenarios inside the browser, that can be find the `./scenarios` folder.

You should use these numbers exclusively for comparing performance between different scenarios, not as absolute values. There is also a `./noop` scenario, that renders nothing, to give you the idea of the initial setup time before the actual code is being run.

## Output

```
noop (baseline):
mean: 4.01ms, median: 4.62ms
-------------
React primitives:
mean: 44.09ms, median: 44.21ms
-------------
React components:
mean: 55.34ms, median: 55.18ms
-------------
Styled Material-UI:
mean: 79.73ms, median: 79.73ms
-------------
Styled emotion:
mean: 72.96ms, median: 72.87ms
-------------
Styled SC:
mean: 83.49ms, median: 82.93ms
-------------
makeStyles:
mean: 72.42ms, median: 71.95ms
-------------
sx Material-UI box:
mean: 162.16ms, median: 162.25ms
-------------
Box Material-UI:
mean: 144.95ms, median: 143.14ms
-------------
sx Theme-UI box:
mean: 149.84ms, median: 144.01ms
-------------
sx Theme-UI div:
mean: 143.36ms, median: 137.45ms
-------------
Box Chakra-UI:
mean: 120.87ms, median: 112.08ms
-------------
styled-components Box + @material-ui/system:
mean: 178.75ms, median: 161.45ms
-------------
styled-components Box + styled-system:
mean: 141.99ms, median: 143.27ms
-------------
```
