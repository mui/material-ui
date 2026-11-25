import { beforeAll, describe, it, expect } from 'vitest';
import { userEvent } from 'vitest/browser';
import * as React from 'react';
import type { NextRouter } from 'next/router';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { CodeHighlighter } from '@mui/internal-docs-infra/CodeHighlighter';
import { CodeProviderLazy } from '@mui/internal-docs-infra/CodeProvider';
import type { Code } from '@mui/internal-docs-infra/CodeHighlighter/types';
import { createParseSource } from '@mui/internal-docs-infra/pipeline/parseSource';
import { createEnhanceCodeEmphasis } from '@mui/internal-docs-infra/pipeline/enhanceCodeEmphasis';
import { act, createRenderer, isJsdom, screen } from '@mui/internal-test-utils';
import { ThemeProvider } from '@mui/material/styles';
import { brandingLightTheme } from '../branding';
import { UserLanguageProvider } from '../i18n';
import DemoContent from './DemoContent';
import DemoContentFrame from './DemoContentFrame';
import DemoContentLoading from './DemoContentLoading';
import DemoController from './DemoController';

const MAIN_FILE = 'Counter.tsx';
const HELPER_FILE = 'message.ts';
const HELPER_SOURCE = "export const message = 'Count';";

const FOCUS =
  '    <button onClick={() => setCount((value) => value + 1)}>{message} {count}</button>';

const SOURCE = `import * as React from 'react';
import { message } from './message';

export default function Counter() {
  const [count, setCount] = React.useState(0);
  return (
${FOCUS}
  );
}`;

let code: Code;

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
  initialView = 'collapsed',
  collapseMode = 'empty',
}: {
  initialView?: 'collapsed' | 'expanded';
  collapseMode?: 'empty' | 'focus';
}) {
  return (
    <RouterContext.Provider value={router}>
      <UserLanguageProvider defaultUserLanguage="en">
        <ThemeProvider theme={brandingLightTheme}>
          <CodeProviderLazy>
            <DemoController>
              <CodeHighlighter
                precompute={code}
                components={{ Default: <Counter /> }}
                initialVariant="Default"
                highlightAfter="init"
                enhanceAfter="init"
                editActivation="interaction"
                Content={DemoContent}
                ContentFrame={DemoContentFrame}
                ContentLoading={DemoContentLoading}
                contentProps={{ disableAd: true }}
                collapseToEmpty={collapseMode === 'empty'}
                initialExpanded={initialView === 'expanded'}
              />
            </DemoController>
          </CodeProviderLazy>
        </ThemeProvider>
      </UserLanguageProvider>
    </RouterContext.Provider>
  );
}

async function activateEditor() {
  // eslint-disable-next-line testing-library/no-unnecessary-act -- Vitest browser actions do not wrap React updates.
  await act(async () => {
    await userEvent.click(screen.getByRole('group', { name: 'Editable code' }));
  });

  return screen.findByRole('textbox');
}

describe.skipIf(isJsdom())('DemoContent source visibility', () => {
  const { render } = createRenderer();

  beforeAll(async () => {
    const parse = await createParseSource(['source.tsx', 'source.ts']);
    const start = SOURCE.indexOf(FOCUS);
    const line = SOURCE.slice(0, start).split('\n').length;
    const comments = { [line]: ['@focus'] };
    const enhance = createEnhanceCodeEmphasis({ emitFrameIndent: true, paddingFrameMaxSize: 0 });

    code = {
      Default: {
        fileName: MAIN_FILE,
        source: await enhance(parse(SOURCE, MAIN_FILE), comments, MAIN_FILE),
        comments,
        totalLines: SOURCE.split('\n').length,
        focusedLines: 1,
        collapsible: true,
        sourceProjection: {
          source: FOCUS,
          start,
          end: start + FOCUS.length,
          indentation: '    ',
        },
        extraFiles: {
          [HELPER_FILE]: { source: parse(HELPER_SOURCE, HELPER_FILE) },
        },
      },
    };
  });

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

  it.each(['empty', 'focus'] as const)(
    'preserves real edits while hiding unsafe collapsed source: %s',
    async (collapseMode) => {
      const { container, user } = render(
        <Demo initialView="expanded" collapseMode={collapseMode} />,
      );

      const editor = await activateEditor();

      // eslint-disable-next-line testing-library/no-unnecessary-act -- Vitest browser actions do not wrap React updates.
      await act(async () => {
        await userEvent.fill(
          editor,
          SOURCE.replace('{message} {count}', 'Edited {message} {count}'),
        );
      });
      const preview = await screen.findByRole('button', { name: 'Edited Count 0' });

      await user.click(preview);
      await user.click(screen.getByRole('button', { name: /^(Hide|Collapse) code$/ }));

      expect(container.querySelector('pre')).to.equal(null);
      expect(screen.queryByRole('textbox')).to.equal(null);
      expect(screen.getByRole('button', { name: 'Edited Count 1' })).to.equal(preview);

      await user.click(screen.getByRole('button', { name: /^(Show|Expand) code$/ }));
      const reopened = await activateEditor();

      expect((reopened as HTMLTextAreaElement).value).to.include('Edited {message} {count}');
      expect(screen.getByRole('button', { name: 'Edited Count 1' })).to.equal(preview);
    },
  );

  it('keeps a pristine focused preview visible when collapsed', async () => {
    const { container, user } = render(<Demo initialView="expanded" collapseMode="focus" />);

    await user.click(await screen.findByRole('button', { name: 'Collapse code' }));

    expect(container.querySelector('pre')).not.to.equal(null);
    const editor = await activateEditor();

    expect((editor as HTMLTextAreaElement).value).to.equal(FOCUS.trimStart());
  });

  it('hides a selected helper while collapsed and preserves it on reopen', async () => {
    const { container, user } = render(<Demo initialView="expanded" collapseMode="focus" />);

    await user.click(await screen.findByRole('tab', { name: HELPER_FILE }));
    await user.click(screen.getByRole('button', { name: 'Collapse code' }));

    expect(container.querySelector('pre')).to.equal(null);
    expect(screen.queryByRole('tab')).to.equal(null);

    await user.click(screen.getByRole('button', { name: 'Expand code' }));

    expect(screen.getByRole('tab', { name: HELPER_FILE }).getAttribute('aria-selected')).to.equal(
      'true',
    );
    const editor = await activateEditor();

    expect((editor as HTMLTextAreaElement).value).to.equal(HELPER_SOURCE);
  });
});
