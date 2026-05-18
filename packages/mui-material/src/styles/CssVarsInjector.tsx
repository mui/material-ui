import { styleSheetsToString } from '@mui/system';
import * as React from 'react';

interface CssVarsInjectorProps {
  theme: { generateStyleSheets?: (() => Array<Record<string, any>>) | undefined };
  nonce?: string | undefined;
}

const STYLE_ID = 'mui-css-vars';

export default function CssVarsInjector({ theme, nonce }: CssVarsInjectorProps) {
  const css = React.useMemo(
    () => styleSheetsToString(theme.generateStyleSheets?.() ?? []),
    [theme],
  );

  // Client: insert/update the <style> tag directly in <head> before any paint.
  // useInsertionEffect is the earliest possible hook — it runs synchronously
  // before React commits DOM mutations, so styles are in place before any
  // component layout or paint. Returning null from render keeps the React tree
  // clean (no <style> node inside #__next).
  React.useInsertionEffect(() => {
    let style = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
    if (!style) {
      style = document.createElement('style');
      style.id = STYLE_ID;
      if (nonce) {
        style.setAttribute('nonce', nonce);
      }
    }
    // SSR rendered the <style> tag inside the React tree (e.g. inside #__next
    // for Next.js Pages Router). Move it to <head> so it cascades correctly
    // and won't be removed if the React tree unmounts.
    if (style.parentNode !== document.head) {
      document.head.insertBefore(style, document.head.firstChild);
    }
    if (style.textContent !== css) {
      style.textContent = css;
    }
  }, [css, nonce]);

  // Server: render the <style> tag into the HTML stream so CSS vars are
  // available before any JS executes (prevents FOUC). On the client this
  // branch is never reached — the effect above handles injection instead.
  if (typeof window === 'undefined') {
    return (
      <style
        id={STYLE_ID}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: css }}
        {...(nonce ? { nonce } : {})}
      />
    );
  }

  return null;
}
