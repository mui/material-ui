import { expect } from 'chai';
import {
  getContents,
  getDescription,
  getTitle,
  getHeaders,
  prepareMarkdown,
} from './parseMarkdown';

describe('parseMarkdown', () => {
  const defaultParams = {
    pageFilename: '/test',
    options: {
      env: {},
    },
  };

  describe('getTitle', () => {
    it('remove backticks', () => {
      expect(
        getTitle(`
# \`@mui/styled-engine\`

<p class="description">Configuring your preferred styling library.</p>
      `),
      ).to.equal('@mui/styled-engine');
    });
  });

  describe('getDescription', () => {
    it('trims the description', () => {
      expect(
        getDescription(`
<p class="description">
  Some description
</p>
      `),
      ).to.equal('Some description');
    });

    it('remove backticks', () => {
      expect(
        getDescription(`
<p class="description">
  Some \`description\`
</p>
      `),
      ).to.equal('Some description');
    });

    it('should not be greedy', () => {
      expect(
        getDescription(`
<p class="description">
  Some description
</p>
## Foo
<p>bar</p>
      `),
      ).to.equal('Some description');
    });
  });

  describe('getHeaders', () => {
    it('should return a correct result', () => {
      expect(
        getHeaders(`
---
title: React Alert component
components: Alert, AlertTitle
hooks: useAlert
githubLabel: 'component: alert'
packageName: '@mui/lab'
waiAria: https://www.w3.org/TR/wai-aria-practices/#alert
authors: ['foo', 'bar']
---
`),
      ).to.deep.equal({
        components: ['Alert', 'AlertTitle'],
        hooks: ['useAlert'],
        githubLabel: 'component: alert',
        packageName: '@mui/lab',
        title: 'React Alert component',
        waiAria: 'https://www.w3.org/TR/wai-aria-practices/#alert',
        authors: ['foo', 'bar'],
      });
    });

    it('should work with authors broken in two lines', () => {
      expect(
        getHeaders(`
---
title: React Alert component
components: Alert, AlertTitle
githubLabel: 'component: alert'
packageName: '@mui/lab'
waiAria: https://www.w3.org/TR/wai-aria-practices/#alert
authors:
  ['foo', 'bar']
---
`),
      ).to.deep.equal({
        components: ['Alert', 'AlertTitle'],
        hooks: [],
        githubLabel: 'component: alert',
        packageName: '@mui/lab',
        title: 'React Alert component',
        waiAria: 'https://www.w3.org/TR/wai-aria-practices/#alert',
        authors: ['foo', 'bar'],
      });
    });

    it('should work with one author per line', () => {
      expect(
        getHeaders(`
---
title: React Alert component
components: Alert, AlertTitle
githubLabel: 'component: alert'
packageName: '@mui/lab'
waiAria: https://www.w3.org/TR/wai-aria-practices/#alert
authors:
  [
    'foo',
    'bar',
  ]
---
    `),
      ).to.deep.equal({
        components: ['Alert', 'AlertTitle'],
        hooks: [],
        githubLabel: 'component: alert',
        packageName: '@mui/lab',
        title: 'React Alert component',
        waiAria: 'https://www.w3.org/TR/wai-aria-practices/#alert',
        authors: ['foo', 'bar'],
      });
    });
  });

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

<p class="description">Foo</p>

## Community help (free)
### GitHub <img src="/static/images/logos/github.svg" width="24" height="24" alt="GitHub logo" loading="lazy" />
### Unofficial 👍
### Warning ⚠️
`;

      const {
        docs: {
          en: { toc },
        },
      } = prepareMarkdown({
        ...defaultParams,
        translations: [{ filename: 'index.md', markdown, userLanguage: 'en' }],
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

<p class="description">Foo</p>

## API
### responsiveFontSizes(theme, options) => theme
### createTheme(options, ...args) => theme
`;

      const {
        docs: {
          en: { toc },
        },
      } = prepareMarkdown({
        ...defaultParams,
        translations: [{ filename: 'index.md', markdown, userLanguage: 'en' }],
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
              hash: 'createtheme-options-args-theme',
              level: 3,
              text: 'createTheme(&#8203;options, ...args) =&gt; theme',
            },
          ],
          hash: 'api',
          level: 2,
          text: 'API',
        },
      ]);
    });

    it('use english hash for different locales', () => {
      const markdownEn = `
# Localization

<p class="description">Foo</p>

## Locales
### Example
### Use same hash
`;

      const markdownPt = `
# Localização

<p class="description">Foo</p>

## Idiomas
### Exemplo
### Usar o mesmo hash
`;

      const markdownZh = `
# 所在位置

<p class="description">Foo</p>

## 语言环境
### 例
### 使用相同的哈希
`;
      const {
        docs: {
          en: { toc: tocEn },
          pt: { toc: tocPt },
          zh: { toc: tocZh },
        },
      } = prepareMarkdown({
        pageFilename: '/same-hash-test',
        translations: [
          { filename: 'localization.md', markdown: markdownEn, userLanguage: 'en' },
          { filename: 'localization-pt.md', markdown: markdownPt, userLanguage: 'pt' },
          { filename: 'localization-zh.md', markdown: markdownZh, userLanguage: 'zh' },
        ],
      });

      expect(tocZh).to.have.deep.ordered.members([
        {
          children: [
            {
              hash: 'example',
              level: 3,
              text: '例',
            },
            {
              hash: 'use-same-hash',
              level: 3,
              text: '使用相同的哈希',
            },
          ],
          hash: 'locales',
          level: 2,
          text: '语言环境',
        },
      ]);

      expect(tocPt).to.have.deep.ordered.members([
        {
          children: [
            {
              hash: 'example',
              level: 3,
              text: 'Exemplo',
            },
            {
              hash: 'use-same-hash',
              level: 3,
              text: 'Usar o mesmo hash',
            },
          ],
          hash: 'locales',
          level: 2,
          text: 'Idiomas',
        },
      ]);

      expect(tocEn).to.have.deep.ordered.members([
        {
          children: [
            {
              hash: 'example',
              level: 3,
              text: 'Example',
            },
            {
              hash: 'use-same-hash',
              level: 3,
              text: 'Use same hash',
            },
          ],
          hash: 'locales',
          level: 2,
          text: 'Locales',
        },
      ]);
    });

    it('use translated hash for translations are not synced', () => {
      const markdownEn = `
# Localization

<p class="description">Foo</p>

## Locales
### Example
### Use same hash
`;

      const markdownPt = `
# Localização

<p class="description">Foo</p>

## Idiomas
### Exemplo
### Usar o mesmo hash
### Usar traduzido
`;

      const {
        docs: {
          en: { toc: tocEn },
          pt: { toc: tocPt },
        },
      } = prepareMarkdown({
        pageFilename: '/same-hash-test',
        translations: [
          { filename: 'localization.md', markdown: markdownEn, userLanguage: 'en' },
          { filename: 'localization-pt.md', markdown: markdownPt, userLanguage: 'pt' },
        ],
      });

      expect(tocPt).to.have.deep.ordered.members([
        {
          children: [
            {
              hash: 'example',
              level: 3,
              text: 'Exemplo',
            },
            {
              hash: 'use-same-hash',
              level: 3,
              text: 'Usar o mesmo hash',
            },
            {
              hash: 'usar-traduzido',
              level: 3,
              text: 'Usar traduzido',
            },
          ],
          hash: 'locales',
          level: 2,
          text: 'Idiomas',
        },
      ]);

      expect(tocEn).to.have.deep.ordered.members([
        {
          children: [
            {
              hash: 'example',
              level: 3,
              text: 'Example',
            },
            {
              hash: 'use-same-hash',
              level: 3,
              text: 'Use same hash',
            },
          ],
          hash: 'locales',
          level: 2,
          text: 'Locales',
        },
      ]);
    });

    it('should report missing trailing splashes', () => {
      const markdown = `
# Localization

<p class="description">Foo</p>

[bar](/bar/)
[foo](/foo)
`;

      expect(() => {
        prepareMarkdown({
          ...defaultParams,
          translations: [{ filename: 'index.md', markdown, userLanguage: 'en' }],
        });
      }).to.throw(/\[foo]\(\/foo\) in \/docs\/test\/index\.md is missing a trailing slash/);
    });
  });
});
