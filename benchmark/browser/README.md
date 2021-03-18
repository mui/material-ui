# Browser benchmark

This project is used when running the following command:

```sh
yarn benchmark:browser
```

It is suppose to give developers comparable values between running different scenarios inside the browser, that can be find the `./scenarios` folder.

You should use these numbers exclusively for comparing performance between different scenarios, not as absolute values. There is also a `./noop` scenario, that renders nothing, to give you the idea of the initial setup time before the actual code is being run.

## Output

For compareable results ask a maintainer to approve the CircleCI job `benchmark`.

```
noop (baseline):
  06.57 ±00.66ms
Table:
  133.29 ±09.16ms
React primitives:
  35 ±6%
React components:
  45 ±2%
Styled Material-UI:
  76 ±3%
Styled emotion:
  67 ±2%
Styled SC:
  84 ±2%
makeStyles:
  71 ±3%
Box Baseline:
  80 ±2%
Box Material-UI:
  194 ±4%
Box Theme-UI:
  163 ±5%
Box Chakra-UI:
  114 ±2%
styled-components Box + @material-ui/system:
  186 ±4%
styled-components Box + styled-system:
  153 ±6%
```
