// @flow

const headerRegexp = /---\n(.*)\n---/;
const componentsRegexp = /^components: (.*)$/;
const emptyRegexp = /^\s*$/;

export function getComponents(markdown: string) {
  const header = markdown.match(headerRegexp);

  if (!header) {
    return [];
  }

  const components = header[1].match(componentsRegexp);

  if (!components) {
    return [];
  }

  return components[1].split(', ').sort();
}

export function getContents(markdown: string) {
  return markdown
    .replace(headerRegexp, '') // Remove header information
    .split(/^{{|}}$/gm) // Split markdown into an array, separating demos
    .filter(content => !emptyRegexp.test(content)); // Remove empty lines
}
