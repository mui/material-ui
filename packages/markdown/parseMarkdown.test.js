import { expect } from 'chai';
import {
  getContents,
  getDescription,
  getTitle,
  getHeaders,
  prepareMarkdown,
  getCodeblock,
} from './parseMarkdown';

describe('parseMarkdown', () => {
  const defaultParams = {
    fileRelativeContext: 'test/bar',
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

    describe('Split markdown into an array, separating codeblocks', () => {
      it('uses a `<codeblock>` tag to split', () => {
        expect(
          getContents(
            [
              '## Tabs',
              '',
              '<codeblock storageKey="package-manager">',
              '',
              '```bash npm',
              'npm install @mui/material @emotion/react @emotion/styled',
              '```',
              '',
              '```bash yarn',
              'yarn add @mui/material @emotion/react @emotion/styled',
              '```',
              '',
              '</codeblock>',
            ].join('\n'),
          ),
        ).to.deep.equal([
          '## Tabs\n\n',
          [
            '<codeblock storageKey="package-manager">',
            '',
            '```bash npm',
            'npm install @mui/material @emotion/react @emotion/styled',
            '```',
            '',
            '```bash yarn',
            'yarn add @mui/material @emotion/react @emotion/styled',
            '```',
            '',
            '</codeblock>',
          ].join('\n'),
        ]);
      });
    });
  });

  describe('prepareMarkdown', () => {
    it('returns the table of contents with html and emojis preserved and <a> tags stripped', () => {
      const markdown = `
# Support

<p class="description">Foo</p>

## Community help (free)
### GitHub <img src="/static/images/logos/github.svg" width="24" height="24" alt="GitHub logo" loading="lazy" />
### Unofficial 👍
### Warning ⚠️
### Header with Pro plan <a title="Pro plan" href="/x/introduction/licensing/#plan-pro"><span class="plan-pro"></span></a>
### Header with \`code\`
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
              hash: 'github',
              level: 3,
              text: 'GitHub <img src="/static/images/logos/github.svg" width="24" height="24" alt="GitHub logo" loading="lazy" />',
            },
            { hash: 'unofficial', level: 3, text: 'Unofficial 👍' },
            { hash: 'warning', level: 3, text: 'Warning ⚠️' },
            {
              hash: 'header-with-pro-plan',
              level: 3,
              text: 'Header with Pro plan <span class="plan-pro"></span>',
            },
            {
              hash: 'header-with-code',
              level: 3,
              text: 'Header with code',
            },
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
      }).to.throw(`docs-infra: Missing trailing slash. The following link:
[foo](/foo) in /test/bar/index.md is missing a trailing slash, please add it.

See https://ahrefs.com/blog/trailing-slash/ for more details.
`);
    });

    it('should report missing leading splashes', () => {
      const markdown = `
# Localization

<p class="description">Foo</p>

[bar](/bar/)
[foo](foo/)
`;

      expect(() => {
        prepareMarkdown({
          ...defaultParams,
          translations: [{ filename: 'index.md', markdown, userLanguage: 'en' }],
        });
      }).to.throw(`docs-infra: Missing leading slash. The following link:
[foo](foo/) in /test/bar/index.md is missing a leading slash, please add it.
`);
    });

    it('should report title too long', () => {
      const markdown = `
# Foooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo

<p class="description">Foo</p>

`;

      expect(() => {
        prepareMarkdown({
          ...defaultParams,
          translations: [{ filename: 'index.md', markdown, userLanguage: 'en' }],
        });
      }).to
        .throw(`docs-infra: The title "Foooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo" is too long (117 characters).
It needs to have fewer than 70 characters—ideally less than 60. For more details, see:
https://developers.google.com/search/docs/advanced/appearance/title-link
`);
    });

    it('should report description too long', () => {
      const markdown = `
# Foo

<p class="description">Fooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo</p>

`;

      expect(() => {
        prepareMarkdown({
          ...defaultParams,
          translations: [{ filename: 'index.md', markdown, userLanguage: 'en' }],
        });
      }).to
        .throw(`docs-infra: The description "Fooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo" is too long (188 characters).
It needs to have fewer than 170 characters—ideally less than 160. For more details, see:
https://ahrefs.com/blog/meta-description/#4-be-concise
`);
    });
  });

  describe('getCodeblock', () => {
    it('should return undefined if no codeblock found', () => {
      const codeblock = getCodeblock('## Tabs');
      expect(codeblock).to.equal(undefined);
    });

    it('should return the codeblock', () => {
      const codeblock = getCodeblock(
        [
          '<codeblock storageKey="package-manager">',
          '',
          '```bash npm',
          'npm install @mui/material @emotion/react @emotion/styled',
          '# `@emotion/react` and `@emotion/styled` are peer dependencies',
          '```',
          '',
          '```sh yarn',
          'yarn add @mui/material @emotion/react @emotion/styled',
          '# `@emotion/react` and `@emotion/styled` are peer dependencies',
          '```',
          '',
          '</codeblock>',
        ].join('\n'),
      );
      expect(codeblock).to.deep.equal({
        type: 'codeblock',
        storageKey: 'package-manager',
        data: [
          {
            language: 'bash',
            tab: 'npm',
            code: [
              'npm install @mui/material @emotion/react @emotion/styled',
              '# `@emotion/react` and `@emotion/styled` are peer dependencies',
            ].join('\n'),
          },
          {
            language: 'sh',
            tab: 'yarn',
            code: [
              'yarn add @mui/material @emotion/react @emotion/styled',
              '# `@emotion/react` and `@emotion/styled` are peer dependencies',
            ].join('\n'),
          },
        ],
      });
    });
  });

  it('should not accept sh', () => {
    const markdown = `
# Foo

<p class="description">Fo</p>

\`\`\`sh
npm install @mui/material
\`\`\`

`;

    expect(() => {
      prepareMarkdown({
        ...defaultParams,
        translations: [{ filename: 'index.md', markdown, userLanguage: 'en' }],
      });
    }).to.throw(`docs-infra: Unsupported language: "sh" in:

\`\`\`sh
npm install @mui/material
\`\`\`

Use "bash" instead.
`);
  });
});
