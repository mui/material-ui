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
  04.25 ±00.23ms
React primitives:
  36.53 ±13.92ms
React components:
  121 ±6%
Styled Material-UI:
  187 ±9%
Styled emotion:
  172 ±8%
Styled SC:
  220 ±11%
makeStyles:
  184 ±10%
Box Baseline:
  199 ±10%
Box Material-UI:
  487 ±12%
Box Theme-UI:
  424 ±14%
Box Chakra-UI:
  328 ±7%
styled-components Box + @material-ui/system:
  468 ±30%
styled-components Box + styled-system:
  366 ±12%
```
