import { describe, beforeEach, it, expect, vi } from 'vitest';
import * as React from 'react';
import * as ReactDOM from 'react-dom/server';
import { createRenderer, screen, waitFor } from '@mui/internal-test-utils';
import { ThemeProvider } from '@mui/material/styles';
import { brandingLightTheme } from '../branding';
import { UserLanguageProvider, useUserLanguage, useSetUserLanguage } from '../i18n';
import translations from '../translations';
import DemoContentLoading from './DemoContentLoading';
import DemoContentFrame from './DemoContentFrame';
import { DemoFrameContent } from './DemoFrameContext';

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

beforeEach(() => {
  mocks.canLoadContent = false;
  mocks.loadDemoContent.mockClear();
});

describe('DemoContentLoading', () => {
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

  it('renders inert toolbar controls before hydration', () => {
    const view = ReactDOM.renderToString(
      <UserLanguageProvider defaultUserLanguage="en">
        <ThemeProvider theme={brandingLightTheme}>
          <DemoContentLoading component={<span>Demo preview</span>} />
        </ThemeProvider>
      </UserLanguageProvider>,
    );

    expect(view).to.contain('Demo preview');
    expect(view).to.contain('aria-busy="true"');
    expect(view).to.contain('inert=""');
    expect(view).to.contain('aria-label="Copy the source"');
    expect(view).to.contain('>Show code</button>');
  });

  it('renders inert toolbar controls until live content is ready', () => {
    render(
      <UserLanguageProvider defaultUserLanguage="en">
        <ThemeProvider theme={brandingLightTheme}>
          <DemoContentLoading component={null} />
        </ThemeProvider>
      </UserLanguageProvider>,
    );

    const toolbar = screen.getByRole('toolbar', { hidden: true });

    expect(toolbar).to.have.attribute('aria-busy', 'true');
    expect(toolbar).to.have.attribute('inert');
    expect(screen.getByRole('button', { name: 'Show code', hidden: true })).not.to.equal(null);
    expect(screen.getByRole('button', { name: 'Copy the source', hidden: true })).not.to.equal(
      null,
    );
  });

  // Landing on a source deep link expands the skeleton at hydration, so the
  // page settles before the live content (and its language swap) arrives.
  it('expands the skeleton when the hash targets its source anchor', () => {
    window.location.hash = '#Probe.jsx';
    try {
      const { container } = render(
        <UserLanguageProvider defaultUserLanguage="en">
          <ThemeProvider theme={brandingLightTheme}>
            <DemoContentLoading component={null} fileNames={['Probe.tsx']} />
          </ThemeProvider>
        </UserLanguageProvider>,
      );

      expect(container.querySelector('[data-code-expanded]')).not.to.equal(null);
      expect(screen.getByRole('button', { name: 'Hide code', hidden: true })).not.to.equal(null);
    } finally {
      window.history.replaceState(null, '', window.location.pathname);
    }
  });

  it('starts loading content only when deferred precompute starts', async () => {
    const { rerender } = render(renderLoading());

    expect(mocks.loadDemoContent.mock.calls.length).to.equal(0);

    mocks.canLoadContent = true;
    rerender(renderLoading());

    await waitFor(() => expect(mocks.loadDemoContent.mock.calls.length).to.equal(1));
  });
});

function Preview({ label = 'Count' }: { label?: string }) {
  const [count, setCount] = React.useState(0);
  const language = useUserLanguage();
  return (
    <button onClick={() => setCount((value) => value + 1)}>
      {label} {count} {language}
    </button>
  );
}

function LanguageSwitch() {
  const setLanguage = useSetUserLanguage();
  return <button onClick={() => setLanguage('fr')}>French</button>;
}

function Providers({ children }: React.PropsWithChildren) {
  return (
    <UserLanguageProvider defaultUserLanguage="en" translations={{ fr: translations.en }}>
      <ThemeProvider theme={brandingLightTheme}>{children}</ThemeProvider>
    </UserLanguageProvider>
  );
}

describe('DemoContentFrame', () => {
  const { render } = createRenderer();

  function view(phase: 'loading' | 'ready', epoch = 0) {
    return (
      <Providers>
        <DemoContentFrame component={<Preview />} hideToolbar>
          {phase === 'ready' ? (
            <DemoFrameContent preview={<Preview />} hideToolbar previewEpoch={epoch} />
          ) : (
            <DemoContentLoading component={<Preview />} hideToolbar />
          )}
        </DemoContentFrame>
      </Providers>
    );
  }

  it('server renders one preview and the inert toolbar', () => {
    const view = ReactDOM.renderToString(
      <Providers>
        <DemoContentFrame component={<span>SSR preview</span>}>
          <DemoContentLoading component={<span>SSR preview</span>} />
        </DemoContentFrame>
      </Providers>,
    );
    expect(view.match(/SSR preview/g)).to.have.length(1);
    expect(view).to.contain('aria-busy="true"');
    expect(view).to.contain('inert=""');
    expect(view).to.contain('aria-label="Copy the source"');
  });

  it('retains preview state and DOM when deferred content becomes ready', async () => {
    const { rerender, user } = render(view('loading'));
    const preview = screen.getByRole('button', { name: 'Count 0 en' });
    await user.click(preview);
    rerender(view('ready'));
    expect(screen.getByRole('button', { name: 'Count 1 en' })).to.equal(preview);
  });

  it('remounts the preview for an explicit reset', async () => {
    const { rerender, user } = render(view('ready'));
    const preview = screen.getByRole('button', { name: 'Count 0 en' });
    await user.click(preview);
    rerender(view('ready', 1));
    expect(screen.getByRole('button', { name: 'Count 0 en' })).not.to.equal(preview);
  });

  it('preserves the reset preview through another loading transition', async () => {
    const { rerender, user } = render(view('ready'));
    rerender(view('ready', 1));
    const preview = screen.getByRole('button', { name: 'Count 0 en' });
    await user.click(preview);
    rerender(view('loading'));
    expect(screen.getByRole('button', { name: 'Count 1 en' })).to.equal(preview);
    rerender(view('ready'));
    expect(screen.getByRole('button', { name: 'Count 1 en' })).to.equal(preview);
  });

  it('updates source and language without losing preview state', async () => {
    function content(label: string) {
      return (
        <Providers>
          <LanguageSwitch />
          <DemoContentFrame component={<Preview label={label} />}>
            <DemoFrameContent
              preview={<Preview label={label} />}
              toolbar={<span>Ready</span>}
              code={<pre>{label} source</pre>}
              sourceVisible
            />
          </DemoContentFrame>
        </Providers>
      );
    }
    const { rerender, user } = render(content('TS'));
    const preview = screen.getByRole('button', { name: 'TS 0 en' });
    await user.click(preview);
    rerender(content('JS'));
    expect(screen.getByRole('button', { name: 'JS 1 en' })).to.equal(preview);
    expect(screen.getByText('JS source')).not.to.equal(null);
    expect(screen.queryByText('TS source')).to.equal(null);
    await user.click(screen.getByRole('button', { name: 'French' }));
    expect(screen.getByRole('button', { name: 'JS 1 fr' })).to.equal(preview);
  });

  it('does not rerender the publisher when its slots update', () => {
    let renders = 0;
    function Content() {
      renders += 1;
      return <DemoFrameContent preview={<Preview />} hideToolbar />;
    }
    render(
      <Providers>
        <DemoContentFrame component={<Preview />} hideToolbar>
          <Content />
        </DemoContentFrame>
      </Providers>,
      { strict: false },
    );
    expect(renders).to.equal(1);
    expect(screen.getAllByRole('button', { name: 'Count 0 en' })).to.have.length(1);
  });
});
