import { vi } from 'vitest';

// TODO: Remove this probe after the WebKit exit failure in CI is understood.
export default async function traceFrames(stage: string) {
  const parent = window.parent;
  const startedAt = performance.now();
  const result: { childMs: number | null; parentMs: number | null } = {
    childMs: null,
    parentMs: null,
  };
  let childFrame: number | undefined;
  let parentFrame: number | undefined;
  let timeout: ReturnType<typeof setTimeout> | undefined;

  try {
    await new Promise<void>((resolve) => {
      function finishWhenReady() {
        if (result.childMs !== null && result.parentMs !== null) {
          resolve();
        }
      }

      timeout = setTimeout(resolve, 250);
      childFrame = window.requestAnimationFrame(() => {
        result.childMs = performance.now() - startedAt;
        finishWhenReady();
      });
      parentFrame = parent.requestAnimationFrame(() => {
        result.parentMs = performance.now() - startedAt;
        finishWhenReady();
      });
    });
  } finally {
    clearTimeout(timeout);
    if (childFrame !== undefined) {
      window.cancelAnimationFrame(childFrame);
    }
    if (parentFrame !== undefined) {
      parent.cancelAnimationFrame(parentFrame);
    }
  }

  // Log passing runs too: waiting for these frames can change the test timing.
  console.info(
    `Menu2 frames ${stage}:\n${JSON.stringify({
      ...result,
      elapsedMs: performance.now() - startedAt,
      childVisibility: document.visibilityState,
      parentVisibility: parent.document.visibilityState,
      fakeTimers: vi.isFakeTimers(),
    })}`,
  );
}
