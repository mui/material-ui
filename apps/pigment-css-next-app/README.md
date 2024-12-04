# Pigment CSS with Next.js - Demo app

This is a Pigment CSS and [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/HEAD/packages/create-next-app).

## Getting started

First, build all the packages in the workspace at least once. Run

```bash
pnpm build
```

Then start the Next.js development server:

```bash
pnpm run --filter=@app/next-app dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app running live.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

If you encounter an error that says "package `@pigment-css/react` not found," add it as a peer dependency in the `package.json` for `@mui/material`, then run `pnpm build` and `pnpm install` again. Make sure to not push this change to git.

### Note

If you're testing changes in Pigment CSS-related packages while also running this demo app, run the watch command in a separate terminal to watch and build Pigment CSS package files as they change:

```bash
pnpm watch:zero
```

You might have to restart the Next.js server.

## Build

To build the project, run the `build` command in this package:

```bash
pnpm run --filter=@app/next-app build
```
