# Bundle fixtures

A collection of "smoke"-test that verify that the package layout is correct.

`createFixture` is used to create new or update existing fixtures.
The created file might need some manual adjustment since not every edge case is covered.

## Run a fixture

1. Navigate into the fixture you want to test (where the `packge.json` is located)
1. Use the node version you want to use (e.g. `nvm use 14.0.0`)
1. Prepare the package.json
   - to test a Pull Request
     - checkout branch
     - `yarn`
     - `yarn lerna run build --scope "@material-ui/*"`
     - `cd` to fixture
     - `node ../useBuildFromSource.js .`
   - to test a published npm dist tag (e.g. `latest` or `next`) on npm
     - adjust the dependencies in the package.json accordingly
1. `cd` to fixture
1. `yarn install`
1. `yarn start` should exit with 0

## Add a new fixture

1. Create a folder in `test/fixtures/bundling`
1. Add the necessary dependencies
1. Re-use the entries for `dependencies` and `resolutions` for `@material-ui/*` packages from the other fixtures
1. Create a template
1. Write a factory that fills the template in `test/fixtures/bundling/createFixture`
1. Add an entry into the `bundling` CircleCI pipeline (`.circleci/config.yml`)
