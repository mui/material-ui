import { CacheProvider } from "@emotion/react";

import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import createCache from "@emotion/cache";

function createEmotionCache() {
  return createCache({ key: "css" });
}

export function MuiProvider({ children }: { children: React.ReactNode }) {
  const cache = createEmotionCache();

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CacheProvider>
  );
}
