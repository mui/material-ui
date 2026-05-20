'use client';

import * as React from 'react';

/**
 * Live-edit runtime errors, keyed by the variant name they came from.
 * `null` means the variant currently renders without error.
 */
export type DemoErrors = Record<string, string | null>;

interface DemoErrorContextValue {
  errors: DemoErrors;
  setError: (variantKey: string, error: string | null) => void;
}

export const DemoErrorContext = React.createContext<DemoErrorContextValue | undefined>(undefined);

/**
 * Channel for live-edit runtime errors. `DemoController` writes errors here as
 * its `react-runner` instances catch them; `DemoContent` reads the entry for
 * the currently-selected variant and surfaces it over the preview.
 */
export function DemoErrorProvider({ children }: { children: React.ReactNode }) {
  const [errors, setErrors] = React.useState<DemoErrors>({});

  const setError = React.useCallback((variantKey: string, error: string | null) => {
    setErrors((prev) => {
      if (prev[variantKey] === error) {
        return prev;
      }
      return { ...prev, [variantKey]: error };
    });
  }, []);

  const value = React.useMemo(() => ({ errors, setError }), [errors, setError]);

  return <DemoErrorContext.Provider value={value}>{children}</DemoErrorContext.Provider>;
}

/**
 * Read the live-edit error for a given variant. Returns `null` when the demo
 * is not inside a `DemoController`, or when no error is currently recorded.
 */
export function useDemoError(variantKey: string | undefined): string | null {
  const context = React.useContext(DemoErrorContext);
  if (!context || !variantKey) {
    return null;
  }
  return context.errors[variantKey] ?? null;
}

/**
 * Reporter for `DemoController`'s `react-runner` instances. Returns a stable
 * setter scoped to a single variant; safe to call from inside an effect.
 */
export function useDemoErrorReporter(variantKey: string): (error: string | null) => void {
  const context = React.useContext(DemoErrorContext);
  const setError = context?.setError;

  return React.useCallback(
    (error: string | null) => {
      setError?.(variantKey, error);
    },
    [setError, variantKey],
  );
}
