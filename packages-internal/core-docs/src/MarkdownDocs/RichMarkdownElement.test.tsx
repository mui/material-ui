import * as React from 'react';
import * as ReactDOM from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { RichMarkdownElement } from './RichMarkdownElement';

describe('RichMarkdownElement', () => {
  it('renders migrated components synchronously on the server', () => {
    const view = ReactDOM.renderToString(
      <RichMarkdownElement
        demoComponents={{}}
        localizedDoc={{ location: '/docs/data/test.md' }}
        renderedMarkdownOrDemo={{ component: 'probe', label: 'Component content' }}
        srcComponents={{ probe: ({ label }) => <span>{label}</span> }}
      />,
    );

    expect(view).to.equal('<span>Component content</span>');
  });
});
