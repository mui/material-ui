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
  04.59 ±00.10ms
React primitives:
  44.05 ±02.19ms
React components:
  126 ±8%
Styled Material-UI:
  174 ±6%
Styled emotion:
  163 ±6%
Styled SC:
  191 ±5%
makeStyles:
  168 ±6%
Box Baseline:
  180 ±4%
Box Material-UI:
  377 ±6%
Box Theme-UI:
  316 ±6%
Box Chakra-UI:
  269 ±9%
styled-components Box + @material-ui/system:
  358 ±8%
styled-components Box + styled-system:
  307 ±9%
```
