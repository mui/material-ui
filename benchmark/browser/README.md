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
mean: 4.32ms, median: 4.17ms
-------------
React primitives:
mean: 38.09ms, median: 37.67ms
-------------
React components:
mean: 56.85ms, median: 45.84ms
-------------
Styled Material-UI:
mean: 72.65ms, median: 68.24ms
-------------
Styled emotion:
mean: 68.09ms, median: 63.63ms
-------------
Styled SC:
mean: 71.07ms, median: 70.53ms
-------------
makeStyles:
mean: 61.48ms, median: 59.71ms
-------------
Box Baseline:
mean: 68.47ms, median: 67.75ms
-------------
Box Material-UI:
mean: 146.63ms, median: 147.28ms
-------------
Box Theme-UI:
mean: 143.49ms, median: 141.81ms
-------------
Box Chakra-UI:
mean: 117.35ms, median: 114.51ms
-------------
styled-components Box + @material-ui/system:
mean: 157.55ms, median: 157.91ms
-------------
styled-components Box + styled-system:
mean: 132.07ms, median: 133.12ms
-------------
```
