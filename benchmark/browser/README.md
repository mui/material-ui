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
  06.29 ±00.44ms
Table:
  127.33 ±10.08ms
React primitives:
  34 ±6%
React components:
  45 ±3%
Styled Material-UI:
  73 ±4%
Styled emotion:
  67 ±3%
Styled SC:
  80 ±2%
makeStyles:
  71 ±3%
Box Baseline:
  81 ±3%
Box Material-UI:
  209 ±15%
Box Theme-UI:
  172 ±8%
Box Chakra-UI:
  115 ±8%
styled-components Box + @material-ui/system:
  194 ±9%
styled-components Box + styled-system:
  162 ±10%
```
