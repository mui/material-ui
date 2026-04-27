'use client';

import * as React from 'react';
import { useRunner } from 'react-runner';
import { CodeControllerContext } from '@mui/internal-docs-infra/CodeControllerContext';
import type { ControlledCode } from '@mui/internal-docs-infra/CodeHighlighter/types';
import { useCodeExternals } from '@mui/internal-docs-infra/CodeExternalsContext';

function Runner({ code }: { code: string }) {
  const externalsContext = useCodeExternals();
  const scope = React.useMemo(() => {
    let externals = externalsContext?.externals;
    if (!externals) {
      externals = { imports: { react: React } };
    }

    return { import: { ...externals } };
  }, [externalsContext]);

  const { element, error } = useRunner({ code, scope });

  if (error) {
    return <div>{error}</div>;
  }

  return element;
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

              acc[cur] = <Runner code={source} />;
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
    <CodeControllerContext.Provider value={contextValue}>{children}</CodeControllerContext.Provider>
  );
}

export default DemoController;
