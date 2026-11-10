import * as React from 'react';
import * as ReactDOM from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { createRenderer, screen } from '@mui/internal-test-utils';
import { ThemeProvider } from '@mui/material/styles';
import { brandingLightTheme } from '../branding';
import translations from '../translations';
import { UserLanguageProvider, useUserLanguage, useSetUserLanguage } from '../i18n';
import DemoContentFrame from './DemoContentFrame';
import DemoContentLoading from './DemoContentLoading';
import { DemoFrameContent } from './DemoFrameContext';

vi.mock('@mui/internal-docs-infra/CodeHighlighter', () => ({
  useCodeFallback: () => ({ canLoadContent: false }),
}));

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
