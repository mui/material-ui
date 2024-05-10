# Vite App

A sample vite application to test the working of zero runtime library.
This project is not part of the workspace yet.

## How to run

You can either run `pnpm build` to build all packages or else build the two most important ones:

1. `@pigment-css/react`
2. `@pigment-css/vite-plugin`

Make sure you have also run `pnpm release:build` at least once because we also use `@mui/material` and `@mui/system` packages. On subsequent runs, you can only build the above packages using -

```bash
pnpm build
```

After building, you can run the project by changing into the directory and then

1. Install dependencies using `pnpm install`
2. Start the dev server using `pnpm dev`
3. Build the code using `pnpm build`

Optionally, before running the dev server, you can run `pnpm vite optimize --force` if it logged some error during `pnpm vite`.

If you see and error like package `@pigment-css/react` not found, add it as a peer-dependency in `@mui/material`'s `package.json` file and run `pnpm build` and `pnpm install` again. Make sure to not push this change to git.
