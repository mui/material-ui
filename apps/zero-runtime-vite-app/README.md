# Vite App

A sample vite application to test the working of zero runtime library.
This project is not part of the workspace yet.

## How to run

You can either run `pnpm release:build` command to build all the packages, or you need to build, the the minimum -

1. `@mui/zero-runtime`
2. `@mui/zero-tag-processor`

Make sure you have also run `pnpm release:build` at least once because we also use `@mui/material` and `@mui/system` packages. On subsequent runs, you can only build the above 2 packages using -

```bash
pnpm build:zero
```

After building, you can run the project by changing into the directory and then

1. Install dependencies using `pnpm install`
2. Start the dev server using `pnpm vite`
3. Build the code using `pnpm vite build`

Optionally, before running the dev server, you can run `pnpm vite optimize --force` if it logged some error during `pnpm vite`.
