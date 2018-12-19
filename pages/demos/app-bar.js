import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('markdown', true, /.md$/);

const parseAll = ({ fileNameSuffix: suffix, js, raw }) => {
  const cache = {};
  const rawKeys = raw.keys();
  js.keys().forEach((key, index) => {
    const isHooksVariant = key.includes('.hooks.js');
    const fileName = `${suffix}${key
      .split('.')[1]
      .replace('/', '')
      .concat('.js')}`;
    if (isHooksVariant) {
      cache[fileName] = {
        jsHooks: js(key).default,
        rawHooks: raw(rawKeys[index]),
        ...(cache[fileName] ? { ...cache[fileName] } : {}),
      };
    }
    if (!isHooksVariant) {
      cache[fileName] = {
        js: js(key).default,
        raw: raw(rawKeys[index]),
        ...(cache[fileName] ? { ...cache[fileName] } : {}),
      };
    }
  });
  return cache;
};

function Page(props) {
  return (
    <MarkdownDocs
      markdown={req(`./app-bar${props.lang}.md`)}
      demos={parseAll({
        fileNameSuffix: 'pages/demos/app-bar/',
        js: require.context('docs/src/pages/demos/app-bar/', true, /\.js$/),
        raw: require.context('!raw-loader!../../docs/src/pages/demos/app-bar', true, /.js$/),
      })}
    />
  );
}

export default Page;
