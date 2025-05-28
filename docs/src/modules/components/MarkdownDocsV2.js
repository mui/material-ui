import * as React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import kebabCase from 'lodash/kebabCase';
import { exactProp } from '@mui/utils';
import { Ad, AdGuest } from '@mui/docs/Ad';
import ComponentsApiContent from 'docs/src/modules/components/ComponentsApiContent';
import HooksApiContent from 'docs/src/modules/components/HooksApiContent';
import { getTranslatedHeader as getComponentTranslatedHeader } from 'docs/src/modules/components/ApiPage';
import RichMarkdownElement from 'docs/src/modules/components/RichMarkdownElement';
import { pathnameToLanguage } from 'docs/src/modules/utils/helpers';
import AppLayoutDocs from 'docs/src/modules/components/AppLayoutDocs';
import { useTranslate, useUserLanguage } from '@mui/docs/i18n';
import { HEIGHT as AppFrameHeight } from 'docs/src/modules/components/AppFrame';
import { HEIGHT as TabsHeight } from 'docs/src/modules/components/ComponentPageTabs';
import { getPropsToC } from 'docs/src/modules/components/ApiPage/sections/PropertiesSection';
import { getClassesToC } from 'docs/src/modules/components/ApiPage/sections/ClassesSection';
import GlobalStyles from '@mui/material/GlobalStyles';
import { DemoPageThemeProvider } from 'docs/src/theming';

function getHookTranslatedHeader(t, header) {
  const translations = {
    demos: t('api-docs.demos'),
    import: t('api-docs.import'),
    'hook-name': t('api-docs.hookName'),
    parameters: t('api-docs.parameters'),
    'return-value': t('api-docs.returnValue'),
  };

  // TODO Drop runtime type-checking once we type-check this file
  if (!translations.hasOwnProperty(header)) {
    throw new TypeError(
      `Unable to translate header '${header}'. Did you mean one of '${Object.keys(
        translations,
      ).join("', '")}'`,
    );
  }

  return translations[header] || header;
}

const isBrowser = typeof window !== 'undefined';

export default function MarkdownDocsV2(props) {
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
    enableOpenInNewTab = false,
  } = props;

  const userLanguage = useUserLanguage();
  const t = useTranslate();

  React.useEffect(() => {
    setActiveTab(router.query.docsTab ?? '');
  }, [router.query.docsTab]);

  const localizedDoc = docs[userLanguage] || docs.en;
  // Generate the TOC based on the tab
  const demosToc = localizedDoc.toc;

  function createHookTocEntry(hookName, sectionName, hookProps = {}) {
    const hookPropToc = [];
    Object.keys(hookProps).forEach((propName) => {
      hookPropToc.push({
        text: propName,
        hash: `${hookName}-${sectionName}-${propName}`,
        children: [],
      });
    });

    return {
      text: getHookTranslatedHeader(t, sectionName),
      hash: `${hookName}-${sectionName}`,
      children: hookPropToc,
    };
  }

  const hooksToc = [];
  if (hooksApiPageContents) {
    Object.keys(hooksApiPageContents).forEach((key) => {
      const { name: hookName, parameters = {}, returnValue = {} } = hooksApiPageContents[key];

      const hookNameKebabCase = kebabCase(hookName);

      const hookToc = [
        createHookTocEntry(hookNameKebabCase, 'import'),
        createHookTocEntry(hookNameKebabCase, 'parameters', parameters),
        createHookTocEntry(hookNameKebabCase, 'return-value', returnValue),
      ].filter(Boolean);

      hooksToc.push({
        text: hookName,
        hash: hookNameKebabCase,
        children: hookToc,
      });
    });
  }

  function createComponentTocEntry(
    componentName,
    sectionName,
    options = { inheritance: false, themeDefaultProps: false },
  ) {
    return {
      text: getComponentTranslatedHeader(t, sectionName),
      hash: `${componentName}-${sectionName}`,
      children: [
        ...(options.inheritance
          ? [{ text: t('api-docs.inheritance'), hash: 'inheritance', children: [] }]
          : []),
        ...(options.themeDefaultProps
          ? [{ text: t('api-docs.themeDefaultProps'), hash: 'theme-default-props', children: [] }]
          : []),
      ],
    };
  }

  const componentsApiToc = [];

  if (componentsApiPageContents) {
    Object.keys(componentsApiPageContents).forEach((key) => {
      const { componentDescriptionToc = [] } = componentsApiDescriptions[key][userLanguage];
      const {
        name: componentName,
        slots,
        inheritance,
        themeDefaultProps,
        classes,
        props: componentProps,
      } = componentsApiPageContents[key];
      const componentNameKebabCase = kebabCase(componentName);

      const componentApiToc = [
        createComponentTocEntry(componentNameKebabCase, 'import'),
        ...componentDescriptionToc,
        getPropsToC({
          t,
          componentName: componentNameKebabCase,
          componentProps,
          inheritance,
          themeDefaultProps,
          hash: `${componentNameKebabCase}-props`,
        }),
        slots?.length > 0 && createComponentTocEntry(componentNameKebabCase, 'slots'),
        ...getClassesToC({
          t,
          componentName: componentNameKebabCase,
          componentClasses: classes,
          hash: `${componentNameKebabCase}-classes`,
        }),
      ].filter(Boolean);

      componentsApiToc.push({
        text: componentName,
        hash: componentNameKebabCase,
        children: componentApiToc,
      });
    });
  }

  const commonElements = [];

  let i = 0;
  let done = false;

  // process the elements before the tabs component
  while (i < localizedDoc.rendered.length && !done) {
    const renderedMarkdownOrDemo = localizedDoc.rendered[i];
    if (renderedMarkdownOrDemo.component && renderedMarkdownOrDemo.component.includes('Tabs')) {
      done = true;
    }
    commonElements.push(
      <RichMarkdownElement
        key={`common-elements-${i}`}
        activeTab={activeTab}
        demoComponents={demoComponents}
        demos={demos}
        disableAd={disableAd}
        localizedDoc={localizedDoc}
        renderedMarkdownOrDemo={renderedMarkdownOrDemo}
        srcComponents={srcComponents}
        enableOpenInNewTab={enableOpenInNewTab}
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

  const hasTabs = localizedDoc.rendered.some((renderedMarkdownOrDemo) => {
    if (
      typeof renderedMarkdownOrDemo === 'object' &&
      renderedMarkdownOrDemo.component &&
      renderedMarkdownOrDemo.component === 'modules/components/ComponentPageTabs.js'
    ) {
      return true;
    }
    return false;
  });

  let scopedDemo = router.query.scopedDemo;

  if (scopedDemo === undefined && isBrowser) {
    // In production, the next router query params are `undefined` on the first render
    // Fall back to window.location to get query params ASAP
    scopedDemo = new URLSearchParams(window.location.search).get('scopedDemo');
  }

  if (scopedDemo) {
    if (isBrowser) {
      // Undo the document.body.style.visibility = 'hidden'; in _document.js
      document.body.style.visibility = 'initial';
    }
    const isJoy = canonicalAs.startsWith('/joy-ui/');
    return (
      <DemoPageThemeProvider hasJoy={isJoy}>
        <GlobalStyles />
        <div style={{ width: '100%', height: '100vh', padding: '4px' }}>
          <RichMarkdownElement
            activeTab={activeTab}
            demoComponents={demoComponents}
            demos={demos}
            disableAd={disableAd}
            localizedDoc={localizedDoc}
            srcComponents={srcComponents}
            renderedMarkdownOrDemo={{
              demo: scopedDemo,
              hideToolbar: true,
              bg: false,
            }}
          />
        </div>
      </DemoPageThemeProvider>
    );
  }

  return (
    <AppLayoutDocs
      cardOptions={{
        description: localizedDoc.headers.cardDescription,
        title: localizedDoc.headers.cardTitle,
      }}
      description={localizedDoc.description}
      disableAd={disableAd}
      disableToc={disableToc}
      location={localizedDoc.location}
      title={localizedDoc.title}
      toc={activeToc}
      disableLayout
      hasTabs={hasTabs}
    >
      <div
        style={{
          '--MuiDocs-header-height': hasTabs
            ? `${AppFrameHeight + TabsHeight}px`
            : `${AppFrameHeight}px`,
        }}
      >
        {disableAd ? null : (
          <AdGuest classSelector={hasTabs ? '.component-tabs' : undefined}>
            <Ad />
          </AdGuest>
        )}
        {commonElements}
        {activeTab === '' &&
          localizedDoc.rendered
            .slice(i)
            .map((renderedMarkdownOrDemo, index) => (
              <RichMarkdownElement
                key={`demos-section-${index}`}
                activeTab={activeTab}
                demoComponents={demoComponents}
                demos={demos}
                disableAd={disableAd}
                localizedDoc={localizedDoc}
                renderedMarkdownOrDemo={renderedMarkdownOrDemo}
                srcComponents={srcComponents}
                enableOpenInNewTab={enableOpenInNewTab}
              />
            ))}
        {activeTab === 'components-api' && (
          <ComponentsApiContent
            descriptions={componentsApiDescriptions}
            pageContents={componentsApiPageContents}
          />
        )}
        {activeTab === 'hooks-api' && (
          <HooksApiContent
            descriptions={hooksApiDescriptions}
            pagesContents={hooksApiPageContents}
          />
        )}
      </div>
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
  enableOpenInNewTab: PropTypes.bool,
  hooksApiDescriptions: PropTypes.object,
  hooksApiPageContents: PropTypes.object,
  srcComponents: PropTypes.object,
};

if (process.env.NODE_ENV !== 'production') {
  MarkdownDocsV2.propTypes = exactProp(MarkdownDocsV2.propTypes);
}
