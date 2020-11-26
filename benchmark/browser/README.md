# Browser benchmark

This project is used when running the following command:

```sh
yarn benchmark:browser
```

It is suppose to give developers comparable values between running different scenarios inside the browser, that can be find the `./scenarios` folder.

You should use these numbers exclusively for comparing performance between different scenarios, not as absolute values. There is also a `./noop` scenario, that renders nothing, to give you the idea of the initial setup time before the actual code is being run.

## Output

```
mean: 4.22ms, median: 4.19ms
-------------
React primitives:
mean: 37.34ms, median: 36.98ms
-------------
React components:
mean: 47.06ms, median: 47.06ms
-------------
Styled Material-UI:
mean: 65.55ms, median: 66.13ms
-------------
Styled emotion:
mean: 62.47ms, median: 63.50ms
-------------
Styled SC:
mean: 70.34ms, median: 69.06ms
-------------
makeStyles:
mean: 60.13ms, median: 58.52ms
-------------
Box Baseline:
mean: 68.66ms, median: 68.09ms
-------------
Box Material-UI:
mean: 134.45ms, median: 133.55ms
-------------
Box Theme-UI:
mean: 139.31ms, median: 131.28ms
-------------
Box Chakra-UI:
mean: 105.03ms, median: 105.26ms
-------------
styled-components Box + @material-ui/system:
mean: 164.20ms, median: 145.12ms
-------------
styled-components Box + styled-system:
mean: 122.32ms, median: 124.57ms
-------------
```
