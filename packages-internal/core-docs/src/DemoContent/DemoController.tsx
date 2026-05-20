'use client';

import * as React from 'react';
import { useRunner } from 'react-runner';
import { CodeControllerContext } from '@mui/internal-docs-infra/CodeControllerContext';
import type { ControlledCode } from '@mui/internal-docs-infra/CodeHighlighter/types';
import { useCodeExternals } from '@mui/internal-docs-infra/CodeExternalsContext';
import { DemoErrorProvider, useDemoErrorReporter } from './DemoErrorContext';

function Runner({ code, variantKey }: { code: string; variantKey: string }) {
  const externalsContext = useCodeExternals();
  const scope = React.useMemo(() => {
    let externals = externalsContext?.externals;
    if (!externals) {
      externals = { imports: { react: React } };
    }

    return { import: { ...externals } };
  }, [externalsContext]);

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
              const source = code[cur]?.source;
              if (!source) {
                return acc;
              }

              acc[cur] = <Runner code={source} variantKey={cur} />;
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
