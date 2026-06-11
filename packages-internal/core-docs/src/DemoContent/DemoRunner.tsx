'use client';

import * as React from 'react';
import { useRunner, importCode } from 'react-runner';
import type { ControlledVariantExtraFiles } from '@mui/internal-docs-infra/CodeHighlighter/types';
import { useCodeExternals } from '@mui/internal-docs-infra/CodeExternalsContext';
import { useDemoErrorReporter } from './DemoErrorContext';

// ---------------------------------------------------------------------------
// Live-editing runtime for a single variant. Split into its own chunk because
// `react-runner` bundles the heavy `sucrase` transpiler — `DemoController`
// lazy-imports this module and warms it on `onActivate` so it stays out of the
// initial client bundle and only loads once a reader engages a demo's editor.
// ---------------------------------------------------------------------------

export interface DemoRunnerProps {
  /** The current (live-edited) source for the variant. */
  code: string;
  /** Sibling files the source can import, keyed by file name. */
  extraFiles?: ControlledVariantExtraFiles;
  /** Variant key, used to scope error reporting. */
  variantKey: string;
}

export default function DemoRunner({ code, extraFiles, variantKey }: DemoRunnerProps) {
  const externalsContext = useCodeExternals();
  const scope = React.useMemo(() => {
    // `scope.import` is react-runner's module map; its `require` does an exact-key
    // lookup. Start from the package externals, then evaluate each extra file with
    // react-runner's `importCode` and register it under the specifier the main
    // source imports it by. In flat mode that's `./<name>` without the extension
    // (the loader strips it), e.g. key `top100Films.ts` -> `./top100Films`. Passing
    // the same growing `imports` map lets a file import earlier siblings + externals.
    const imports: Record<string, unknown> = {
      ...(externalsContext?.externals ?? { react: React }),
    };
    for (const [fileName, file] of Object.entries(extraFiles ?? {})) {
      if (typeof file?.source === 'string') {
        imports[`./${fileName.replace(/\.[^.]+$/, '')}`] = importCode(file.source, {
          import: imports,
        });
      }
    }
    return { import: imports };
  }, [externalsContext, extraFiles]);

  const { element, error } = useRunner({ code, scope });
  const reportError = useDemoErrorReporter(variantKey);

  // Keep showing the last successfully-rendered element so the preview area
  // doesn't blank out while the user is typing an intermediate broken state.
  const lastGoodRef = React.useRef<React.ReactNode>(null);
  if (!error && element) {
    lastGoodRef.current = element;
  }

  const message = error ? String(error) : null;
  React.useEffect(() => {
    reportError(message);
    return () => {
      reportError(null);
    };
  }, [reportError, message]);

  return error ? lastGoodRef.current : element;
}
