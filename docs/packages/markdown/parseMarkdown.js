const { marked } = require('marked');
const kebabCase = require('lodash/kebabCase');
const textToHash = require('./textToHash');
const prism = require('./prism');

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
  // Skip links that are externals to MUI
  if (!(href[0] === '/' || href.startsWith('https://mui.com/'))) {
    return;
  }

  const url = new URL(href, 'https://mui.com/');

  if (url.host === 'mui.com' && url.pathname[url.pathname.length - 1] !== '/') {
    throw new Error(
      [
        'Missing trailing slash. The following link:',
        `[${linkText}](${href}) in ${context.location} is missing a trailing slash, please add it.`,
        '',
        'See https://ahrefs.com/blog/trailing-slash/ for more details.',
        '',
      ].join('\n'),
    );
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

    return headers;
  } catch (err) {
    throw new Error(`${err.message} in getHeader(markdown) with markdown: \n\n${header}`);
  }
}

function getContents(markdown) {
  return markdown
    .replace(headerRegExp, '') // Remove header information
    .split(/^{{("(?:demo|component)":[^}]*)}}$/gm) // Split markdown into an array, separating demos
    .filter((content) => !emptyRegExp.test(content)); // Remove empty lines
}

function getTitle(markdown) {
  const matches = markdown.match(titleRegExp);

  if (!matches || !matches[1]) {
    throw new Error('Missing title in the page');
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

/**
 * @param {string} markdown
 */
function renderInline(markdown) {
  return marked.parseInline(markdown);
}

const noSEOadvantage = [
  'https://material.io/',
  'https://getbootstrap.com/',
  'https://materialdesignicons.com/',
  'https://www.w3.org/',
  'https://tailwindcss.com/',
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
 */
function createRender(context) {
  const { headingHashes, toc, userLanguage } = context;
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

      const headingText = headingHtml
        .replace(
          /([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])\uFE0F?/g,
          '',
        ) // remove emojis
        .replace(/<\/?[^>]+(>|$)/g, '') // remove HTML
        .trim();

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
          throw new Error(`Missing parent level for: ${headingText}`);
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
        `<a aria-labelledby="${hash}" class="anchor-link-style" href="#${hash}" tabindex="-1">`,
        '<svg><use xlink:href="#anchor-link-icon" /></svg>',
        '</a>',
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

      if (
        userLanguage !== 'en' &&
        href.indexOf('/') === 0 &&
        href !== '/size-snapshot' &&
        // The blog is not translated
        !href.startsWith('/blog/')
      ) {
        finalHref = `/${userLanguage}${href}`;
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
      }</code></pre><button data-ga-event-category="code" data-ga-event-action="copy-click" aria-label="Copy the code" class="MuiCode-copy">Copy <span class="MuiCode-copyKeypress"><span>(Or</span> $keyC<span>)</span></span></button></div>\n`;
    };

    const markedOptions = {
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      highlight: prism,
      renderer,
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
            return `<aside class="MuiCallout-root MuiCallout-${token.severity}">${this.parser.parse(
              token.tokens,
            )}\n</aside>`;
          },
        },
      ],
    });

    return marked(markdown, markedOptions);
  }

  return render;
}

/**
 * @param {string} product
 * @example 'material'
 * @param {string} componentPkg
 * @example 'mui-base'
 * @param {string} component
 * @example 'ButtonUnstyled'
 * @returns {string}
 */
function resolveComponentApiUrl(product, componentPkg, component) {
  if (!product) {
    return `/api/${kebabCase(component)}/`;
  }
  if (product === 'date-pickers') {
    return `/x/api/date-pickers/${kebabCase(component)}/`;
  }
  if (componentPkg === 'mui-base') {
    return `/base/api/${kebabCase(component)}/`;
  }
  return `/${product}/api/${kebabCase(component)}/`;
}

/**
 * @param {object} config
 * @param {Array<{ markdown: string, filename: string, userLanguage: string }>} config.translations - Mapping of locale to its markdown
 * @param {string} config.pageFilename - posix filename relative to nextjs pages directory
 */
function prepareMarkdown(config) {
  const { pageFilename, translations, componentPackageMapping = {} } = config;

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
      const title = headers.title || getTitle(markdown);
      const description = headers.description || getDescription(markdown);
      const contents = getContents(markdown);

      if (headers.unstyled) {
        contents.push(`
## Unstyled

The component also comes with an [unstyled version](${headers.unstyled}). It's ideal for doing heavy customizations and minimizing bundle size.
        `);
      }

      if (headers.components.length > 0) {
        contents.push(`
## API

${headers.components
  .map((component) => {
    const componentPkgMap = componentPackageMapping[headers.product];
    const componentPkg = componentPkgMap ? componentPkgMap[component] : null;
    return `- [\`<${component} />\`](${resolveComponentApiUrl(
      headers.product,
      componentPkg,
      component,
    )})`;
  })
  .join('\n')}
  `);
      }

      const location = headers.filename || `/docs${pageFilename}/${filename}`;
      const toc = [];
      const render = createRender({ headingHashes, toc, userLanguage, location });

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

        return render(content);
      });

      // fragment link symbol
      rendered.unshift(`<svg style="display: none;" xmlns="http://www.w3.org/2000/svg">
  <symbol id="anchor-link-icon" viewBox="0 0 16 16">
    <path d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z" />
  </symbol>
</svg>`);

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
  getHeaders,
  getTitle,
  prepareMarkdown,
  renderInline,
};
