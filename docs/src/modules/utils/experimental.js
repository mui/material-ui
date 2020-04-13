import marked from 'marked/lib/marked';
import { demoRegexp, getContents } from './parseMarkdown';
import textToHash from './textToHash';

// Monkey patch to preserve non-breaking spaces
// https://github.com/chjj/marked/blob/6b0416d10910702f73da9cb6bb3d4c8dcb7dead7/lib/marked.js#L142-L150
marked.Lexer.prototype.lex = function lex(src) {
  src = src
    .replace(/\r\n|\r/g, '\n')
    .replace(/\t/g, '    ')
    .replace(/\u2424/g, '\n');

  return this.token(src, true);
};

function getHeadings(markdown, hashCache) {
  const headings = [];
  const renderer = new marked.Renderer();
  renderer.heading = (text, level) => {
    // Small title. No need for an anchor.
    // It's reducing the risk of duplicated id and it's fewer elements in the DOM.
    if (level < 4) {
      const hash = textToHash(text, hashCache);
      headings.push(hash);
    }

    return '';
  };

  const markedOptions = {
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    renderer,
  };

  marked(markdown, markedOptions);

  return headings;
}

// eslint-disable-next-line  import/prefer-default-export
export function getToc(req) {
  const toc = {};
  req.keys().forEach((filename) => {
    if (filename.indexOf('.md') !== -1) {
      const localeMatch = filename.match(/-([a-z]{2})\.md$/);
      const locale = localeMatch === null ? 'en' : localeMatch[1];

      const markdown = req(filename);
      const contents = getContents(markdown);

      toc[locale] = new Array(contents.length);
      const headingsHashCache = {};

      contents.forEach((content, index) => {
        if (!demoRegexp.test(content)) {
          toc[locale][index] = getHeadings(content, headingsHashCache);
        }
      });
    }
  });

  return toc;
}
