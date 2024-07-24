import withBundleAnalyzer from "@next/bundle-analyzer";
import { withPigment } from "@pigment-css/nextjs-plugin";
import { extendTheme } from "@mui/material";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withPigment(withBundleAnalyzer({ enabled: false })(nextConfig), {
  theme: extendTheme({
    typography: {
      fontFamily: "var(--font-family)",
    },
  }),
  transformLibraries: ["@mui/material"],
});
