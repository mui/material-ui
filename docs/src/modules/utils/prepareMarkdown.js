import { LANGUAGES_IN_PROGRESS } from 'docs/src/modules/constants';
import kebabCase from 'lodash/kebabCase';
import { rewriteUrlForNextExport } from 'next/dist/next-server/lib/router/rewrite-url-for-export';
import textToHash from 'docs/src/modules/utils/textToHash';
import {
  demoRegexp,
  getContents,
  getDescription,
  getHeaders,
  getTitle,
  render,
} from 'docs/src/modules/utils/parseMarkdown';
import prism from 'docs/src/modules/components/prism';

const externs = [
  'https://material.io/',
  'https://getbootstrap.com/',
  'https://www.amazon.com/',
  'https://materialdesignicons.com/',
  'https://www.w3.org/',
  'https://devexpress.github.io/',
  'https://ui-kit.co/',
];

export default function prepareMarkdown(config) {
  const { pageFilename, req, reqSource } = config;

  const demos = {};
  const docs = {};
  req.keys().forEach((filename) => {
    if (filename.indexOf('.md') !== -1) {
      const match = filename.match(/-([a-z]{2})\.md$/);

      const userLanguage =
        match && LANGUAGES_IN_PROGRESS.indexOf(match[1]) !== -1 ? match[1] : 'en';

      const markdown = req(filename);
      const contents = getContents(markdown);
      const headers = getHeaders(markdown);

      const title = headers.title || getTitle(markdown);
      const description = headers.description || getDescription(markdown);

      if (headers.components.length > 0) {
        contents.push(`
## API

${headers.components
  .map(
    (component) =>
      `- [&lt;${component} /&gt;](${rewriteUrlForNextExport(`/api/${kebabCase(component)}`)})`,
  )
  .join('\n')}
  `);
      }

      const headingHashes = {};
      const toc = [];
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
          highlight(code, language) {
            let prismLanguage;
            switch (language) {
              case 'ts':
                prismLanguage = prism.languages.tsx;
                break;

              case 'js':
              case 'sh':
                prismLanguage = prism.languages.jsx;
                break;

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

            return prism.highlight(code, prismLanguage);
          },
          heading: (headingText, level) => {
            // Small title. No need for an anchor.
            // It's reducing the risk of duplicated id and it's fewer elements in the DOM.
            if (level >= 4) {
              return `<h${level}>${headingText}</h${level}>`;
            }

            const hash = textToHash(headingText, headingHashes);

            /**
             * create a nested structure with 2 levels starting with level 2 e.g.
             * [{...level2, children: [level3, level3, level3]}, level2]
             */
            if (level === 2) {
              toc.push({
                text: headingText,
                level,
                hash,
                children: [],
              });
            } else if (level === 3) {
              if (!toc[toc.length - 1]) {
                throw new Error(`Missing parent level for: ${headingText}`);
              }

              toc[toc.length - 1].children.push({
                text: headingText,
                level,
                hash,
              });
            }

            return [
              `<h${level}>`,
              `<a class="anchor-link" id="${hash}"></a>`,
              headingText,
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
      const location = headers.filename || `/docs/src/pages/${pageFilename}/${filename}`;

      const localized = { description, location, rendered, toc, title };

      docs[userLanguage] = localized;
    } else if (filename.indexOf('.tsx') !== -1) {
      const demoName = `pages/${pageFilename}/${filename
        .replace(/\.\//g, '')
        .replace(/\.tsx/g, '.js')}`;

      demos[demoName] = {
        ...demos[demoName],
        moduleTS: filename,
        rawTS: reqSource(filename),
      };
    } else {
      const demoName = `pages/${pageFilename}/${filename.replace(/\.\//g, '')}`;

      demos[demoName] = {
        ...demos[demoName],
        module: filename,
        raw: reqSource(filename),
      };
    }
  });

  return { demos, docs };
}
