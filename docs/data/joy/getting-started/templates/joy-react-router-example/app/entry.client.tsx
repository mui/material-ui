import { hydrateRoot } from "react-dom/client";
import { RemixBrowser } from "@remix-run/react";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "./utils/createEmotionCache";

const cache = createEmotionCache();

hydrateRoot(
  document,
  <CacheProvider value={cache}>
    <RemixBrowser />
  </CacheProvider>
);
