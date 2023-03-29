import * as React from 'react';
import PropTypes from 'prop-types';
import path from 'path';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/system';
import { exactProp } from '@mui/utils';
import { CssVarsProvider, useColorScheme, extendTheme, THEME_IDENTIFIER } from '@mui/joy/styles';
import Demo from 'docs/src/modules/components/Demo';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';
import { pathnameToLanguage } from 'docs/src/modules/utils/helpers';
import AppLayoutDocs from 'docs/src/modules/components/AppLayoutDocs';
import { useTranslate, useUserLanguage } from 'docs/src/modules/utils/i18n';
import Ad from 'docs/src/modules/components/Ad';
import AdGuest from 'docs/src/modules/components/AdGuest';

function noComponent(moduleID) {
  return function NoComponent() {
    throw new Error(`No demo component provided for '${moduleID}'`);
  };
}

function JoyModeObserver({ mode }) {
  const { setMode } = useColorScheme();
  React.useEffect(() => {
    setMode(mode);
  }, [mode, setMode]);
  return null;
}

JoyModeObserver.propTypes = {
  mode: PropTypes.oneOf(['light', 'dark']),
};

const joyTheme = extendTheme();

export default function MarkdownDocs(props) {
  const theme = useTheme();
  const router = useRouter();
  const { canonicalAs } = pathnameToLanguage(router.asPath);
  const {
    disableAd = false,
    disableToc = false,
    /**
     * Some Joy pages, e.g. Joy theme builder, should not be a nested CssVarsProvider to control its own state.
     * This config will skip the CssVarsProvider at the root of the page.
     */
    disableCssVarsProvider = false,
    demos = {},
    docs,
    demoComponents,
    srcComponents,
  } = props;

  const userLanguage = useUserLanguage();
  const t = useTranslate();

  const localizedDoc = docs[userLanguage] || docs.en;
  const { description, location, rendered, title, toc } = localizedDoc;

  const isJoy = canonicalAs.startsWith('/joy-ui/') && !disableCssVarsProvider;
  const Provider = isJoy ? CssVarsProvider : React.Fragment;

  return (
    <Provider {...(isJoy && { theme: { [THEME_IDENTIFIER]: joyTheme } })}>
      <AppLayoutDocs
        description={description}
        disableAd={disableAd}
        disableToc={disableToc}
        location={location}
        title={title}
        toc={toc}
      >
        {disableAd ? null : (
          <AdGuest>
            <Ad />
          </AdGuest>
        )}
        {isJoy && <JoyModeObserver mode={theme.palette.mode} />}
        {rendered.map((renderedMarkdownOrDemo, index) => {
          if (typeof renderedMarkdownOrDemo === 'string') {
            return <MarkdownElement key={index} renderedMarkdown={renderedMarkdownOrDemo} />;
          }

          if (renderedMarkdownOrDemo.component) {
            const name = renderedMarkdownOrDemo.component;
            const Component = srcComponents?.[name];

            if (Component === undefined) {
              throw new Error(`No component found at the path ${path.join('docs/src', name)}`);
            }

            return <Component key={index} {...renderedMarkdownOrDemo} markdown={localizedDoc} />;
          }

          const name = renderedMarkdownOrDemo.demo;
          const demo = demos?.[name];
          if (demo === undefined) {
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
              <div key={index}>
                {/* eslint-disable-next-line material-ui/no-hardcoded-labels */}
                {warnIcon} Missing demo `{name}` {warnIcon}
              </div>
            );
          }

          const splitLocationBySlash = location.split('/');
          splitLocationBySlash.pop();
          const fileNameWithLocation = `${splitLocationBySlash.join('/')}/${name}`;

          return (
            <Demo
              key={index}
              demo={{
                raw: demo.raw,
                js: demoComponents[demo.module] ?? noComponent(demo.module),
                scope: demos.scope,
                jsxPreview: demo.jsxPreview,
                rawTS: demo.rawTS,
                tsx: demoComponents[demo.moduleTS] ?? null,
                gaLabel: fileNameWithLocation.replace(/^\/docs\/data\//, ''),
              }}
              disableAd={disableAd}
              demoOptions={renderedMarkdownOrDemo}
              githubLocation={`${process.env.SOURCE_CODE_REPO}/blob/v${process.env.LIB_VERSION}${fileNameWithLocation}`}
            />
          );
        })}
      </AppLayoutDocs>
    </Provider>
  );
}

MarkdownDocs.propTypes = {
  demoComponents: PropTypes.object,
  demos: PropTypes.object,
  disableAd: PropTypes.bool,
  disableCssVarsProvider: PropTypes.bool,
  disableToc: PropTypes.bool,
  docs: PropTypes.object.isRequired,
  srcComponents: PropTypes.object,
};

if (process.env.NODE_ENV !== 'production') {
  MarkdownDocs.propTypes = exactProp(MarkdownDocs.propTypes);
}
