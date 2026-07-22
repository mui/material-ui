let demoContentPromise: Promise<typeof import('./DemoContent')> | undefined;

export function loadDemoContent() {
  demoContentPromise ??= import('./DemoContent').catch((error) => {
    demoContentPromise = undefined;
    throw error;
  });
  return demoContentPromise;
}
