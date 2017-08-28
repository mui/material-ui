// @flow

const headerRegExp = /---\n(.*)\n---/;
const titleRegExp = /# (.*)\n/;
const componentsRegExp = /^components: (.*)$/;
const emptyRegExp = /^\s*$/;

export function getComponents(markdown: string) {
  const header = markdown.match(headerRegExp);

  if (!header) {
    return [];
  }

  const components = header[1].match(componentsRegExp);

  if (!components) {
    return [];
  }

  return components[1].split(', ').sort();
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
