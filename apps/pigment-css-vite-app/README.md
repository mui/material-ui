# Pigment CSS with Vite - Demo app

This is a Pigment CSS with [Vite](https://vitejs.dev/) project.
This project is not part of the workspace yet.

## How to run

First, build all the packages in the workspace at least once. Run

```bash
pnpm build
```

After building, you can run the project by changing into the directory and then:

1. Install dependencies using `pnpm install`
2. Start the dev server using `pnpm dev`
3. Build the code using `pnpm build`

Optionally, before running the dev server, you can run `pnpm vite optimize --force` if it logs an error while running `pnpm vite`.

If you encounter an error that says "package `@pigment-css/react` not found," add it as a peer dependency in the `package.json` for `@mui/material`, then run `pnpm build` and `pnpm install` again. Make sure to not push this change to git.
