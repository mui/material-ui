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
mean: 4.79ms, median: 4.75ms
-------------
React primitives:
mean: 44.62ms, median: 44.57ms
-------------
React components:
mean: 55.43ms, median: 54.68ms
-------------
Styled Material-UI:
mean: 80.52ms, median: 80.97ms
-------------
Styled emotion:
mean: 74.28ms, median: 75.29ms
-------------
Styled SC:
mean: 84.88ms, median: 83.66ms
-------------
makeStyles:
mean: 73.70ms, median: 72.37ms
-------------
Box Baseline:
mean: 81.75ms, median: 81.18ms
-------------
Box Material-UI:
mean: 184.21ms, median: 183.96ms
-------------
Box Theme-UI:
mean: 140.85ms, median: 139.90ms
-------------
Box Chakra-UI:
mean: 119.57ms, median: 119.28ms
-------------
styled-components Box + @material-ui/system:
mean: 157.96ms, median: 158.29ms
-------------
styled-components Box + styled-system:
mean: 135.73ms, median: 136.78ms
-------------
```
