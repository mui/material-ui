# fixtures

Collection of test fixtures for manual e2e testing. Each fixture has unambiguous
instructions that consist of a before state, an action and the state after.
Before the instructions is a description of the initial state.

## Usage

```bash
# all commands in the workspace root
$ yarn workspace @material-ui/core build:umd --watch
# in another terminal
$ npx serve
# goto http://localhost:5000/test/fixtures/ to find an overview of the fixtures
```
