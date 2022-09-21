import * as React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/system';
import Demo from 'docs/src/modules/components/Demo';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';
import { exactProp } from '@mui/utils';
import ComponentLinkHeader from 'docs/src/modules/components/ComponentLinkHeader';
import AppLayoutDocs from 'docs/src/modules/components/AppLayoutDocs';
import { useTranslate, useUserLanguage } from 'docs/src/modules/utils/i18n';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import BrandingProvider from 'docs/src/BrandingProvider';

// TODO: Only import on demand via @mui/markdown/loader
const markdownComponents = {
  'modules/components/ComponentLinkHeader.js': ComponentLinkHeader,
};

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

export default function MarkdownDocs(props) {
  const theme = useTheme();
  const router = useRouter();
  const asPathWithoutLang = router.asPath.replace(/^\/[a-zA-Z]{2}\//, '/');
  const { disableAd = false, disableToc = false, demos = {}, docs, demoComponents } = props;

  const userLanguage = useUserLanguage();
  const t = useTranslate();

  const { description, location, rendered, title, toc, headers } = docs[userLanguage] || docs.en;

  const isJoy = asPathWithoutLang.startsWith('/joy-ui');
  const Provider = isJoy ? CssVarsProvider : React.Fragment;
  const Wrapper = isJoy ? BrandingProvider : React.Fragment;

  return (
    <AppLayoutDocs
      description={description}
      disableAd={disableAd}
      disableToc={disableToc}
      location={location}
      title={title}
      toc={toc}
    >
      <Provider>
        {isJoy && <JoyModeObserver mode={theme.palette.mode} />}
        {rendered.map((renderedMarkdownOrDemo, index) => {
          if (typeof renderedMarkdownOrDemo === 'string') {
            return (
              <Wrapper key={index} {...(isJoy && { mode: theme.palette.mode })}>
                <MarkdownElement renderedMarkdown={renderedMarkdownOrDemo} />
              </Wrapper>
            );
          }

          if (renderedMarkdownOrDemo.component) {
            const Component = markdownComponents[renderedMarkdownOrDemo.component];
            return (
              <Wrapper key={index} {...(isJoy && { mode: theme.palette.mode })}>
                <Component headers={headers} options={renderedMarkdownOrDemo} />
              </Wrapper>
            );
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
              mode={theme.palette.mode}
              demo={{
                raw: demo.raw,
                js: demoComponents[demo.module] ?? noComponent(demo.module),
                jsxPreview: demo.jsxPreview,
                rawTS: demo.rawTS,
                tsx: demo.moduleTS ? demoComponents[demo.moduleTS] : null,
              }}
              disableAd={disableAd}
              demoOptions={renderedMarkdownOrDemo}
              githubLocation={`${process.env.SOURCE_CODE_REPO}/blob/v${process.env.LIB_VERSION}${fileNameWithLocation}`}
            />
          );
        })}
      </Provider>
    </AppLayoutDocs>
  );
}

MarkdownDocs.propTypes = {
  demoComponents: PropTypes.object,
  demos: PropTypes.object,
  disableAd: PropTypes.bool,
  disableToc: PropTypes.bool,
  docs: PropTypes.object.isRequired,
};

if (process.env.NODE_ENV !== 'production') {
  MarkdownDocs.propTypes = exactProp(MarkdownDocs.propTypes);
}
