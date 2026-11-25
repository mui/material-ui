import { describe, it, expect } from 'vitest';
import * as React from 'react';
import type { NextRouter } from 'next/router';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { CodeHighlighter } from '@mui/internal-docs-infra/CodeHighlighter';
import { CodeProviderLazy } from '@mui/internal-docs-infra/CodeProvider';
import { createRenderer, isJsdom, screen } from '@mui/internal-test-utils';
import { ThemeProvider } from '@mui/material/styles';
import { brandingLightTheme } from '../branding';
import { UserLanguageProvider } from '../i18n';
import DemoContent from './DemoContent';
import DemoContentFrame from './DemoContentFrame';
import DemoContentLoading from './DemoContentLoading';
import { DemoFrameContent } from './DemoFrameContext';

const EDITED_SOURCE = 'Edited source';

const router: NextRouter = {
  route: '/',
  pathname: '/',
  query: {},
  asPath: '/',
  basePath: '',
  isLocaleDomain: false,
  isReady: true,
  isFallback: false,
  isPreview: false,
  push: async () => true,
  replace: async () => true,
  prefetch: async () => {},
  back: () => {},
  forward: () => {},
  reload: () => {},
  beforePopState: () => {},
  events: { on: () => {}, off: () => {}, emit: () => {} },
};

function Counter() {
  const [count, setCount] = React.useState(0);

  return <button onClick={() => setCount((value) => value + 1)}>Count {count}</button>;
}

function Demo({
  Content = DemoContent,
  initialView = 'collapsed',
  collapseMode = 'empty',
  focusedLines = 0,
}: {
  Content?: typeof DemoContent;
  initialView?: 'collapsed' | 'expanded';
  collapseMode?: 'empty' | 'focus';
  focusedLines?: number;
}) {
  return (
    <RouterContext.Provider value={router}>
      <UserLanguageProvider defaultUserLanguage="en">
        <ThemeProvider theme={brandingLightTheme}>
          <CodeProviderLazy>
            <CodeHighlighter
              precompute={{
                Default: {
                  fileName: 'Counter.jsx',
                  source: 'export default function Counter() { return null; }',
                  totalLines: 1,
                  focusedLines,
                  collapsible: true,
                },
              }}
              components={{ Default: <Counter /> }}
              initialVariant="Default"
              highlightAfter="hydration"
              enhanceAfter="hydration"
              Content={Content}
              ContentFrame={DemoContentFrame}
              ContentLoading={DemoContentLoading}
              contentProps={{ disableLiveEdit: true, disableAd: true }}
              collapseToEmpty={collapseMode === 'empty'}
              initialExpanded={initialView === 'expanded'}
            />
          </CodeProviderLazy>
        </ThemeProvider>
      </UserLanguageProvider>
    </RouterContext.Provider>
  );
}

function EditedSource() {
  const [expanded, setExpanded] = React.useState(true);
  const [source, setSource] = React.useState('Initial source');

  return (
    <DemoFrameContent
      preview={null}
      expanded={expanded}
      sourceVisible
      toolbar={
        <button type="button" onClick={() => setExpanded((value) => !value)}>
          {expanded ? 'Hide source' : 'Show source'}
        </button>
      }
      code={<textarea value={source} onChange={(event) => setSource(event.target.value)} />}
    />
  );
}

describe.skipIf(isJsdom())('DemoContent source visibility', () => {
  const { render } = createRenderer();

  it('preserves the preview instance and state across source toggles', async () => {
    const { user } = render(<Demo />);
    const preview = await screen.findByRole('button', { name: 'Count 0' });

    await user.click(preview);
    await user.click(await screen.findByRole('button', { name: 'Show code' }));
    expect(screen.getByRole('button', { name: 'Count 1' })).to.equal(preview);

    await user.click(screen.getByRole('button', { name: 'Hide code' }));
    expect(screen.getByRole('button', { name: 'Count 1' })).to.equal(preview);

    await user.click(screen.getByRole('button', { name: 'Reset demo' }));
    expect(screen.getByRole('button', { name: 'Count 0' })).not.to.equal(preview);
  });

  it('keeps initially hidden source closed after full-source edits', async () => {
    const { user } = render(
      <Demo Content={EditedSource} initialView="expanded" collapseMode="focus" />,
    );

    const preview = await screen.findByRole('button', { name: 'Count 0' });

    await user.click(preview);
    const editor = await screen.findByRole('textbox');

    await user.clear(editor);
    await user.type(editor, EDITED_SOURCE);
    await user.click(screen.getByRole('button', { name: 'Hide source' }));

    expect(screen.queryByRole('textbox')).to.equal(null);
    expect(screen.getByRole('button', { name: 'Count 1' })).to.equal(preview);

    await user.click(screen.getByRole('button', { name: 'Show source' }));

    expect((screen.getByRole('textbox') as HTMLTextAreaElement).value).to.equal(EDITED_SOURCE);
    expect(screen.getByRole('button', { name: 'Count 1' })).to.equal(preview);
  });

  it('keeps initially nonempty snippets visible while collapsed', async () => {
    const { user } = render(
      <Demo Content={EditedSource} initialView="expanded" collapseMode="focus" focusedLines={1} />,
    );

    const editor = await screen.findByRole('textbox');

    await user.click(screen.getByRole('button', { name: 'Hide source' }));

    expect(screen.getByRole('textbox')).to.equal(editor);
  });
});
