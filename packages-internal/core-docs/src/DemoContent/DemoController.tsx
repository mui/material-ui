'use client';

import * as React from 'react';
import { CodeControllerContext } from '@mui/internal-docs-infra/CodeControllerContext';
import type { ControlledCode } from '@mui/internal-docs-infra/CodeHighlighter/types';
import { DemoErrorProvider } from './DemoErrorContext';
import type { DemoRunnerProps } from './DemoRunner';

type DemoRunnerComponent = React.ComponentType<DemoRunnerProps>;

// Lazy-load the live-editing runtime (`react-runner` + its bundled `sucrase`
// transpiler) as a separate chunk: only fetched when a reader engages a demo's
// editor, so it stays out of the initial client bundle. Memoized so the
// `onActivate` warm-up and the load-on-edit share one promise (and one request).
let demoRunnerModule: Promise<DemoRunnerComponent> | undefined;
function loadDemoRunner(): Promise<DemoRunnerComponent> {
  if (!demoRunnerModule) {
    demoRunnerModule = import('./DemoRunner').then((mod) => mod.default);
  }
  return demoRunnerModule;
}

function DemoController({ children }: { children: React.ReactNode }) {
  const [code, setCode] = React.useState<ControlledCode | undefined>(undefined);
  // The lazily-loaded runner, held in state so the live preview only swaps in
  // *after* the chunk has loaded. Rendering it through `React.lazy`/`Suspense`
  // flashed an empty frame on the first edit (lazy always suspends once, even
  // when the chunk is already cached); delaying the swap ourselves avoids that.
  const [Runner, setRunner] = React.useState<DemoRunnerComponent | null>(null);

  // Start (or reuse) the runner-chunk fetch and store it once ready. The
  // `setRunner` updater returns the component so React doesn't mistake it for a
  // state-reducer function.
  const warmRunner = React.useCallback(() => {
    void loadDemoRunner().then((component) => setRunner(() => component));
  }, []);

  // Warm on first editing engagement (hover / focus / click), well before the
  // first keystroke sets `code`.
  const handleActivate = React.useCallback(() => {
    warmRunner();
  }, [warmRunner]);

  // Safety net: if `code` ever arrives before the runner has loaded, kick off
  // the fetch so the edited preview can render once it resolves.
  React.useEffect(() => {
    if (code && !Runner) {
      warmRunner();
    }
  }, [code, Runner, warmRunner]);

  // Build the preview overrides only once BOTH the edited `code` and the runner
  // module are available. Until then `components` stays undefined, so the demo
  // keeps rendering its current output instead of blanking.
  const components = React.useMemo(() => {
    if (!code || !Runner) {
      return undefined;
    }
    return Object.keys(code).reduce(
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
    );
  }, [code, Runner]);

  const contextValue = React.useMemo(
    () => ({ code, setCode, components, onActivate: handleActivate }),
    [code, setCode, components, handleActivate],
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
