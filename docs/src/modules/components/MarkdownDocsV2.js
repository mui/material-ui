import * as React from 'react';
import PropTypes from 'prop-types';
import path from 'path';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/system';
import { exactProp } from '@mui/utils';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import MarkdownElement from 'docs/src/modules/components/MarkdownElementV2';
import { pathnameToLanguage } from 'docs/src/modules/utils/helpers';
import AppLayoutDocs from 'docs/src/modules/components/AppLayoutDocs';
import { useTranslate, useUserLanguage } from 'docs/src/modules/utils/i18n';
import BrandingProvider from 'docs/src/BrandingProvider';
import Ad from 'docs/src/modules/components/Ad';
import AdGuest from 'docs/src/modules/components/AdGuest';
import DemosDocs from 'docs/src/modules/components/DemosDocs';

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
  const [activeTab, setActiveTab] = React.useState(router.query.docsTab ?? '');
  const { canonicalAs } = pathnameToLanguage(router.asPath);
  const {
    disableAd = false,
    disableToc = false,
    demos = {},
    docs,
    demoComponents,
    srcComponents,
  } = props;

  const userLanguage = useUserLanguage();
  const t = useTranslate();

  const localizedDoc = docs[userLanguage] || docs.en;
  const { description, location, rendered, title, toc } = localizedDoc;

  const isJoy = canonicalAs.startsWith('/joy-ui/');
  const Provider = isJoy ? CssVarsProvider : React.Fragment;
  const Wrapper = isJoy ? BrandingProvider : React.Fragment;

  const commonElements = [];

  let i = 0;
  let done = false;

  const wrapperProps = {
    ...(isJoy && { mode: theme.palette.mode }),
  };

  // process the elements before the tabs component
  while (i <= rendered.length && !done) {
    const renderedMarkdownOrDemo = rendered[i];
    if (renderedMarkdownOrDemo.component && renderedMarkdownOrDemo.component.indexOf('Tabs') >= 0) {
      done = true;
    }
    commonElements.push(
      <MarkdownElement
        srcComponents={srcComponents}
        renderedMarkdownOrDemo={renderedMarkdownOrDemo}
        WrapperComponent={Wrapper}
        key={`common-elements-${i}`}
        wrapperProps={wrapperProps}
        localizedDoc={localizedDoc}
        demos={demos}
        location={location}
        theme={theme}
        demoComponents={demoComponents}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        disableAd={disableAd}
      />,
    );
    i++;
  }

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
        {disableAd ? null : (
          <Wrapper key="add">
            <AdGuest>
              <Ad />
            </AdGuest>
          </Wrapper>
        )}
        {isJoy && <JoyModeObserver key="joy-provider" mode={theme.palette.mode} />}
        {commonElements}
        {activeTab === '' &&
          rendered
            .slice(i, rendered.length - 1)
            .map((renderedMarkdownOrDemo, index) => (
              <MarkdownElement
                key={`demos-section-${index}`}
                renderedMarkdownOrDemo={renderedMarkdownOrDemo}
                WrapperComponent={Wrapper}
                wrapperProps={wrapperProps}
                srcComponents={srcComponents}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                localizedDoc={localizedDoc}
                demos={demos}
                location={location}
                theme={theme}
                demoComponents={demoComponents}
                disableAd={disableAd}
              />
            ))}
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
  srcComponents: PropTypes.object,
};

if (process.env.NODE_ENV !== 'production') {
  MarkdownDocs.propTypes = exactProp(MarkdownDocs.propTypes);
}
