import marked from 'marked/lib/marked';
import { LANGUAGES_IN_PROGRESS } from 'docs/src/modules/constants';
import kebabCase from 'lodash/kebabCase';
import { rewriteUrlForNextExport } from 'next/dist/next-server/lib/router/rewrite-url-for-export';
import textToHash from 'docs/src/modules/utils/textToHash';
import prism from 'docs/src/modules/utils/prism';

const headerRegExp = /---[\r\n]([\s\S]*)[\r\n]---/;
const titleRegExp = /# (.*)[\r\n]/;
const descriptionRegExp = /<p class="description">(.*)<\/p>[\r\n]/;
const headerKeyValueRegExp = /(.*): (.*)/g;
const emptyRegExp = /^\s*$/;
const notEnglishMarkdownRegExp = /-([a-z]{2})\.md$/;

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
export function getHeaders(markdown) {
  let header = markdown.match(headerRegExp);

  if (!header) {
    return {
      components: [],
    };
  }

  header = header[1];

  let regexMatches;
  const headers = {};

  // eslint-disable-next-line no-cond-assign
  while ((regexMatches = headerKeyValueRegExp.exec(header)) !== null) {
    headers[regexMatches[1]] = regexMatches[2];
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
}

export const demoRegexp = /^"demo": "(.*)"/;

export function getContents(markdown) {
  return markdown
    .replace(headerRegExp, '') // Remove header information
    .split(/^{{("demo":[^}]*)}}$/gm) // Split markdown into an array, separating demos
    .filter((content) => !emptyRegExp.test(content)); // Remove empty lines
}

export function getTitle(markdown) {
  const matches = markdown.match(titleRegExp);

  if (!matches || !matches[1]) {
    throw new Error('Missing title in the page');
  }

  return matches[1];
}

export function getDescription(markdown) {
  const matches = markdown.match(descriptionRegExp);

  return matches?.[1];
}

/**
 * Render markdown used in the Material-UI docs
 *
 * @param {string} markdown
 * @param {object} [options]
 * @param {function} [options.highlight] - https://marked.js.org/#/USING_ADVANCED.md#highlight
 * @param {object} [options.rest] - properties from https://marked.js.org/#/USING_PRO.md#renderer
 */
export function render(markdown, options = {}) {
  const { highlight, ...rendererOptions } = options;

  const renderer = Object.assign(new marked.Renderer(), rendererOptions);

  const markedOptions = {
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    highlight,
    renderer,
  };

  return marked(markdown, markedOptions);
}

const externs = [
  'https://material.io/',
  'https://getbootstrap.com/',
  'https://www.amazon.com/',
  'https://materialdesignicons.com/',
  'https://www.w3.org/',
  'https://devexpress.github.io/',
  'https://ui-kit.co/',
];

/**
 *
 * @param {object} config
 * @param {() => string} config.requireRaw - returnvalue of require.context
 * @param {string} config.pageFilename - filename relative to nextjs pages directory
 */
export function prepareMarkdown(config) {
  const { pageFilename, requireRaw } = config;

  const demos = {};
  const docs = {};
  const headingHashes = {};

  // Process the English markdown before the other locales.
  let filenames = [];
  requireRaw.keys().forEach((filename) => {
    if (filename.match(notEnglishMarkdownRegExp)) {
      filenames.push(filename);
    } else {
      filenames = [filename].concat(filenames);
    }
  });

  filenames.forEach((filename) => {
    if (filename.indexOf('.md') !== -1) {
      const matchNotEnglishMarkdown = filename.match(notEnglishMarkdownRegExp);

      const userLanguage =
        matchNotEnglishMarkdown && LANGUAGES_IN_PROGRESS.indexOf(matchNotEnglishMarkdown[1]) !== -1
          ? matchNotEnglishMarkdown[1]
          : 'en';

      const markdown = requireRaw(filename);
      const headers = getHeaders(markdown);
      const title = headers.title || getTitle(markdown);
      const description = headers.description || getDescription(markdown);
      const contents = getContents(markdown);

      if (headers.components.length > 0) {
        contents.push(`
## API

${headers.components
  .map(
    (component) =>
      `- [\`<${component} />\`](${rewriteUrlForNextExport(`/api/${kebabCase(component)}`)})`,
  )
  .join('\n')}
  `);
      }

      const toc = [];
      const headingHashesFallbackTranslated = {};
      let headingIndex = -1;

      const rendered = contents.map((content) => {
        if (demos && demoRegexp.test(content)) {
          try {
            return JSON.parse(`{${content}}`);
          } catch (err) {
            console.error('JSON.parse fails with: ', `{${content}}`);
            console.error(err);
            return null;
          }
        }

        return render(content, {
          highlight: prism,
          heading: (headingHtml, level) => {
            // Small title. No need for an anchor.
            // It's reducing the risk of duplicated id and it's fewer elements in the DOM.
            if (level >= 4) {
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
              `<h${level}>`,
              `<a class="anchor-link" id="${hash}"></a>`,
              headingHtml,
              `<a class="anchor-link-style" aria-hidden="true" aria-label="anchor" href="#${hash}">`,
              '<svg><use xlink:href="#anchor-link-icon" /></svg>',
              '</a>',
              `</h${level}>`,
            ].join('');
          },
          link: (href, linkTitle, linkText) => {
            let more = '';

            if (externs.some((domain) => href.indexOf(domain) !== -1)) {
              more = ' target="_blank" rel="noopener nofollow"';
            }

            let finalHref = href;

            if (
              userLanguage !== 'en' &&
              finalHref.indexOf('/') === 0 &&
              finalHref !== '/size-snapshot'
            ) {
              finalHref = `/${userLanguage}${finalHref}`;
            }

            return `<a href="${finalHref}"${more}>${linkText}</a>`;
          },
        });
      });

      // fragment link symbol
      rendered.unshift(`<svg style="display: none;" xmlns="http://www.w3.org/2000/svg">
  <symbol id="anchor-link-icon" viewBox="0 0 16 16">
    <path d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z" />
  </symbol>
</svg>`);

      docs[userLanguage] = {
        description,
        location: headers.filename || `/docs/src/pages/${pageFilename}/${filename}`,
        rendered,
        toc,
        title,
      };
    } else if (filename.indexOf('.tsx') !== -1) {
      const demoName = `pages/${pageFilename}/${filename
        .replace(/\.\//g, '')
        .replace(/\.tsx/g, '.js')}`;

      demos[demoName] = {
        ...demos[demoName],
        moduleTS: filename,
        rawTS: requireRaw(filename),
      };
    } else {
      const demoName = `pages/${pageFilename}/${filename.replace(/\.\//g, '')}`;

      demos[demoName] = {
        ...demos[demoName],
        module: filename,
        raw: requireRaw(filename),
      };
    }
  });

  return { demos, docs };
}
