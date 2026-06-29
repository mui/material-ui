/**
 * @ignore - internal component.
 */
import { styleSheetsToString } from '@mui/system';
import * as React from 'react';
import {
  generateBreakpointStyleSheets,
  getBreakpointStylesServerSnapshot,
  getBreakpointStylesSnapshot,
  subscribeBreakpointStyles,
} from './BreakpointStylesRegistry';

interface CssVarsInjectorProps {
  theme: {
    generateStyleSheets?: (() => Array<Record<string, any>>) | undefined;
    cssVarPrefix?: string | undefined;
    rootSelector?: string | undefined;
  };
  nonce?: string | undefined;
  /**
   * The document to inject the `<style>` tag into. Defaults to `document`.
   * `CssVarsProvider` forwards its `documentNode` prop, so the iframe case
   * works correctly when the provider is rendered inside an iframe.
   */
  documentNode?: Document | undefined;
  /**
   * Overrides the auto-derived `<style>` tag id (`{cssVarPrefix}-css-vars`).
   * Use this when multiple providers share the same `cssVarPrefix` but need
   * to inject into separate `<style>` tags so they don't overwrite each other.
   */
  styleId?: string | undefined;
}

const DEFAULT_STYLE_ID = 'mui-css-vars';

// Keep scoped nested providers from reusing the root provider's <style> tag.
function getScopedStyleIdSuffix(rootSelector: string | undefined) {
  if (!rootSelector || rootSelector === ':root') {
    return '';
  }

  return `-${rootSelector.replace(/[^A-Za-z0-9_-]+/g, '-').replace(/^-|-$/g, '')}`;
}

// Root themes use the stable default id; scoped themes get a selector-derived id.
function getStyleId(cssVarPrefix: string | undefined, rootSelector: string | undefined) {
  const baseId = cssVarPrefix ? `${cssVarPrefix}-css-vars` : DEFAULT_STYLE_ID;

  return `${baseId}${getScopedStyleIdSuffix(rootSelector)}`;
}

export default function CssVarsInjector({
  theme,
  nonce,
  documentNode,
  styleId: styleIdProp,
}: CssVarsInjectorProps) {
  // Scoped nested themes need separate <style> tags so their vars can coexist.
  const styleId = styleIdProp ?? getStyleId(theme.cssVarPrefix, theme.rootSelector);
  // Recompute when lazy-loaded components register breakpoint descriptors.
  const breakpointStyles = React.useSyncExternalStore(
    subscribeBreakpointStyles,
    getBreakpointStylesSnapshot,
    getBreakpointStylesServerSnapshot,
  );
  const css = React.useMemo(
    () =>
      [
        styleSheetsToString(theme.generateStyleSheets?.() ?? []),
        generateBreakpointStyleSheets(theme, breakpointStyles),
      ].join(''),
    [theme, breakpointStyles],
  );

  // Client: insert/update the <style> tag directly in <head> before any paint.
  // useInsertionEffect is the earliest possible hook — it runs synchronously
  // before React commits DOM mutations, so styles are in place before any
  // component layout or paint. Returning null from render keeps the React tree
  // clean (no <style> node inside #__next).
  React.useInsertionEffect(() => {
    const doc = documentNode ?? (typeof document === 'undefined' ? null : document);
    if (!doc) {
      return;
    }
    let style = doc.getElementById(styleId) as HTMLStyleElement | null;
    if (!style) {
      style = doc.createElement('style');
      style.id = styleId;
      if (nonce) {
        style.setAttribute('nonce', nonce);
      }
    }
    // SSR rendered the <style> tag inside the React tree (e.g. inside #__next
    // for Next.js Pages Router). Move it to <head> so it cascades correctly
    // and won't be removed if the React tree unmounts.
    if (style.parentNode !== doc.head) {
      doc.head.insertBefore(style, doc.head.firstChild);
    }
    if (style.textContent !== css) {
      style.textContent = css;
    }
  }, [css, nonce, documentNode, styleId]);

  // Server: render the <style> tag into the HTML stream so CSS vars are
  // available before any JS executes (prevents FOUC). On the client this
  // branch is never reached — the effect above handles injection instead.
  if (typeof window === 'undefined') {
    return (
      <style
        id={styleId}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: css }}
        {...(nonce ? { nonce } : {})}
      />
    );
  }

  return null;
}
