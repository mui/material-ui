import * as React from 'react';
import PropTypes from 'prop-types';
import path from 'path';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/system';
import { exactProp } from '@mui/utils';
import Box from '@mui/material/Box';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import ComponentApiContent from 'docs/src/modules/components/ComponentApiContent';
import HookApiContent from 'docs/src/modules/components/HookApiContent';
import { getTranslatedHeader as getHookTranslatedHeader } from 'docs/src/modules/components/HookApiPage';
import { getTranslatedHeader as getComponentTranslatedHeader } from 'docs/src/modules/components/ApiPage';
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
  const [activeTab, setActiveTabState] = React.useState(router.query.docsTab ?? '');

  const setActiveTab = (newValue) => {
    const value = newValue ?? '';
    setActiveTabState(newValue);
    router.push(`${router.pathname}/${newValue !== '' ? `?docsTab=${newValue}` : ''}`, undefined, {
      shallow: true,
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
    componentApiDescriptions,
    componentApiPageContent,
    hookApiDescriptions,
    hookApiPageContent,
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

  const {
    hookDescription,
    hookDescriptionToc = [],
    parametersDescriptions,
    returnValueDescriptions,
  } = hookApiDescriptions[userLanguage];

  function createHookTocEntry(sectionName) {
    return {
      text: getHookTranslatedHeader(t, sectionName),
      hash: sectionName,
      children: [],
    };
  }

  const hooksToc = [
    createHookTocEntry('import'),
    ...hookDescriptionToc,
    createHookTocEntry('parameters'),
    createHookTocEntry('return-value'),
  ].filter(Boolean);

  function createComponentTocEntry(sectionName) {
    return {
      text: getComponentTranslatedHeader(t, sectionName),
      hash: sectionName,
      children: [
        ...(sectionName === 'props' && componentApiPageContent.inheritance
          ? [{ text: t('api-docs.inheritance'), hash: 'inheritance', children: [] }]
          : []),
      ],
    };
  }

  const {
    componentDescription,
    componentDescriptionToc = [],
    classDescriptions,
    propDescriptions,
  } = componentApiDescriptions[userLanguage];

  const componentApiToc = [
    createComponentTocEntry('import'),
    ...componentDescriptionToc,
    componentApiPageContent.styles.name && createComponentTocEntry('component-name'),
    createComponentTocEntry('props'),
    componentApiPageContent.styles.classes.length > 0 && createComponentTocEntry('css'),
  ].filter(Boolean);

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
      toc={
        activeTab === 'hook-api'
          ? hooksToc
          : activeTab === 'component-api'
          ? componentApiToc
          : demosToc
      }
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
          <ComponentApiContent
            descriptions={componentApiDescriptions}
            pageContent={componentApiPageContent}
          />
        </Box>
        <Box {...(activeTab !== 'hook-api' && { sx: { display: 'none' }, 'aria-hidden': true })}>
          <HookApiContent descriptions={hookApiDescriptions} pageContent={hookApiPageContent} />
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
};

if (process.env.NODE_ENV !== 'production') {
  MarkdownDocs.propTypes = exactProp(MarkdownDocs.propTypes);
}
