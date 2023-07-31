# Material UI - Next.js App Router example in TypeScript

This is a [Next.js](https://nextjs.org/) project bootstrapped using [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with Material UI installed.

## How to use

Download the example [or clone the repo](https://github.com/mui/material-ui):

<!-- #default-branch-switch -->

```bash
curl https://codeload.github.com/mui/material-ui/tar.gz/master | tar -xz --strip=2  material-ui-master/examples/material-ui-nextjs-ts
cd material-ui-nextjs-ts
```

Install dependencies:

```bash
#npm
npm install

# yarn
yarn

# pnpm
pnpm install
```

Start a local dev server:

```bash
# npm
npm dev

# yarn
yarn dev

# pnpm
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

This example uses [`next/font/google`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts#google-fonts) to automatically optimize and load Roboto, a custom Google Font.

## Project Structure

Here are some important files and folders in the project directory:

```
/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── components/
│       ├── ThemeRegistry/
│       └── Link.tsx
├── public/
├── next.config.js
└── package.json
```

`ThemeRegistry` is a provider that

Static assets like images can be placed in the `public/` directory.

## Learn More

To learn more about this example:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Customizing Material UI](https://mui.com/material-ui/customization/how-to-customize/) - approaches to customizing Material UI.
