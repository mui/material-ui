# Browser benchmark

This project is used when running the following command:

```sh
yarn benchmark:browser
```

It is suppose to give developers comparable values between running different scenarios inside the browser, that can be find the `./scenarios` folder.

You should use these numbers exclusively for comparing performance between different scenarios, not as absolute values. There is also a `./noop` scenario, that renders nothing, to give you the idea of the initial setup time before the actual code is being run.

## Output

```
yarn benchmark:browser

noop (baseline):
mean: 4.70ms, median: 4.72ms
-------------
React primitives:
mean: 68.89ms, median: 64.02ms
-------------
React components:
mean: 74.38ms, median: 74.46ms
-------------
Styled Material-UI:
mean: 109.73ms, median: 109.46ms
-------------
Styled emotion:
mean: 102.59ms, median: 104.28ms
-------------
Styled SC:
mean: 104.06ms, median: 102.67ms
-------------
makeStyles:
mean: 93.81ms, median: 92.90ms
-------------
sx Material-UI box:
mean: 187.98ms, median: 188.77ms
-------------
Box Material-UI:
mean: 159.24ms, median: 157.90ms
-------------
sx Theme-UI box:
mean: 164.22ms, median: 164.16ms
-------------
sx Theme-UI div:
mean: 153.10ms, median: 152.77ms
-------------
Box Chakra-UI:
mean: 154.95ms, median: 153.89ms
-------------
styled-components Box + @material-ui/system:
mean: 176.82ms, median: 176.60ms
-------------
styled-components Box + styled-system:
mean: 155.18ms, median: 154.63ms
-------------
```
