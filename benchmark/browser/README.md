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
  04.35 ±00.17ms
React primitives:
  45.17 ±02.03ms
React components:
  121 ±5%
Styled Material-UI:
  168 ±9%
Styled emotion:
  153 ±7%
Styled SC:
  183 ±8%
makeStyles:
  155 ±7%
Box Baseline:
  178 ±9%
Box Material-UI:
  344 ±10%
Box Theme-UI:
  331 ±8%
Box Chakra-UI:
  275 ±13%
styled-components Box + @material-ui/system:
  366 ±13%
styled-components Box + styled-system:
  281 ±21%
```
