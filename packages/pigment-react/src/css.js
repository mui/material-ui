export default function css() {
  throw new Error(
    `${process.env.PACKAGE_NAME}: You were trying to call "css" function without configuring your bundler. Make sure to install the bundler specific plugin and use it. @pigmentcss/vite-plugin for Vite integration or @pigmentcss/nextjs-plugin for Next.js integration.`,
  );
}
