import { describe, it, expect } from 'vitest';
import { createRenderer, isJsdom } from '@mui/internal-test-utils';
import { MarkdownElement } from './MarkdownElement';

const linkedCode = '<p><a href="#link">link <code>code</code></a></p>';

const renderedMarkdown = [
  linkedCode,
  ...['info', 'warning', 'error', 'success'].map(
    (severity) =>
      `<div class="MuiCallout-root MuiCallout-${severity}"><div class="MuiCallout-content">${linkedCode}</div></div>`,
  ),
].join('');

describe('MarkdownElement', () => {
  const { render } = createRenderer();

  it.skipIf(isJsdom())('gives linked code the color of its link', function test() {
    const { container } = render(
      <div>
        <MarkdownElement renderedMarkdown={renderedMarkdown} />
        <div className="mode-dark">
          <MarkdownElement renderedMarkdown={renderedMarkdown} />
        </div>
      </div>,
    );

    const links = container.querySelectorAll('a');
    expect(links).to.have.length(10);
    links.forEach((link) => {
      expect(getComputedStyle(link.querySelector('code')!).color).to.equal(
        getComputedStyle(link).color,
      );
    });
  });
});
