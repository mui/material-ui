import * as React from 'react';
import {
  exportVariant,
  flattenCodeVariant,
  type ExportConfig,
} from '@mui/internal-docs-infra/useDemo';
import type { ContentProps } from '@mui/internal-docs-infra/CodeHighlighter/types';
import DemoContext from '../DemoContext';
import PageContext from '../PageContext';

interface MuiChatConfig {
  baseUrl: string;
  packageName: string;
}

interface UseMuiChatExporterOptions {
  /** The full demo props — only `code` and `name` are read. */
  props: ContentProps<object>;
  /** The selected variant from `useDemo`. */
  selectedVariant: string;
  /** Whether the TS variant is currently selected. */
  useTypescript: boolean;
  /** The fully built `ExportConfig` passed to `useDemo`. */
  exportConfig: ExportConfig;
}

/**
 * Build the MUI Chat "open in chat" handler.
 *
 * MUI Chat is gated on (a) an API base URL being configured at build time
 * (`MUI_CHAT_API_BASE_URL`), (b) the current page's `productId` being included
 * in `MUI_CHAT_SCOPES`, and (c) the surrounding docs context providing a
 * `primaryPackage` via `DemoContext`. When any of these conditions is not met
 * the hook returns `undefined`, which makes the toolbar button render nothing.
 *
 * The handler itself is built entirely in userspace from the public
 * `exportVariant` + `flattenCodeVariant` helpers and the currently selected
 * variant — the docs-infra package stays unaware of MUI Chat.
 */
export function useMuiChatExporter(
  options: UseMuiChatExporterOptions,
): (() => Promise<void>) | undefined {
  const { props, selectedVariant, useTypescript, exportConfig } = options;
  const csbContext = React.useContext(DemoContext);
  const csbConfig = csbContext?.csb;
  const pageContext = React.useContext(PageContext);

  const muiChatConfig = React.useMemo<MuiChatConfig | undefined>(() => {
    const baseUrl = process.env.MUI_CHAT_API_BASE_URL;
    const scopes = process.env.MUI_CHAT_SCOPES;
    if (!baseUrl || !scopes || !pageContext?.productId) {
      return undefined;
    }
    if (!scopes.split(',').includes(pageContext.productId)) {
      return undefined;
    }
    if (!csbConfig?.primaryPackage) {
      return undefined;
    }
    return {
      baseUrl,
      packageName: csbConfig.primaryPackage,
    };
  }, [csbConfig?.primaryPackage, pageContext?.productId]);

  return React.useMemo(() => {
    if (!muiChatConfig) {
      return undefined;
    }
    return async () => {
      const variantCode = props.code?.[selectedVariant];
      if (!variantCode || typeof variantCode === 'string') {
        throw new Error('No valid variant code available for MUI Chat');
      }
      const title = props.name || 'Demo';
      const description = `${title} demo`;

      const { exported, rootFile } = exportVariant(variantCode, {
        ...exportConfig,
        variantName: selectedVariant,
        title,
        description,
        useTypescript,
      });
      const flattenedFiles = flattenCodeVariant(exported);

      // Resolve the primary package version from the generated `package.json`
      // so MUI Chat scaffolds against the same version the sandbox would.
      let packageVersion = 'latest';
      const packageJsonSource = flattenedFiles['package.json']?.source;
      if (packageJsonSource) {
        try {
          const packageJson = JSON.parse(packageJsonSource) as {
            dependencies?: Record<string, string>;
          };
          packageVersion = packageJson.dependencies?.[muiChatConfig.packageName] ?? 'latest';
        } catch {
          // Fall back to 'latest' if package.json isn't valid JSON.
        }
      }

      const files = Object.entries(flattenedFiles).map(([path, fileData]) => ({
        path,
        content: fileData.source,
        ...(path === rootFile ? { isEntry: true } : null),
      }));

      const response = await fetch(`${muiChatConfig.baseUrl}/v1/public/chat/open`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: title,
          description,
          files,
          type: 'mui-docs',
          package: { name: muiChatConfig.packageName, version: packageVersion },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to open in MUI Chat');
      }

      const data = (await response.json()) as { nextUrl?: string };
      if (!data.nextUrl) {
        throw new Error('MUI Chat response missing `nextUrl`');
      }
      window.open(data.nextUrl, '_blank');
    };
  }, [muiChatConfig, exportConfig, selectedVariant, useTypescript, props.code, props.name]);
}
