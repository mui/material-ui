# Demo Next.js app for Zero Runtime

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/HEAD/packages/create-next-app).

## Getting started

First, build all the packages in the workspace atleast once. Run

```bash
pnpm build:zero
```

Then start the Next.js development server:

```bash
pnpm run --filter=@app/next-app dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

If you see and error like package `@pigment-css/react` not found, add it as a peer-dependency in `@mui/material`'s `package.json` file and run `pnpm build` and `pnpm install` again. Make sure to not push this change to git.

### Note

If you are testing changes in pigmentcss packages itself while also running this demo app, start the watch command in a separate terminal to watch and build pigmentcss package files as they change -

```bash
pnpm watch:zero
```

You might have to restart the next.js server.

## Build

To build the project, run the `build` command in this package:

```bash
pnpm run --filter=@app/next-app build
```
