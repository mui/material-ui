# Vite App

A sample vite application to test the working of zero runtime library.
This project is not part of the workspace yet.

## How to run

You can either run `yarn release:build` command to build all the packages, or you need to build, the the minimum -

1. `@mui/zero-runtime`
2. `@mui/zero-tag-processor`
3. `@mui/zero-vite-plugin`

Make sure you have also run `yarn release:build` at least once because we also use `@mui/material` and `@mui/system` packages. On subsequent runs, you can only build the above packages using -

```bash
yarn build
```

After building, you can run the project by changing into the directory and then

1. Install dependencies using `yarn install`
2. Start the dev server using `yarn dev`
3. Build the code using `yarn build`

Optionally, before running the dev server, you can run `yarn vite optimize --force` if it logged some error during `yarn vite`.

### Testing

This demo app has been configured to run tests using both vitest or jest.

1. Vitest - You can run `yarn test` to run the tests using vitest
2. Jest - You can run `yarn jest` to run the tests using jest
