# Demo Next.js app for Zero Runtime

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, build all the packages in the workspace atleast once. Run

```bash
pnpm build
```

Then start the Next.js development server:

```bash
pnpm run --filter=@app/next-app dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

### Note

If you are testing changes in zero-runtime packages itself while also running this demo app, start the watch command in a separate terminal to watch and build zero-runtime package files as they change -

```bash
pnpm watch:zero
```

You might have to restart the next.js server.

## Build

To build the project, run the `build` command in this package:

```bash
pnpm run --filter=@app/next-app build
```
