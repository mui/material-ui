import { afterAll, afterEach, describe, expect, it, vi } from 'vitest';
import * as React from 'react';
import { act, createRenderer, isJsdom, screen } from '@mui/internal-test-utils';
import { CodeControllerContext } from '@mui/internal-docs-infra/CodeControllerContext';
import type * as DemoModule from '@mui/internal-docs-infra/useDemo';
import type * as CodeModule from '@mui/internal-docs-infra/useCode';
import { ThemeProvider } from '@mui/material/styles';
import { brandingLightTheme } from '../branding';
import { UserLanguageProvider } from '../i18n';
import DemoContent from './DemoContent';

vi.hoisted(() => vi.resetModules());

const mocks = vi.hoisted(() => ({
  activate: vi.fn(),
  preloadEditor: vi.fn(() => Promise.resolve()),
  expand: vi.fn(),
  demo: {
    selectedVariant: 'Default',
    selectedTransform: null,
    availableTransforms: [],
    variants: ['Default'],
    files: [{ name: 'Example.tsx' }],
    selectedFile: null,
    selectedFileFocusedLines: 0,
    selectedFileCollapsible: false,
    selectedFileHasFocusProjection: false,
    expanded: false,
    component: null,
    focusRef: { current: null },
    selectTransform: vi.fn(),
    selectVariant: vi.fn(),
    setExpanded: vi.fn(),
    selectFileName: vi.fn(),
    reset: vi.fn(),
    resetFocus: vi.fn(),
    openStackBlitz: vi.fn(),
    openCodeSandbox: vi.fn(),
    copy: vi.fn(),
  },
}));

vi.mock('next/router', () => ({ useRouter: () => ({ asPath: '/example/' }) }));

vi.mock('@mui/internal-docs-infra/useDemo', async (importOriginal) => ({
  ...(await importOriginal<typeof DemoModule>()),
  useDemo: () => ({ ...mocks.demo, expand: mocks.expand }),
}));

vi.mock('@mui/internal-docs-infra/useCode', async (importOriginal) => ({
  ...(await importOriginal<typeof CodeModule>()),
  preloadCodeEditor: mocks.preloadEditor,
}));

afterAll(() => {
  vi.unstubAllGlobals();
  vi.resetModules();
});
afterEach(() => vi.clearAllMocks());

describe.skipIf(!isJsdom())('DemoContent idle scheduling', () => {
  const { render } = createRenderer();

  it('keeps editing dormant while idle and activates it on source expansion', async () => {
    const callbacks = new Map<number, IdleRequestCallback>();
    let nextId = 0;
    vi.stubGlobal('requestIdleCallback', (callback: IdleRequestCallback) => {
      nextId += 1;
      callbacks.set(nextId, callback);
      return nextId;
    });
    vi.stubGlobal('cancelIdleCallback', (id: number) => callbacks.delete(id));

    const { user } = render(
      <UserLanguageProvider defaultUserLanguage="en">
        <ThemeProvider theme={brandingLightTheme}>
          <CodeControllerContext.Provider value={{ onActivate: mocks.activate }}>
            <DemoContent
              disableAd
              code={{
                Default: { fileName: 'Example.tsx', source: 'export default () => null;' },
              }}
            />
          </CodeControllerContext.Provider>
        </ThemeProvider>
      </UserLanguageProvider>,
    );

    const showCode = await screen.findByRole('button', { name: 'Show code', hidden: true });

    act(() => {
      for (const callback of callbacks.values()) {
        callback({ didTimeout: false, timeRemaining: () => 10 });
      }
    });
    expect(mocks.activate).not.toHaveBeenCalled();
    expect(mocks.preloadEditor).not.toHaveBeenCalled();

    await user.click(showCode);

    expect(mocks.activate).toHaveBeenCalledExactlyOnceWith({ js: true, css: false });
    expect(mocks.expand).toHaveBeenCalledOnce();
  });
});
