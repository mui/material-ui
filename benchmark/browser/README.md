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
mean: 4.30ms, median: 4.31ms
-------------
React primitives:
mean: 39.36ms, median: 38.36ms
-------------
React components:
mean: 46.94ms, median: 46.75ms
-------------
Styled Material-UI:
mean: 66.67ms, median: 66.74ms
-------------
Styled emotion:
mean: 61.88ms, median: 62.98ms
-------------
Styled SC:
mean: 72.43ms, median: 73.13ms
-------------
makeStyles:
mean: 61.69ms, median: 60.93ms
-------------
Box Baseline:
mean: 70.83ms, median: 68.47ms
-------------
Box Material-UI:
mean: 141.27ms, median: 142.69ms
-------------
Box Theme-UI:
mean: 137.48ms, median: 129.21ms
-------------
Box Chakra-UI:
mean: 116.90ms, median: 116.44ms
-------------
styled-components Box + @material-ui/system:
mean: 150.92ms, median: 151.85ms
-------------
styled-components Box + styled-system:
mean: 131.34ms, median: 133.06ms
-------------
```
