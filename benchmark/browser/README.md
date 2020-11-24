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
mean: 4.62ms, median: 4.59ms
-------------
React primitives:
mean: 44.53ms, median: 44.71ms
-------------
React components:
mean: 55.59ms, median: 55.03ms
-------------
Styled Material-UI:
mean: 78.78ms, median: 79.82ms
-------------
Styled emotion:
mean: 72.87ms, median: 74.09ms
-------------
Styled SC:
mean: 92.07ms, median: 85.26ms
-------------
makeStyles:
mean: 73.84ms, median: 73.25ms
-------------
sx Material-UI box:
mean: 180.01ms, median: 180.43ms
-------------
Box Material-UI:
mean: 153.55ms, median: 153.30ms
-------------
sx Theme-UI box:
mean: 144.22ms, median: 144.60ms
-------------
Box Chakra-UI:
mean: 120.05ms, median: 119.48ms
-------------
styled-components Box + @material-ui/system:
mean: 157.13ms, median: 159.14ms
-------------
styled-components Box + styled-system:
mean: 135.29ms, median: 133.44ms
-------------
```
