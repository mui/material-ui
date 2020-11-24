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
mean: 4.47ms, median: 4.20ms
-------------
React primitives:
mean: 37.48ms, median: 37.48ms
-------------
React components:
mean: 45.75ms, median: 46.42ms
-------------
Styled Material-UI:
mean: 71.86ms, median: 66.99ms
-------------
Styled emotion:
mean: 65.54ms, median: 62.16ms
-------------
Styled SC:
mean: 73.73ms, median: 73.30ms
-------------
makeStyles:
mean: 61.43ms, median: 61.18ms
-------------
sx Material-UI box:
mean: 132.91ms, median: 134.32ms
-------------
sx Theme-UI box:
mean: 127.91ms, median: 127.13ms
-------------
sx Theme-UI div:
mean: 148.44ms, median: 131.76ms
-------------
Box Chakra-UI:
mean: 106.77ms, median: 104.30ms
-------------
styled-components Box + @material-ui/system:
mean: 153.74ms, median: 153.83ms
-------------
styled-components Box + styled-system:
mean: 131.95ms, median: 133.24ms
-------------
```
