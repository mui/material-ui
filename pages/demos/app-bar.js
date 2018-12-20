import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('markdown', true, /.md$/);

const getDemoProps = ({ js, raw }) => {
  const demos = {};
  const rawKeys = raw.keys();
  const jsKeys = js.keys();
  const fileSuffix = js.id.split(' ')[0].replace('./docs/src/', '');
  jsKeys.forEach((key, index) => {
    const fileName = `${fileSuffix}/${key.replace(/.\/|.hooks/g, '')}`;
    const isHooks = key.includes('.hooks.js');
    const jsType = isHooks ? 'jsHooks' : 'js';
    const rawType = isHooks ? 'rawHooks' : 'raw';
    demos[fileName] = {
      [jsType]: js(key).default,
      [rawType]: raw(rawKeys[index]),
      ...(demos[fileName] ? { ...demos[fileName] } : {}),
    };
  });
  return { demos };
};

function Page(props) {
  return (
    <MarkdownDocs
      markdown={req(`./app-bar${props.lang}.md`)}
      {...getDemoProps({
        js: require.context('docs/src/pages/demos/app-bar/', true, /\.js$/),
        raw: require.context('!raw-loader!../../docs/src/pages/demos/app-bar', true, /.js$/),
      })}
    />
  );
}

export default Page;
