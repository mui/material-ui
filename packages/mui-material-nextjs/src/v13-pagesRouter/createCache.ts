import createCache from '@emotion/cache';

const isBrowser = typeof document !== 'undefined';

function extractAndMoveLayers(cssText: string) {
  // Quick check if @layer exists
  if (!cssText.includes('@layer')) {
    return cssText;
  }

  // This regex uses a non-greedy approach to match from @layer to the closing brace
  // [\s\S]*? means "match any character including newlines, non-greedy"
  const layerRegex = /@layer\s+[\w-]+\s*{([\s\S]*?)(?:}(?!\s*[,;])|};)/g;

  // Find all layer declarations
  const layers = [];
  let match;
  let modifiedCss = cssText;

  // Use exec in a loop to find all matches
  // eslint-disable-next-line no-cond-assign
  while ((match = layerRegex.exec(cssText)) !== null) {
    const fullMatch = match[0];
    layers.push(fullMatch);

    // Remove the matched layer from the CSS
    modifiedCss = modifiedCss.replace(fullMatch, '');
  }

  // Combine extracted layers with remaining CSS
  return `@layer mui{${modifiedCss}}${layers.join('')}`;
}

// On the client side, Create a meta tag at the top of the <head> and set it as insertionPoint.
// This assures that MUI styles are loaded first.
// It allows developers to easily override MUI styles with other styling solutions, like CSS modules.
export default function createEmotionCache(
  options?: { enableCssLayer?: boolean } & Parameters<typeof createCache>[0],
) {
  let insertionPoint;

  if (isBrowser) {
    const emotionInsertionPoint = document.querySelector<HTMLMetaElement>(
      'meta[name="emotion-insertion-point"]',
    );
    insertionPoint = emotionInsertionPoint ?? undefined;
  }

  const { enableCssLayer, ...rest } = options ?? {};

  const emotionCache = createCache({ key: 'mui', insertionPoint, ...rest });
  if (enableCssLayer) {
    const prevInsert = emotionCache.insert;
    emotionCache.insert = (...args) => {
      if (!args[1].styles.startsWith('@layer')) {
        if (args[1].styles.includes('@layer')) {
          args[1].styles = extractAndMoveLayers(args[1].styles);
        } else {
          args[1].styles = `@layer mui {${args[1].styles}}`;
        }
      }
      return prevInsert(...args);
    };
  }
  return emotionCache;
}
