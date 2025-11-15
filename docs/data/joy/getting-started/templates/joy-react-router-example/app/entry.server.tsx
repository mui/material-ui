import type { EntryContext } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { renderToString } from "react-dom/server";

// --- Emotion + Joy UI Imports ---
import createEmotionServer from "@emotion/server/create-instance";
import createEmotionCache from "./utils/createEmotionCache";

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  // 1️⃣ Create Emotion cache
  const cache = createEmotionCache();
  const { extractCriticalToChunks, constructStyleTagsFromChunks } =
    createEmotionServer(cache);

  // 2️⃣ Render the app to string
  const html = renderToString(
    <RemixServer context={remixContext} url={request.url} />
  );

  // 3️⃣ Extract critical CSS
  const emotionChunks = extractCriticalToChunks(html);
  const emotionStyleTags = constructStyleTagsFromChunks(emotionChunks);

  // 4️⃣ Inject styles into HTML <head>
  const finalHtml = html.replace(
    "</head>",
    `${emotionStyleTags}</head>`
  );

  responseHeaders.set("Content-Type", "text/html");

  return new Response("<!DOCTYPE html>" + finalHtml, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
