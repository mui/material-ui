# Browser benchmark

This project is used when running the following command:

```bash
pnpm benchmark:browser
```

It is suppose to give developers comparable values between running different scenarios inside the browser, that can be find the `./scenarios` folder.

You should use these numbers exclusively for comparing performance between different scenarios, not as absolute values. There is also a `./noop` scenario, that renders nothing, to give you the idea of the initial setup time before the actual code is being run.

## Output

For comparable results ask a maintainer to approve the CircleCI job `benchmark`.

```bash
noop (baseline):
  02.53 ±00.11ms
Grid (html):
  28.34 ±01.80ms
Grid System:
  167 ±2%
Grid Material UI:
  179 ±1%
Table:
  128 ±3%
React primitives:
  54 ±1%
React components:
  58 ±1%
Styled MUI:
  94 ±1%
Styled emotion:
  96 ±1%
Styled SC:
  94 ±1%
makeStyles:
  83 ±0%
Box Baseline:
  106 ±1%
Box MUI:
  180 ±1%
Box Theme-UI:
  201 ±1%
Box Chakra-UI:
  131 ±1%
styled-components Box + @mui/system:
  184 ±3%
styled-components Box + styled-system:
  154 ±3%
```
