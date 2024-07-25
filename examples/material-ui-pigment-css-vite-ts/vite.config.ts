import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { pigment } from "@pigment-css/vite-plugin";
import { extendTheme } from "@mui/material/styles";

const pigmentConfig = {
  theme: extendTheme(),
  transformLibraries: ["@mui/material"],
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), pigment(pigmentConfig)],
});
