// @flow

/**
 * This lets us eager load the files ahead of time
 * and require them dynamically with webpack's context feature
 */
export const requireMarkdown = require.context(
  '../pages',
  true,
  /^((?![\\/]component-demos[\\/]).)*\.md$/,
);
export const componentAPIs = requireMarkdown.keys().reduce((res, n) => {
  if (/^\.\/component-api\//.test(n)) {
    res.push({
      path: n,
      name: n.replace(/.*\//, '').replace('.md', ''),
    });
  }
  return res;
}, []);

export const requireDemo = require.context('../pages/component-demos', true, /\.md$/);
export const demos = requireDemo.keys().map(n => ({
  path: n,
  name: n.replace(/.*\//, '').replace('.md', ''),
}));

const headerRegexp = /---\n(.*)\n---/;
const componentsRegexp = /^components: (.*)$/;

export const demoComponentsTree = demos.map(demo => {
  const content = requireDemo(demo.path);
  const header = content.match(headerRegexp);
  const node = {
    demo,
    components: [],
  };

  if (!header) {
    return node;
  }

  const components = header[1].match(componentsRegexp);

  if (!components) {
    return node;
  }

  node.components = components[1].split(', ');

  return node;
});
