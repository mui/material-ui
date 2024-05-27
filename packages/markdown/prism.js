const prism = require('prismjs');
require('prismjs/components/prism-css');
require('prismjs/components/prism-bash');
require('prismjs/components/prism-diff');
require('prismjs/components/prism-javascript');
require('prismjs/components/prism-json');
require('prismjs/components/prism-jsx');
require('prismjs/components/prism-markup');
require('prismjs/components/prism-yaml');
require('prismjs/components/prism-tsx');
require('prismjs/plugins/line-highlight/prism-line-highlight');

function highlight(code, language, highlightLines = []) {
  let prismLanguage;
  switch (language) {
    case 'ts':
      prismLanguage = prism.languages.tsx;
      break;

    case 'js':
      prismLanguage = prism.languages.jsx;
      break;

    case 'sh':
      throw new Error(
        [
          `docs-infra: Unsupported language: "sh" in:`,
          '',
          '```sh',
          code,
          '```',
          '',
          'Use "bash" instead.',
          '',
        ].join('\n'),
      );

    case 'diff':
      prismLanguage = { ...prism.languages.diff };
      // original `/^[-<].*$/m` matches lines starting with `<` which matches
      // <SomeComponent />
      // we will only use `-` as the deleted marker
      prismLanguage.deleted = /^[-].*$/m;
      break;

    default:
      prismLanguage = prism.languages[language];
      break;
  }

  if (!prismLanguage) {
    if (language) {
      throw new Error(`unsupported language: "${language}", "${code}"`);
    } else {
      prismLanguage = prism.languages.jsx;
    }
  }

  const highlightedCode = prism.highlight(code, prismLanguage);

  const lineHighlightAttr = highlightLines.length > 0 
    ? ` data-line="${highlightLines.join(',')}"` 
    : '';

  return [highlightedCode,lineHighlightAttr];
}

module.exports = highlight;