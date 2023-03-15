import * as React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import kebabCase from 'lodash/kebabCase';
import { useTheme } from '@mui/system';
import { exactProp } from '@mui/utils';
import Box from '@mui/material/Box';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import ComponentsApiContent from 'docs/src/modules/components/ComponentsApiContent';
import HooksApiContent from 'docs/src/modules/components/HooksApiContent';
import { getTranslatedHeader as getHookTranslatedHeader } from 'docs/src/modules/components/HookApiPage';
import { getTranslatedHeader as getComponentTranslatedHeader } from 'docs/src/modules/components/ApiPage';
import MarkdownElement from 'docs/src/modules/components/MarkdownElementV2';
import { pathnameToLanguage } from 'docs/src/modules/utils/helpers';
import AppLayoutDocs from 'docs/src/modules/components/AppLayoutDocsWithoutAppFrame';
import { useTranslate, useUserLanguage } from 'docs/src/modules/utils/i18n';
import BrandingProvider from 'docs/src/BrandingProvider';
import Ad from 'docs/src/modules/components/Ad';
import AdGuest from 'docs/src/modules/components/AdGuest';

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

export default function MarkdownDocsV2(props) {
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

  function createHookTocEntry(hookName, sectionName) {
    return {
      text: getHookTranslatedHeader(t, sectionName),
      hash: `${hookName}-${sectionName}`,
      children: [],
    };
  }

  const hooksToc = [];
  Object.keys(hooksApiPageContents).forEach((key) => {
    const { hookDescriptionToc = [] } = hooksApiDescriptions[key][userLanguage];
    const { name: hookName } = hooksApiPageContents[key];

    const hookNameKebabCase = kebabCase(hookName);

    const hookToc = [
      createHookTocEntry(hookNameKebabCase, 'import'),
      ...hookDescriptionToc,
      createHookTocEntry(hookNameKebabCase, 'parameters'),
      createHookTocEntry(hookNameKebabCase, 'return-value'),
    ].filter(Boolean);

    hooksToc.push({
      text: hookName,
      hash: hookNameKebabCase,
      children: hookToc,
    });
  });

  function createComponentTocEntry(componentName, sectionName, hasInheritance = false) {
    return {
      text: getComponentTranslatedHeader(t, sectionName),
      hash: `${componentName}-${sectionName}`,
      children: [
        ...(hasInheritance
          ? [{ text: t('api-docs.inheritance'), hash: 'inheritance', children: [] }]
          : []),
      ],
    };
  }

  const componentsApiToc = [];

  Object.keys(componentsApiPageContents).forEach((key) => {
    const { componentDescriptionToc = [] } = componentsApiDescriptions[key][userLanguage];

    const { name: componentName } = componentsApiPageContents[key];

    const componentNameKebabCase = kebabCase(componentName);

    const componentApiToc = [
      createComponentTocEntry(componentNameKebabCase, 'import'),
      ...componentDescriptionToc,
      componentsApiPageContents[key].styles.name &&
        createComponentTocEntry(componentNameKebabCase, 'component-name'),
      createComponentTocEntry(
        componentNameKebabCase,
        'props',
        componentsApiPageContents[key].inheritance,
      ),
      componentsApiPageContents[key].styles.classes.length > 0 &&
        createComponentTocEntry(componentNameKebabCase, 'css'),
    ].filter(Boolean);

    componentsApiToc.push({
      text: componentName,
      hash: componentNameKebabCase,
      children: componentApiToc,
    });
  });

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
  while (i < rendered.length && !done) {
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
        disableAd={disableAd}
      />,
    );
    i += 1;
  }

  let activeToc = demosToc;

  if (activeTab === 'hooks-api') {
    activeToc = hooksToc;
  }

  if (activeTab === 'components-api') {
    activeToc = componentsApiToc;
  }

  return (
    <AppLayoutDocs
      description={description}
      disableAd={disableAd}
      disableToc={disableToc}
      location={location}
      title={title}
      toc={activeToc}
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
          {...(activeTab !== 'components-api' && { sx: { display: 'none' }, 'aria-hidden': true })}
        >
          <ComponentsApiContent
            descriptions={componentsApiDescriptions}
            pageContents={componentsApiPageContents}
          />
        </Box>
        <Box {...(activeTab !== 'hooks-api' && { sx: { display: 'none' }, 'aria-hidden': true })}>
          <HooksApiContent
            descriptions={hooksApiDescriptions}
            pagesContents={hooksApiPageContents}
          />
        </Box>
      </Provider>
    </AppLayoutDocs>
  );
}

MarkdownDocsV2.propTypes = {
  componentsApiDescriptions: PropTypes.object,
  componentsApiPageContents: PropTypes.object,
  demoComponents: PropTypes.object,
  demos: PropTypes.object,
  disableAd: PropTypes.bool,
  disableToc: PropTypes.bool,
  docs: PropTypes.object.isRequired,
  hooksApiDescriptions: PropTypes.object,
  hooksApiPageContents: PropTypes.object,
  srcComponents: PropTypes.object,
};

if (process.env.NODE_ENV !== 'production') {
  MarkdownDocsV2.propTypes = exactProp(MarkdownDocsV2.propTypes);
}
