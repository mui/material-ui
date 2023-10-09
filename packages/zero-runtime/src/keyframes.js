export default function keyframes() {
  throw new Error(
    'MUI: You were trying to call "keyframes" function without configuring your bundler. Make sure to install the bundler specific plugin and use it. @mui/zero-vite-plugin for Vite integration or @mui/zero-next-plugin for Next.js integration.',
  );
}
