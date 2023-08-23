const { marked } = require('marked');
const kebabCase = require('lodash/kebabCase');
const textToHash = require('./textToHash');
const prism = require('./prism');

/**
 * Option used by `marked` the library parsing markdown.
 */
const markedOptions = {
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  headerPrefix: false,
  headerIds: false,
  mangle: false,
};

const headerRegExp = /---[\r\n]([\s\S]*)[\r\n]---/;
const titleRegExp = /# (.*)[\r\n]/;
const descriptionRegExp = /<p class="description">(.*?)<\/p>/s;
const headerKeyValueRegExp = /(.*?):[\r\n]?\s+(\[[^\]]+\]|.*)/g;
const emptyRegExp = /^\s*$/;

/**
 * Same as https://github.com/markedjs/marked/blob/master/src/helpers.js
 * Need to duplicate because `marked` does not export `escape` function
 */
const escapeTest = /[&<>"']/;
const escapeReplace = /[&<>"']/g;
const escapeTestNoEncode = /[<>"']|&(?!#?\w+;)/;
const escapeReplaceNoEncode = /[<>"']|&(?!#?\w+;)/g;
const escapeReplacements = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};
const getEscapeReplacement = (ch) => escapeReplacements[ch];
function escape(html, encode) {
  if (encode) {
    if (escapeTest.test(html)) {
      return html.replace(escapeReplace, getEscapeReplacement);
    }
  } else if (escapeTestNoEncode.test(html)) {
    return html.replace(escapeReplaceNoEncode, getEscapeReplacement);
  }

  return html;
}

function checkUrlHealth(href, linkText, context) {
  const url = new URL(href, 'https://mui.com/');

  // External links to MUI, ignore
  if (url.host !== 'mui.com') {
    return;
  }

  /**
   * Break for links like:
   * /material-ui/customization/theming
   *
   * It needs to be:
   * /material-ui/customization/theming/
   */
  if (url.pathname[url.pathname.length - 1] !== '/') {
    throw new Error(
      [
        'docs-infra: Missing trailing slash. The following link:',
        `[${linkText}](${href}) in ${context.location} is missing a trailing slash, please add it.`,
        '',
        'See https://ahrefs.com/blog/trailing-slash/ for more details.',
        '',
      ].join('\n'),
    );
  }

  // Relative links
  if (href[0] !== '#' && !(href.startsWith('https://') || href.startsWith('http://'))) {
    /**
     * Break for links like:
     * material-ui/customization/theming/
     *
     * It needs to be:
     * /material-ui/customization/theming/
     */
    if (href[0] !== '/') {
      throw new Error(
        [
          'docs-infra: Missing leading slash. The following link:',
          `[${linkText}](${href}) in ${context.location} is missing a leading slash, please add it.`,
          '',
        ].join('\n'),
      );
    }
  }
}

/**
 * Extract information from the top of the markdown.
 * For instance, the following input:
 *
 * ---
 * title: Backdrop React Component
 * components: Backdrop
 * ---
 *
 * # Backdrop
 *
 * should output:
 * { title: 'Backdrop React Component', components: ['Backdrop'] }
 */
function getHeaders(markdown) {
  let header = markdown.match(headerRegExp);

  if (!header) {
    return {
      components: [],
    };
  }

  header = header[1];

  try {
    let regexMatches;
    const headers = {};

    // eslint-disable-next-line no-cond-assign
    while ((regexMatches = headerKeyValueRegExp.exec(header)) !== null) {
      const key = regexMatches[1];
      let value = regexMatches[2].replace(/(.*)/, '$1');
      if (value[0] === '[') {
        // Need double quotes to JSON parse.
        value = value.replace(/'/g, '"');
        // Remove the comma after the last value e.g. ["foo", "bar",] -> ["foo", "bar"].
        value = value.replace(/,\s+\]$/g, ']');
        headers[key] = JSON.parse(value);
      } else {
        // Remove trailing single quote yml escaping.
        headers[key] = value.replace(/^'|'$/g, '');
      }
    }

    if (headers.components) {
      headers.components = headers.components
        .split(',')
        .map((x) => x.trim())
        .sort();
    } else {
      headers.components = [];
    }

    if (headers.hooks) {
      headers.hooks = headers.hooks
        .split(',')
        .map((x) => x.trim())
        .sort();
    } else {
      headers.hooks = [];
    }

    return headers;
  } catch (err) {
    throw new Error(
      `docs-infra: ${err.message} in getHeader(markdown) with markdown: \n\n${header}\n`,
    );
  }
}

function getContents(markdown) {
  const rep = markdown
    .replace(headerRegExp, '') // Remove header information
    .split(/^{{("(?:demo|component)":.*)}}$/gm) // Split markdown into an array, separating demos
    .flatMap((text) => text.split(/^(<codeblock.*?<\/codeblock>)$/gmsu))
    .filter((content) => !emptyRegExp.test(content)); // Remove empty lines
  return rep;
}

function getTitle(markdown) {
  const matches = markdown.match(titleRegExp);

  if (matches === null) {
    return '';
  }

  return matches[1].replace(/`/g, '');
}

function getDescription(markdown) {
  const matches = markdown.match(descriptionRegExp);
  if (matches === null) {
    return undefined;
  }

  return matches[1].trim().replace(/`/g, '');
}

function getCodeblock(content) {
  if (content.startsWith('<codeblock')) {
    const storageKey = content.match(/^<codeblock [^>]*storageKey=["|'](\S*)["|'].*>/m)?.[1];
    const blocks = [...content.matchAll(/^```(\S*) (\S*)\n(.*?)\n```/gmsu)].map(
      ([, language, tab, code]) => ({ language, tab, code }),
    );

    const blocksData = blocks.filter(
      (block) => block.tab !== undefined && !emptyRegExp.test(block.code),
    );

    return {
      type: 'codeblock',
      data: blocksData,
      storageKey,
    };
  }
  return undefined;
}

/**
 * @param {string} markdown
 */
function renderInline(markdown) {
  return marked.parseInline(markdown, markedOptions);
}

// Help rank mui.com on component searches first.
const noSEOadvantage = [
  'https://m2.material.io/',
  'https://m3.material.io/',
  'https://material.io/',
  'https://getbootstrap.com/',
  'https://icons.getbootstrap.com/',
  'https://pictogrammers.com/',
  'https://www.w3.org/',
  'https://tailwindcss.com/',
  'https://heroicons.com/',
  'https://react-icons.github.io/',
  'https://fontawesome.com/',
  'https://www.radix-ui.com/',
  'https://react-spectrum.adobe.com/',
  'https://headlessui.com/',
];

/**
 * Creates a function that MUST be used to render non-inline markdown.
 * It keeps track of a table of contents and hashes of its items.
 * This is important to create anchors that are invariant between languages.
 *
 * @typedef {object} TableOfContentsEntry
 * @property {TableOfContentsEntry[]} children
 * @property {string} hash
 * @property {number} level
 * @property {string} text
 * @param {object} context
 * @param {Record<string, string>} context.headingHashes - WILL BE MUTATED
 * @param {TableOfContentsEntry[]} context.toc - WILL BE MUTATED
 * @param {string} context.userLanguage
 * @param {object} context.options
 */
function createRender(context) {
  const { headingHashes, toc, userLanguage, options } = context;
  const headingHashesFallbackTranslated = {};
  let headingIndex = -1;

  /**
   * @param {string} markdown
   */
  function render(markdown) {
    const renderer = new marked.Renderer();
    renderer.heading = (headingHtml, level) => {
      // Main title, no need for an anchor.
      // It adds noises to the URL.
      //
      // Small title, no need for an anchor.
      // It reduces the risk of duplicated id and it's fewer elements in the DOM.
      if (level === 1 || level >= 4) {
        return `<h${level}>${headingHtml}</h${level}>`;
      }

      // Remove links to avoid nested links in the TOCs
      let headingText = headingHtml.replace(/<a\b[^>]*>/i, '').replace(/<\/a>/i, '');
      // Remove `code` tags
      headingText = headingText.replace(/<code\b[^>]*>/i, '').replace(/<\/code>/i, '');

      // Standardizes the hash from the default location (en) to different locations
      // Need english.md file parsed first
      let hash;
      if (userLanguage === 'en') {
        hash = textToHash(headingText, headingHashes);
      } else {
        headingIndex += 1;
        hash = Object.keys(headingHashes)[headingIndex];
        if (!hash) {
          hash = textToHash(headingText, headingHashesFallbackTranslated);
        }
      }

      // enable splitting of long words from function name + first arg name
      // Closing parens are less interesting since this would only allow breaking one character earlier.
      // Applying the same mechanism would also allow breaking of non-function signatures like "Community help (free)".
      // To detect that we enabled breaking of open/closing parens we'd need a context-sensitive parser.
      const displayText = headingText.replace(/([^\s]\()/g, '$1&#8203;');

      // create a nested structure with 2 levels starting with level 2 e.g.
      // [{...level2, children: [level3, level3, level3]}, level2]
      if (level === 2) {
        toc.push({
          text: displayText,
          level,
          hash,
          children: [],
        });
      } else if (level === 3) {
        if (!toc[toc.length - 1]) {
          throw new Error(`docs-infra: Missing parent level for: ${headingText}\n`);
        }

        toc[toc.length - 1].children.push({
          text: displayText,
          level,
          hash,
        });
      }

      return [
        `<h${level} id="${hash}">`,
        headingHtml,
        `<a aria-labelledby="${hash}" class="anchor-link" href="#${hash}" tabindex="-1">`,
        '<svg><use xlink:href="#anchor-link-icon" /></svg>',
        '</a>',
        `<button title="Post a comment" class="comment-link" data-feedback-hash="${hash}">`,
        '<svg><use xlink:href="#comment-link-icon" /></svg>',
        `</button>`,
        `</h${level}>`,
      ].join('');
    };
    renderer.link = (href, linkTitle, linkText) => {
      let more = '';

      if (noSEOadvantage.some((domain) => href.indexOf(domain) !== -1)) {
        more = ' target="_blank" rel="noopener nofollow"';
      }

      let finalHref = href;

      checkUrlHealth(href, linkText, context);

      if (userLanguage !== 'en' && href.indexOf('/') === 0 && !options.ignoreLanguagePages(href)) {
        finalHref = `/${userLanguage}${href}`;
      }

      // This logic turns link like:
      // https://github.com/mui/material-ui/blob/-/packages/mui-joy/src/styles/components.d.ts
      // into a permalink:
      // https://github.com/mui/material-ui/blob/v5.11.15/packages/mui-joy/src/styles/components.d.ts
      if (finalHref.startsWith(`${options.env.SOURCE_CODE_REPO}/blob/-/`)) {
        finalHref = finalHref.replace(
          `${options.env.SOURCE_CODE_REPO}/blob/-/`,
          `${options.env.SOURCE_CODE_REPO}/blob/v${options.env.LIB_VERSION}/`,
        );
      }

      return `<a href="${finalHref}"${more}>${linkText}</a>`;
    };
    renderer.code = (code, infostring, escaped) => {
      // https://github.com/markedjs/marked/blob/30e90e5175700890e6feb1836c57b9404c854466/src/Renderer.js#L15
      const lang = (infostring || '').match(/\S*/)[0];
      const out = prism(code, lang);
      if (out != null && out !== code) {
        escaped = true;
        code = out;
      }

      code = `${code.replace(/\n$/, '')}\n`;

      if (!lang) {
        return `<pre><code>${escaped ? code : escape(code, true)}</code></pre>\n`;
      }

      return `<div class="MuiCode-root"><pre><code class="language-${escape(lang, true)}">${
        escaped ? code : escape(code, true)
      }</code></pre>${[
        '<button data-ga-event-category="code" data-ga-event-action="copy-click" aria-label="Copy the code" class="MuiCode-copy">',
        '<svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ContentCopyRoundedIcon">',
        '<use class="MuiCode-copy-icon" xlink:href="#copy-icon" />',
        '<use class="MuiCode-copied-icon" xlink:href="#copied-icon" />',
        '</svg>',
        '<span class="MuiCode-copyKeypress"><span>(or</span> $keyC<span>)</span></span></button></div>',
      ].join('')}\n`;
    };

    marked.use({
      extensions: [
        {
          name: 'callout',
          level: 'block',
          start(src) {
            const match = src.match(/:::/);
            return match ? match.index : undefined;
          },
          tokenizer(src) {
            const rule =
              /^ {0,3}(:{3,}(?=[^:\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~:]* *(?=\n|$)|$)/;
            const match = rule.exec(src);
            if (match) {
              const token = {
                type: 'callout',
                raw: match[0],
                text: match[3].trim(),
                severity: match[2],
                tokens: [],
              };
              this.lexer.blockTokens(token.text, token.tokens);
              return token;
            }
            return undefined;
          },

          renderer(token) {
            return `<aside class="MuiCallout-root MuiCallout-${token.severity}">
            ${
              ['info', 'success', 'warning', 'error'].includes(token.severity)
                ? [
                    '<svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ContentCopyRoundedIcon">',
                    `<use class="MuiCode-copied-icon" xlink:href="#${token.severity}-icon" />`,
                    '</svg>',
                  ].join('\n')
                : ''
            }
            <div class="MuiCallout-content">
            ${this.parser.parse(token.tokens)}\n</div></aside>`;
          },
        },
      ],
    });

    return marked(markdown, { ...markedOptions, renderer });
  }

  return render;
}

const BaseUIReexportedComponents = ['ClickAwayListener', 'NoSsr', 'Portal', 'TextareaAutosize'];

/**
 * @param {string} productId
 * @example 'material'
 * @param {string} componentPkg
 * @example 'mui-base'
 * @param {string} component
 * @example 'Button'
 * @returns {string}
 */
function resolveComponentApiUrl(productId, componentPkg, component) {
  if (!productId) {
    return `/api/${kebabCase(component)}/`;
  }
  if (productId === 'x-date-pickers') {
    return `/x/api/date-pickers/${kebabCase(component)}/`;
  }
  if (productId === 'x-charts') {
    return `/x/api/charts/${kebabCase(component)}/`;
  }
  if (productId === 'x-tree-view') {
    return `/x/api/tree-view/${kebabCase(component)}/`;
  }
  if (componentPkg === 'mui-base' || BaseUIReexportedComponents.indexOf(component) >= 0) {
    return `/base-ui/react-${kebabCase(component)}/components-api/#${kebabCase(component)}`;
  }
  return `/${productId}/api/${kebabCase(component)}/`;
}

/**
 * @param {object} config
 * @param {Array<{ markdown: string, filename: string, userLanguage: string }>} config.translations - Mapping of locale to its markdown
 * @param {string} config.fileRelativeContext - posix filename relative to repository root directory
 * @param {object} config.options - provided to the webpack loader
 */
function prepareMarkdown(config) {
  const { fileRelativeContext, translations, componentPackageMapping = {}, options } = config;

  const demos = {};
  /**
   * @type {Record<string, { rendered: Array<string | { component: string } | { demo:string }> }>}
   */
  const docs = {};
  const headingHashes = {};

  translations
    // Process the English markdown before the other locales.
    // English ToC anchor links are used in all languages
    .sort((a) => (a.userLanguage === 'en' ? -1 : 1))
    .forEach((translation) => {
      const { filename, markdown, userLanguage } = translation;
      const headers = getHeaders(markdown);
      const location = headers.filename || `/${fileRelativeContext}/${filename}`;
      const title = headers.title || getTitle(markdown);
      const description = headers.description || getDescription(markdown);

      if (title == null || title === '') {
        throw new Error(`docs-infra: Missing title in the page: ${location}\n`);
      }

      if (title.length > 70) {
        throw new Error(
          [
            `docs-infra: The title "${title}" is too long (${title.length} characters).`,
            'It needs to have fewer than 70 characters—ideally less than 60. For more details, see:',
            'https://developers.google.com/search/docs/advanced/appearance/title-link',
            '',
          ].join('\n'),
        );
      }

      if (description == null || description === '') {
        throw new Error(`docs-infra: Missing description in the page: ${location}\n`);
      }

      if (description.length > 170) {
        throw new Error(
          [
            `docs-infra: The description "${description}" is too long (${description.length} characters).`,
            'It needs to have fewer than 170 characters—ideally less than 160. For more details, see:',
            'https://ahrefs.com/blog/meta-description/#4-be-concise',
            '',
          ].join('\n'),
        );
      }

      const contents = getContents(markdown);

      if (headers.unstyled) {
        contents.push(`
## Unstyled

:::success
[Base UI](/base-ui/getting-started/) provides a headless ("unstyled") version of this [${title}](${headers.unstyled}). Try it if you need more flexibility in customization and a smaller bundle size.
:::
        `);
      }

      if (headers.components.length > 0) {
        contents.push(`
## API

See the documentation below for a complete reference to all of the props and classes available to the components mentioned here.

${headers.components
  .map((component) => {
    const componentPkgMap = componentPackageMapping[headers.productId];
    const componentPkg = componentPkgMap ? componentPkgMap[component] : null;
    return `- [\`<${component} />\`](${resolveComponentApiUrl(
      headers.productId,
      componentPkg,
      component,
    )})`;
  })
  .join('\n')}
${headers.hooks
  .map((hook) => {
    const componentPkgMap = componentPackageMapping[headers.productId];
    const componentPkg = componentPkgMap ? componentPkgMap[hook] : null;
    return `- [\`${hook}\`](${resolveComponentApiUrl(headers.productId, componentPkg, hook)})`;
  })
  .join('\n')}
  `);
      }

      const toc = [];
      const render = createRender({
        headingHashes,
        toc,
        userLanguage,
        location,
        options,
      });

      const rendered = contents.map((content) => {
        if (/^"(demo|component)": "(.*)"/.test(content)) {
          try {
            return JSON.parse(`{${content}}`);
          } catch (err) {
            console.error('JSON.parse fails with: ', `{${content}}`);
            console.error(err);
            return null;
          }
        }

        const codeblock = getCodeblock(content);

        if (codeblock) {
          return codeblock;
        }

        return render(content);
      });

      // fragment link symbol
      rendered.unshift(
        `<svg style="display: none;" xmlns="http://www.w3.org/2000/svg">
      <symbol id="comment-link-icon" viewBox="0 0 24 24">
      <path d="M5.025 14H6.95c.183 0 .35-.029.5-.087a1.24 1.24 0 0 0 .425-.288L13.65 7.9a.622.622 0 0 0 .2-.45.622.622 0 0 0-.2-.45l-2.3-2.3a.622.622 0 0 0-.45-.2.622.622 0 0 0-.45.2l-5.725 5.775a1.24 1.24 0 0 0-.287.425 1.37 1.37 0 0 0-.088.5v1.925c0 .184.067.342.2.475a.65.65 0 0 0 .475.2Zm5.325 0h5.725c.367 0 .68-.129.938-.387.258-.258.387-.57.387-.938 0-.366-.13-.679-.387-.937a1.277 1.277 0 0 0-.938-.388H13L10.35 14Zm-5.5 4.4-2.4 2.4c-.417.417-.896.509-1.437.275C.47 20.842.2 20.434.2 19.85V3.55c0-.733.258-1.358.775-1.875A2.554 2.554 0 0 1 2.85.9h16.3c.733 0 1.358.259 1.875.775.517.517.775 1.142.775 1.875v12.2c0 .734-.258 1.359-.775 1.875a2.554 2.554 0 0 1-1.875.775H4.85Z"/>
      </symbol>
      </svg>`,
      );

      rendered.unshift(
        `<svg style="display: none;" xmlns="http://www.w3.org/2000/svg">
        <symbol id="anchor-link-icon" viewBox="0 0 12 6">
          <path d="M8.9176 0.083252H7.1676C6.84677 0.083252 6.58427 0.345752 6.58427 0.666585C6.58427 0.987419 6.84677 1.24992 7.1676 1.24992H8.9176C9.8801 1.24992 10.6676 2.03742 10.6676 2.99992C10.6676 3.96242 9.8801 4.74992 8.9176 4.74992H7.1676C6.84677 4.74992 6.58427 5.01242 6.58427 5.33325C6.58427 5.65409 6.84677 5.91659 7.1676 5.91659H8.9176C10.5276 5.91659 11.8343 4.60992 11.8343 2.99992C11.8343 1.38992 10.5276 0.083252 8.9176 0.083252ZM3.6676 2.99992C3.6676 3.32075 3.9301 3.58325 4.25094 3.58325H7.75094C8.07177 3.58325 8.33427 3.32075 8.33427 2.99992C8.33427 2.67909 8.07177 2.41659 7.75094 2.41659H4.25094C3.9301 2.41659 3.6676 2.67909 3.6676 2.99992ZM4.83427 4.74992H3.08427C2.12177 4.74992 1.33427 3.96242 1.33427 2.99992C1.33427 2.03742 2.12177 1.24992 3.08427 1.24992H4.83427C5.1551 1.24992 5.4176 0.987419 5.4176 0.666585C5.4176 0.345752 5.1551 0.083252 4.83427 0.083252H3.08427C1.47427 0.083252 0.167603 1.38992 0.167603 2.99992C0.167603 4.60992 1.47427 5.91659 3.08427 5.91659H4.83427C5.1551 5.91659 5.4176 5.65409 5.4176 5.33325C5.4176 5.01242 5.1551 4.74992 4.83427 4.74992Z" />
        </symbol>
    </svg>`,
      );

      rendered.unshift(
        `<svg style="display: none;" xmlns="http://www.w3.org/2000/svg">
      <symbol id="copy-icon" viewBox="0 0 24 24">
      <path d="M15 20H5V7c0-.55-.45-1-1-1s-1 .45-1 1v13c0 1.1.9 2 2 2h10c.55 0 1-.45 1-1s-.45-1-1-1zm5-4V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h9c1.1 0 2-.9 2-2zm-2 0H9V4h9v12z" />
      +</symbol>
      </svg>`,
      );

      rendered.unshift(`
      <svg style="display: none;" xmlns="http://www.w3.org/2000/svg">
      <symbol id="copied-icon" viewBox="0 0 24 24">
        <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.24 11.28L9.69 11.2c-.38-.39-.38-1.01 0-1.4.39-.39 1.02-.39 1.41 0l1.36 1.37 4.42-4.46c.39-.39 1.02-.39 1.41 0 .38.39.38 1.01 0 1.4l-5.13 5.17c-.37.4-1.01.4-1.4 0zM3 6c-.55 0-1 .45-1 1v13c0 1.1.9 2 2 2h13c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1-.45-1-1V7c0-.55-.45-1-1-1z" />
      </symbol>
      </svg>`);

      // icons for callout (info, success, warning, error)

      rendered.unshift(
        `<svg style="display: none;" xmlns="http://www.w3.org/2000/svg">
      <symbol id="info-icon" viewBox="0 0 20 20">
      <path d="M9.996 14c.21 0 .39-.072.535-.216a.72.72 0 0 0 .219-.534v-3.5a.728.728 0 0 0-.214-.534.72.72 0 0 0-.532-.216.734.734 0 0 0-.535.216.72.72 0 0 0-.219.534v3.5c0 .213.071.39.214.534a.72.72 0 0 0 .532.216Zm0-6.5c.21 0 .39-.071.535-.214a.714.714 0 0 0 .219-.532.736.736 0 0 0-.214-.535.714.714 0 0 0-.532-.219.736.736 0 0 0-.535.214.714.714 0 0 0-.219.532c0 .21.071.39.214.535.143.146.32.219.532.219Zm.01 10.5a7.81 7.81 0 0 1-3.11-.625 8.065 8.065 0 0 1-2.552-1.719 8.066 8.066 0 0 1-1.719-2.551A7.818 7.818 0 0 1 2 9.99c0-1.104.208-2.14.625-3.105a8.066 8.066 0 0 1 4.27-4.26A7.818 7.818 0 0 1 10.009 2a7.75 7.75 0 0 1 3.106.625 8.083 8.083 0 0 1 4.26 4.265A7.77 7.77 0 0 1 18 9.994a7.81 7.81 0 0 1-.625 3.11 8.066 8.066 0 0 1-1.719 2.552 8.083 8.083 0 0 1-2.546 1.719 7.77 7.77 0 0 1-3.104.625Z"/>
      </symbol>
      </svg>`,
      );
      rendered.unshift(
        `<svg style="display: none;" xmlns="http://www.w3.org/2000/svg">
      <symbol id="success-icon" viewBox="0 0 20 20">
      <path d="m8.938 10.875-1.25-1.23a.718.718 0 0 0-.521-.228.718.718 0 0 0-.521.229.73.73 0 0 0 0 1.062l1.77 1.771c.153.153.327.23.521.23a.718.718 0 0 0 .521-.23l3.896-3.896a.73.73 0 0 0 0-1.062.718.718 0 0 0-.52-.23.718.718 0 0 0-.521.23l-3.376 3.354ZM10 18a7.796 7.796 0 0 1-3.104-.625 8.065 8.065 0 0 1-2.552-1.719 8.064 8.064 0 0 1-1.719-2.552A7.797 7.797 0 0 1 2 10c0-1.111.208-2.15.625-3.115a8.064 8.064 0 0 1 4.27-4.26A7.797 7.797 0 0 1 10 2c1.111 0 2.15.208 3.115.625a8.096 8.096 0 0 1 4.26 4.26C17.792 7.851 18 8.89 18 10a7.797 7.797 0 0 1-.625 3.104 8.066 8.066 0 0 1-4.26 4.271A7.774 7.774 0 0 1 10 18Z"/>
      </symbol>
      </svg>`,
      );
      rendered.unshift(
        `<svg style="display: none;" xmlns="http://www.w3.org/2000/svg">
      <symbol id="warning-icon" viewBox="0 0 20 20">
      <path d="M2.33 17a.735.735 0 0 1-.665-.375.631.631 0 0 1-.094-.375.898.898 0 0 1 .115-.396L9.353 3.062a.621.621 0 0 1 .281-.27.85.85 0 0 1 .729 0 .622.622 0 0 1 .281.27l7.667 12.792c.07.125.108.257.114.396a.63.63 0 0 1-.093.375.842.842 0 0 1-.271.27.728.728 0 0 1-.394.105H2.33Zm7.664-2.5c.211 0 .39-.072.536-.214a.714.714 0 0 0 .218-.532.736.736 0 0 0-.214-.535.714.714 0 0 0-.531-.22.736.736 0 0 0-.536.215.714.714 0 0 0-.219.531c0 .212.072.39.215.536.143.146.32.219.531.219Zm0-2.5c.211 0 .39-.072.536-.216a.72.72 0 0 0 .218-.534v-2.5a.728.728 0 0 0-.214-.534.72.72 0 0 0-.531-.216.734.734 0 0 0-.536.216.72.72 0 0 0-.219.534v2.5c0 .212.072.39.215.534a.72.72 0 0 0 .531.216Z"/>
      </symbol>
      </svg>`,
      );
      rendered.unshift(
        `<svg style="display: none;" xmlns="http://www.w3.org/2000/svg">
      <symbol id="error-icon" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M2 7.4v5.2a2 2 0 0 0 .586 1.414l3.4 3.4A2 2 0 0 0 7.4 18h5.2a2 2 0 0 0 1.414-.586l3.4-3.4A2 2 0 0 0 18 12.6V7.4a2 2 0 0 0-.586-1.414l-3.4-3.4A2 2 0 0 0 12.6 2H7.4a2 2 0 0 0-1.414.586l-3.4 3.4A2 2 0 0 0 2 7.4Zm11.03-.43a.75.75 0 0 1 0 1.06L11.06 10l1.97 1.97a.75.75 0 1 1-1.06 1.06L10 11.06l-1.97 1.97a.75.75 0 0 1-1.06-1.06L8.94 10 6.97 8.03a.75.75 0 0 1 1.06-1.06L10 8.94l1.97-1.97a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd"/>
      </symbol>
      </svg>`,
      );
      docs[userLanguage] = {
        description,
        location,
        rendered,
        toc,
        title,
        headers,
      };
    });

  return { demos, docs };
}

module.exports = {
  createRender,
  getContents,
  getDescription,
  getCodeblock,
  getHeaders,
  getTitle,
  prepareMarkdown,
  renderInline,
};
