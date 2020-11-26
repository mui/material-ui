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
  04.77 ±00.96ms
React primitives:
  69.49 ±10.60ms
React components:
  88 ±4%
Styled Material-UI:
  119 ±6%
Styled emotion:
  108 ±5%
Styled SC:
  127 ±6%
makeStyles:
  112 ±6%
Box Baseline:
  125 ±5%
Box Material-UI:
  255 ±7%
Box Theme-UI:
  236 ±8%
Box Chakra-UI:
  193 ±5%
styled-components Box + @material-ui/system:
  271 ±6%
styled-components Box + styled-system:
  222 ±5%
```
