# Contributing

## Understanding the codemod

The codemod is a tool that helps developers migrate their codebase when we introduce changes in a new version. The changes could be deprecations, enhancements, or breaking changes.

The codemods for JavaScript files are based on [jscodeshift](https://github.com/facebook/jscodeshift) which is a wrapper of [recast](https://github.com/benjamn/recast).

The codemods for CSS files are based on [postcss](https://github.com/postcss/postcss).

## Adding a new codemod

1. Create a new folder in `packages/mui-codemod/src/*/*` with the name of the codemod.
2. The folder should include:
   - `<codemod>.js` - the transform implementation
   - `index.js` - exports the transform function
   - `postcss-plugin.js` - the postcss plugin (optional)
   - `postcss.config.js` - the postcss config file (optional)
   - `<codemod>.test.js` - tests for the codemods (use jscodeshift from the `testUtils` folder)
   - `test-cases` - folder with fixtures for the codemod
     - `actual.js` - the input for the codemod
     - `expected.js` - the expected output of the codemod
     - `actual.css` - the input for the postcss plugin (optional)
     - `expected.css` - the expected output of the postcss plugin (optional)
3. Use [astexplorer](https://astexplorer.net/) to check the AST types and properties
   - For JavaScript codemods set </> to @babel/parser because we use [`tsx`](https://github.com/benjamn/recast/blob/master/parsers/babel.ts) as a default parser.
   - For CSS codemods set </> to postcss
4. [Test the codemod locally](#local)
5. Add the codemod to README.md

## Testing

I recommend to follow these steps to test the codemod:

- Create an `actual.js` file with the code you want to transform.
- Run [local](#local) transformation to check if the codemod is correct.
- Copy the transformed code to `expected.js`.
- Run `pnpm tc <codemod>` to final check if the codemod is correct.

💡 The reason that I don't recommend creating the `expected.js` and run the test with `pnpm` script is because the transformation is likely not pretty-printed and it's hard to compare the output with the expected output.

### Local transformation (while developing)

Open the terminal at root directory and run the codemod to test the transformation, for example, testing the `accordion-props` codemod:

```bash
node packages/mui-codemod/codemod deprecations/accordion-props packages/mui-codemod/src/deprecations/accordion-props/test-cases/theme.actual.js
```

### CI (after opening a PR)

To simulate a consumer-facing experience on any project before merging the PR, open the CodeSandbox CI build and copy the link from the "Local Install Instructions" section.

Run the codemod to test the transformation:

```bash
npx @mui/codemod@<link> <codemod> <path>
```

For example:

```bash
npx @mui/codemod@https://pkg.csb.dev/mui/material-ui/commit/39bf9464/@mui/codemod deprecations/accordion-props docs/src/modules/brandingTheme.ts
```
