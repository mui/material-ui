import { expect } from 'chai';
import { getContents, prepareMarkdown } from './parseMarkdown';

describe('parseMarkdown', () => {
  describe('getContents', () => {
    describe('Split markdown into an array, separating demos', () => {
      it('returns a single entry without a demo', () => {
        expect(getContents('# SomeGuide\nwhich has no demo')).to.deep.equal([
          '# SomeGuide\nwhich has no demo',
        ]);
      });

      it('uses a `{{"demo"` marker to split', () => {
        expect(
          getContents('# SomeGuide\n{{"demo": "GuideDemo.js" }}\n## NextHeading'),
        ).to.deep.equal(['# SomeGuide\n', '"demo": "GuideDemo.js" ', '\n## NextHeading']);
      });

      it('ignores possible code', () => {
        expect(getContents('# SomeGuide\n```jsx\n<Button props={{\nfoo: 1\n}}')).to.deep.equal([
          '# SomeGuide\n```jsx\n<Button props={{\nfoo: 1\n}}',
        ]);
      });
    });
  });

  describe('prepareMarkdown', () => {
    it('returns the table of contents with html and emojis stripped', () => {
      const markdown = `
# Support
## Community help (free)
### GitHub <img src="/static/images/logos/github.svg" width="24" height="24" alt="GitHub logo" loading="lazy" />
### Unofficial 👍
### Warning ⚠️
`;
      // mock require.context
      function requireRaw() {
        return markdown;
      }
      requireRaw.keys = () => ['index.md'];

      const {
        docs: {
          en: { toc },
        },
      } = prepareMarkdown({
        pageFilename: 'test',
        requireRaw,
      });

      expect(toc).to.have.deep.ordered.members([
        {
          children: [
            { hash: 'github', level: 3, text: 'GitHub' },
            { hash: 'unofficial', level: 3, text: 'Unofficial' },
            { hash: 'warning', level: 3, text: 'Warning' },
          ],
          hash: 'community-help-free',
          level: 2,
          text: 'Community help (free)',
        },
      ]);
    });

    it('enables word-break for function signatures', () => {
      const markdown = `
# Theming
## API
### responsiveFontSizes(theme, options) => theme
### createMuiTheme(options, ...args) => theme
`;
      // mock require.context
      function requireRaw() {
        return markdown;
      }
      requireRaw.keys = () => ['index.md'];

      const {
        docs: {
          en: { toc },
        },
      } = prepareMarkdown({
        pageFilename: 'test',
        requireRaw,
      });

      expect(toc).to.have.deep.ordered.members([
        {
          children: [
            {
              hash: 'responsivefontsizes-theme-options-theme',
              level: 3,
              text: 'responsiveFontSizes(&#8203;theme, options) =&gt; theme',
            },
            {
              hash: 'createmuitheme-options-args-theme',
              level: 3,
              text: 'createMuiTheme(&#8203;options, ...args) =&gt; theme',
            },
          ],
          hash: 'api',
          level: 2,
          text: 'API',
        },
      ]);
    });
  });
});
