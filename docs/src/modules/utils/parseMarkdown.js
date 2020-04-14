import marked from 'marked/lib/marked';

const headerRegExp = /---[\r\n]([\s\S]*)[\r\n]---/;
const titleRegExp = /# (.*)[\r\n]/;
const descriptionRegExp = /<p class="description">(.*)<\/p>[\r\n]/;
const headerKeyValueRegExp = /(.*): (.*)/g;
const emptyRegExp = /^\s*$/;

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

  if (!matches || !matches[1]) {
    throw new Error('Missing description in the page');
  }

  return matches[1];
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
