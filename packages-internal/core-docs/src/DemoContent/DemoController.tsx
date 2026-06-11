'use client';

import * as React from 'react';
import { useRunner, importCode } from 'react-runner';
import { CodeControllerContext } from '@mui/internal-docs-infra/CodeControllerContext';
import type {
  ControlledCode,
  ControlledVariantExtraFiles,
} from '@mui/internal-docs-infra/CodeHighlighter/types';
import { useCodeExternals } from '@mui/internal-docs-infra/CodeExternalsContext';
import { DemoErrorProvider, useDemoErrorReporter } from './DemoErrorContext';

function Runner({
  code,
  extraFiles,
  variantKey,
}: {
  code: string;
  extraFiles?: ControlledVariantExtraFiles;
  variantKey: string;
}) {
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

function DemoController({ children }: { children: React.ReactNode }) {
  const [code, setCode] = React.useState<ControlledCode | undefined>(undefined);

  const components = React.useMemo(
    () =>
      code
        ? Object.keys(code).reduce(
            (acc, cur) => {
              const variant = code[cur];
              if (!variant?.source) {
                return acc;
              }

              acc[cur] = (
                <Runner code={variant.source} extraFiles={variant.extraFiles} variantKey={cur} />
              );
              return acc;
            },
            {} as Record<string, React.ReactNode>,
          )
        : undefined,
    [code],
  );

  const contextValue = React.useMemo(
    () => ({ code, setCode, components }),
    [code, setCode, components],
  );

  return (
    <DemoErrorProvider>
      <CodeControllerContext.Provider value={contextValue}>
        {children}
      </CodeControllerContext.Provider>
    </DemoErrorProvider>
  );
}

export default DemoController;
