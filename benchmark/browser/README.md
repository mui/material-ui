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
  06.13 ±00.83ms
React primitives:
  61.38 ±51.51ms
React components:
  100 ±6%
Styled Material-UI:
  160 ±11%
Styled emotion:
  144 ±7%
Styled SC:
  170 ±9%
makeStyles:
  149 ±5%
Box Baseline:
  170 ±12%
Box Material-UI:
  402 ±14%
Box Theme-UI:
  354 ±16%
Box Chakra-UI:
  268 ±14%
styled-components Box + @material-ui/system:
  373 ±13%
styled-components Box + styled-system:
  298 ±13%
```
