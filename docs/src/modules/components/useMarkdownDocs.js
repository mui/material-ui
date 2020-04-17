import React from 'react';
import kebabCase from 'lodash/kebabCase';
import { rewriteUrlForNextExport } from 'next/dist/next-server/lib/router/rewrite-url-for-export';
import { useSelector } from 'react-redux';
import Demo from 'docs/src/modules/components/Demo';
import { getHeaders, getContents, demoRegexp } from 'docs/src/modules/utils/parseMarkdown';
import PageContext from 'docs/src/modules/components/PageContext';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';
import { LANGUAGES_IN_PROGRESS, SOURCE_CODE_ROOT_URL } from 'docs/src/modules/constants';

export default function useMarkdownDocs(options) {
  const {
    markdownLocation: locationProp,
    markdown: markdownProp,
    req,
    reqPrefix,
    reqSource,
  } = options;

  const userLanguage = useSelector((state) => state.options.userLanguage);
  let demos;
  let markdown = markdownProp;

  if (!markdown) {
    demos = {};
    const markdowns = {};
    req.keys().forEach((filename) => {
      if (filename.indexOf('.md') !== -1) {
        const match = filename.match(/-([a-z]{2})\.md$/);

        if (match && LANGUAGES_IN_PROGRESS.indexOf(match[1]) !== -1) {
          markdowns[match[1]] = req(filename);
        } else {
          markdowns.en = req(filename);
        }
      } else if (filename.indexOf('.tsx') !== -1) {
        const demoName = `${reqPrefix}/${filename.replace(/\.\//g, '').replace(/\.tsx/g, '.js')}`;

        demos[demoName] = {
          ...demos[demoName],
          tsx: req(filename).default,
          rawTS: reqSource(filename),
        };
      } else {
        const demoName = `${reqPrefix}/${filename.replace(/\.\//g, '')}`;

        demos[demoName] = {
          ...demos[demoName],
          js: req(filename).default,
          raw: reqSource(filename),
        };
      }
    });
    markdown = markdowns[userLanguage] || markdowns.en;
  }

  const contents = getContents(markdown);
  const headers = getHeaders(markdown);

  const { activePage } = React.useContext(PageContext);
  let location = locationProp || (activePage && activePage.pathname);
  const t = useSelector((state) => state.options.t);

  if (location && !locationProp) {
    const token = location.split('/');
    token.push(token[token.length - 1]);
    location = token.join('/');

    if (headers.filename) {
      location = headers.filename;
    } else {
      location = `/docs/src/pages${location}.md`;
    }
  }

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

  // eslint-disable-next-line no-underscore-dangle
  global.__MARKED_UNIQUE__ = {};

  const element = (
    <React.Fragment>
      <svg style={{ display: 'none' }} xmlns="http://www.w3.org/2000/svg">
        <symbol id="anchor-link-icon" viewBox="0 0 16 16">
          <path d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z" />
        </symbol>
      </svg>
      {contents.map((content, index) => {
        if (demos && demoRegexp.test(content)) {
          let demoOptions;
          try {
            demoOptions = JSON.parse(`{${content}}`);
          } catch (err) {
            console.error('JSON.parse fails with: ', `{${content}}`);
            console.error(err);
            return null;
          }

          const name = demoOptions.demo;
          if (!demos || !demos[name]) {
            const errorMessage = [
              `Missing demo: ${name}. You can use one of the following:`,
              Object.keys(demos),
            ].join('\n');

            if (userLanguage === 'en') {
              throw new Error(errorMessage);
            }

            if (process.env.NODE_ENV !== 'production') {
              console.error(errorMessage);
            }

            const warnIcon = (
              <span role="img" aria-label={t('emojiWarning')}>
                ⚠️
              </span>
            );
            return (
              <div key={content}>
                {/* eslint-disable-next-line material-ui/no-hardcoded-labels */}
                {warnIcon} Missing demo `{name}` {warnIcon}
              </div>
            );
          }

          return (
            <Demo
              key={`${content}${index}`}
              demo={demos[name]}
              demoOptions={demoOptions}
              githubLocation={`${SOURCE_CODE_ROOT_URL}/docs/src/${name}`}
            />
          );
        }

        return <MarkdownElement className="markdownElement" key={index} text={content} />;
      })}
    </React.Fragment>
  );

  return { contents, location, element, markdown };
}
