import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, waitFor } from '@mui/internal-test-utils';
import DemoContentLoading from './DemoContentLoading';

const mocks = vi.hoisted(() => ({
  canLoadContent: false,
  loadDemoContent: vi.fn(() => Promise.resolve({ default: () => null })),
}));

vi.mock('@mui/internal-docs-infra/CodeHighlighter', () => ({
  useCodeFallback: () => ({ canLoadContent: mocks.canLoadContent }),
}));

vi.mock('./DemoContainer', () => ({
  DemoContainer: () => React.createElement('div'),
  DemoFileTabBarSkeleton: () => null,
}));

vi.mock('./CodeSource', () => ({
  CodeSource: ({ children }: { children: React.ReactNode }) =>
    React.createElement('div', null, children),
}));

vi.mock('./loadDemoContent', () => ({
  loadDemoContent: mocks.loadDemoContent,
}));

describe('DemoContentLoading client behavior', () => {
  const { render } = createRenderer();

  beforeEach(() => {
    mocks.canLoadContent = false;
    mocks.loadDemoContent.mockClear();
  });

  it('starts loading content only when deferred precompute starts', async () => {
    const { rerender } = render(<DemoContentLoading component={null} hideToolbar />);

    expect(mocks.loadDemoContent.mock.calls.length).to.equal(0);

    mocks.canLoadContent = true;
    rerender(<DemoContentLoading component={null} hideToolbar />);

    await waitFor(() => expect(mocks.loadDemoContent.mock.calls.length).to.equal(1));
  });
});
