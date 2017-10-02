// @flow

const headerRegExp = /---\n([\s\S]*)\n---/;
const titleRegExp = /# (.*)\n/;
const headerKeyValueRegExp = /(.*): (.*)/g;
const emptyRegExp = /^\s*$/;

export function getHeaders(markdown: string) {
  let header = markdown.match(headerRegExp);

  if (!header) {
    return {
      components: [],
    };
  }

  header = header[1];

  let regexMatchs;
  const headers = {};

  // eslint-disable-next-line no-cond-assign
  while ((regexMatchs = headerKeyValueRegExp.exec(header)) !== null) {
    headers[regexMatchs[1]] = regexMatchs[2];
  }

  if (headers.components) {
    headers.components = headers.components.split(', ').sort();
  } else {
    headers.components = [];
  }

  return headers;
}

export function getContents(markdown: string) {
  return markdown
    .replace(headerRegExp, '') // Remove header information
    .split(/^{{|}}$/gm) // Split markdown into an array, separating demos
    .filter(content => !emptyRegExp.test(content)); // Remove empty lines
}

export function getTitle(markdown: string) {
  const matches = markdown.match(titleRegExp);

  return matches ? matches[1] : 'Material-UI';
}
