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
mean: 4.96ms, median: 4.56ms
-------------
React primitives:
mean: 39.20ms, median: 39.14ms
-------------
React components:
mean: 48.49ms, median: 47.61ms
-------------
Styled Material-UI:
mean: 72.32ms, median: 70.97ms
-------------
Styled emotion:
mean: 63.42ms, median: 63.15ms
-------------
Styled SC:
mean: 76.47ms, median: 78.22ms
-------------
makeStyles:
mean: 62.78ms, median: 61.30ms
-------------
Box Baseline:
mean: 78.53ms, median: 76.82ms
-------------
Box Material-UI:
mean: 170.02ms, median: 168.28ms
-------------
Box Theme-UI:
mean: 150.19ms, median: 150.71ms
-------------
Box Chakra-UI:
mean: 124.61ms, median: 123.40ms
-------------
styled-components Box + @material-ui/system:
mean: 162.98ms, median: 162.83ms
-------------
styled-components Box + styled-system:
mean: 142.03ms, median: 141.56ms
-------------
```
