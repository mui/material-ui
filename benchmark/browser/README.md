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
  05.82 ±00.29ms
React primitives:
  42.62 ±03.55ms
React components:
  128 ±4%
Styled Material-UI:
  192 ±8%
Styled emotion:
  179 ±8%
Styled SC:
  224 ±13%
makeStyles:
  184 ±9%
Box Baseline:
  213 ±11%
Box Material-UI:
  501 ±23%
Box Theme-UI:
  447 ±20%
Box Chakra-UI:
  364 ±17%
styled-components Box + @material-ui/system:
  506 ±22%
styled-components Box + styled-system:
  388 ±12%
```
