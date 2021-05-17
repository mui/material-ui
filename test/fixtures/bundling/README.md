# Bundle fixtures

A collection of "smoke"-test that verify that the package layout is correct.

`createFixture` is used to create new or update existing fixtures.
The created file might need some manual adjustment since not every edge case is covered.

## Run a fixture

1. Navigate into the fixture you want to test (where the `packge.json` is located)
1. Use the node version you want to use (e.g. `nvm use 14.0.0`)
1. Prepare the package.json
   - to test a Pull Request run `node ../setup . csb:7839b1e2d85fe5be310054821a0566a753886adf`
     `7839b1e2d85fe5be310054821a0566a753886adf` has to be a commit SHA from the branch of the Pull Request you want to test.
   - to test a published version on npm `node ../setup . 5.0.0-alpha.13` WARNING: The script naively assumes all packages have the same version. You might have to manually adjust versions. The script only exists to give you a scaffold for where the version should be put.
1. `yarn install --no-lockfile`
1. `yarn start` should exit with 0
