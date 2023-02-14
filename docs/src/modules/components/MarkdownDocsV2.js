import * as React from 'react';
import PropTypes from 'prop-types';
import path from 'path';
import { useRouter } from 'next/router';
import kebabCase from 'lodash/kebabCase';
import upperFirst from 'lodash/upperFirst';
import { useTheme } from '@mui/system';
import { exactProp } from '@mui/utils';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import { getTranslatedHeader as getHookTranslatedHeader } from 'docs/src/modules/components/HookApiPage';
import { getTranslatedHeader as getComponentTranslatedHeader } from 'docs/src/modules/components/ApiPage';
import MarkdownElement from 'docs/src/modules/components/MarkdownElementV2';
import Link from 'docs/src/modules/components/Link';
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

const ApiLink = styled(Link)(({ theme }) =>
  theme.unstable_sx({
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.primaryDark[700] : theme.palette.primary[50],
    fontWeight: 300,
    fontSize: 12,
    borderRadius: '6px',
    lineHeight: 1.5,
    fontFamily: 'Menlo,Consolas,"Droid Sans Mono",monospace',
    fontWeight: 400,
    px: 0.5,
    mt: 1,
  }),
);

export default function MarkdownDocs(props) {
  const theme = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTabState] = React.useState(router.query.docsTab ?? '');

  let hash;
  if (router.asPath.indexOf('#') >= 0) {
    hash = router.asPath.split('#')[1];
  }
  const setActiveTab = (newValue) => {
    const value = newValue ?? '';
    setActiveTabState(newValue);
    router
      .push(
        `${router.pathname}/${newValue !== '' ? `?docsTab=${newValue}` : ''}${
          hash ? `#${hash}` : ''
        }`,
        undefined,
        {
          shallow: true,
        },
      )
      .catch((e) => {
        // workaround for https://github.com/vercel/next.js/issues/37362
        if (!e.cancelled) {
          throw e;
        }
      });
  };

  const { canonicalAs } = pathnameToLanguage(router.asPath);
  const {
    disableAd = false,
    disableToc = false,
    demos = {},
    docs,
    demoComponents,
    srcComponents,
    componentsApiDescriptions,
    componentsApiPageContents,
    hooksApiDescriptions,
    hooksApiPageContents,
  } = props;

  const userLanguage = useUserLanguage();
  const t = useTranslate();

  React.useEffect(() => {
    setActiveTab(router.query.docsTab ?? '');
  }, [router.query.docsTab]);

  const localizedDoc = docs[userLanguage] || docs.en;
  // Generate the TOC based on the tab
  const { description, location, rendered, title, toc } = localizedDoc;
  const demosToc = toc.filter((item) => item.text !== 'API');

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
      toc={activeTab === 'hook-api' || activeTab === 'component-api' ? [] : demosToc}
      hasTabs
    >
      <Provider>
        {isJoy && <JoyModeObserver key="joy-provider" mode={theme.palette.mode} />}
        {disableAd ? null : (
          <Wrapper key="add">
            <AdGuest classSelector=".component-tabs">
              <Ad />
            </AdGuest>
          </Wrapper>
        )}
        {commonElements}
        <Box {...(activeTab !== '' && { sx: { display: 'none' }, 'aria-hidden': true })}>
          {rendered.slice(i, rendered.length - 1).map((renderedMarkdownOrDemo, index) => (
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
        </Box>
        <Box
          {...(activeTab !== 'component-api' && { sx: { display: 'none' }, 'aria-hidden': true })}
        >
          <Box component="ul" sx={{ mt: 5 }}>
            {Object.keys(componentsApiPageContents).map((component) => {
              const product = router.pathname.split('/')[1];
              const displayNameLink = upperFirst(component);
              return (
                <li>
                  <ApiLink href={`/${product}/api/${kebabCase(component)}-unstyled`}>
                    <code>
                      {'<'}
                      {displayNameLink}
                      {' />'}
                    </code>
                  </ApiLink>
                </li>
              );
            })}
          </Box>
        </Box>
        <Box {...(activeTab !== 'hook-api' && { sx: { display: 'none' }, 'aria-hidden': true })}>
          <Box component="ul" sx={{ mt: 5 }}>
            {Object.keys(hooksApiPageContents).map((hook) => {
              const product = router.pathname.split('/')[1];
              return (
                <li>
                  <ApiLink href={`/${product}/api/${kebabCase(hook)}`}>
                    <code>{hook}</code>
                  </ApiLink>
                </li>
              );
            })}
          </Box>
        </Box>
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
  componentsApiDescriptions: PropTypes.object,
  componentsApiPageContents: PropTypes.object,
  hooksApiDescriptions: PropTypes.object,
  hooksApiPageContents: PropTypes.object,
};

if (process.env.NODE_ENV !== 'production') {
  MarkdownDocs.propTypes = exactProp(MarkdownDocs.propTypes);
}
