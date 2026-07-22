import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, waitFor } from '@mui/internal-test-utils';
import { ThemeProvider } from '@mui/material/styles';
import { brandingLightTheme } from '../branding';
import { UserLanguageProvider } from '../i18n';
import DemoContentLoading from './DemoContentLoading';

const mocks = vi.hoisted(() => ({
  canLoadContent: false,
  loadDemoContent: vi.fn(() => Promise.resolve({ default: () => null })),
}));

vi.mock('@mui/internal-docs-infra/CodeHighlighter', () => ({
  useCodeFallback: () => ({ canLoadContent: mocks.canLoadContent }),
}));

vi.mock('./loadDemoContent', () => ({
  loadDemoContent: mocks.loadDemoContent,
}));

describe('DemoContentLoading client behavior', () => {
  const { render } = createRenderer();

  function renderLoading() {
    return (
      <UserLanguageProvider defaultUserLanguage="en">
        <ThemeProvider theme={brandingLightTheme}>
          <DemoContentLoading component={null} hideToolbar />
        </ThemeProvider>
      </UserLanguageProvider>
    );
  }

  beforeEach(() => {
    mocks.canLoadContent = false;
    mocks.loadDemoContent.mockClear();
  });

  it('starts loading content only when deferred precompute starts', async () => {
    const { rerender } = render(renderLoading());

    expect(mocks.loadDemoContent.mock.calls.length).to.equal(0);

    mocks.canLoadContent = true;
    rerender(renderLoading());

    await waitFor(() => expect(mocks.loadDemoContent.mock.calls.length).to.equal(1));
  });
});
