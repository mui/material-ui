# Pigment CSS testing

## Folder structure

- `tests` is the root folder for all tests
  - `fixtures` contains all the fixtures for the tests
    - `*.input.js` are the input files created manually
    - `*.output.*` are the expected output files created by running the tests
  - `*.test.js` are the test files that run the fixtures

## Running tests

At the root project terminal:

```bash
pnpm nx run @pigment-css/react:test
```

To update the output fixtures:

```bash
pnpm nx run @pigment-css/react:test:update
```

## Adding new tests

Each folder inside `tests` is a Pigment CSS feature. To add a new test, create a new folder with the feature name and add a new test file with the `.test.js` extension. Inside the test file, import the fixtures and run the tests.

## Adding new fixtures

Create a new file name with `[name].input.js` and add `styled`, `css` or other Pigment CSS calls into the file.

The first time you run the tests, the output files will be created automatically. Then check the output files to make sure they are correct.

For any implementation changes after that, if you want to update the output files, run the tests with the `test:update` script.
