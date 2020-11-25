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
mean: 4.59ms, median: 4.34ms
-------------
React primitives:
mean: 38.18ms, median: 37.75ms
-------------
React components:
mean: 47.13ms, median: 46.60ms
-------------
Styled Material-UI:
mean: 66.69ms, median: 67.45ms
-------------
Styled emotion:
mean: 63.08ms, median: 63.65ms
-------------
Styled SC:
mean: 72.38ms, median: 71.10ms
-------------
makeStyles:
mean: 66.23ms, median: 61.97ms
-------------
Box Baseline:
mean: 77.80ms, median: 69.32ms
-------------
Box Material-UI:
mean: 145.05ms, median: 142.62ms
-------------
Box Theme-UI:
mean: 149.93ms, median: 146.94ms
-------------
Box Chakra-UI:
mean: 123.29ms, median: 123.52ms
-------------
styled-components Box + @material-ui/system:
mean: 162.96ms, median: 162.48ms
-------------
styled-components Box + styled-system:
mean: 140.86ms, median: 141.33ms
-------------
```
