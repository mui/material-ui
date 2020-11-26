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
mean: 4.38ms, median: 4.19ms
-------------
React primitives:
mean: 37.51ms, median: 37.52ms
-------------
React components:
mean: 48.16ms, median: 47.55ms
-------------
Styled Material-UI:
mean: 66.23ms, median: 67.31ms
-------------
Styled emotion:
mean: 62.09ms, median: 63.32ms
-------------
Styled SC:
mean: 71.33ms, median: 70.02ms
-------------
makeStyles:
mean: 61.34ms, median: 59.44ms
-------------
Box Baseline:
mean: 68.09ms, median: 67.21ms
-------------
Box Material-UI:
mean: 136.21ms, median: 135.07ms
-------------
Box Theme-UI:
mean: 133.87ms, median: 130.74ms
-------------
Box Chakra-UI:
mean: 118.28ms, median: 116.01ms
-------------
styled-components Box + @material-ui/system:
mean: 154.06ms, median: 153.32ms
-------------
styled-components Box + styled-system:
mean: 132.18ms, median: 134.05ms
-------------
```
