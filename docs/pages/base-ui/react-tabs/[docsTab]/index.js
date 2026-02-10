import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocsV2';
import AppFrame from 'docs/src/modules/components/AppFrame';
import * as pageProps from 'docs/data/base/components/tabs/tabs.md?muiMarkdown';
import mapApiPageTranslations from 'docs/src/modules/utils/mapApiPageTranslations';
import TabApiJsonPageContent from '../../api/tab.json';
import TabPanelApiJsonPageContent from '../../api/tab-panel.json';
import TabsApiJsonPageContent from '../../api/tabs.json';
import TabsListApiJsonPageContent from '../../api/tabs-list.json';
import useTabApiJsonPageContent from '../../api/use-tab.json';
import useTabPanelApiJsonPageContent from '../../api/use-tab-panel.json';
import useTabsApiJsonPageContent from '../../api/use-tabs.json';
import useTabsListApiJsonPageContent from '../../api/use-tabs-list.json';

export default function Page(props) {
  const { userLanguage, ...other } = props;
  return <MarkdownDocs {...pageProps} {...other} />;
}

Page.getLayout = (page) => {
  return <AppFrame>{page}</AppFrame>;
};

export const getStaticPaths = () => {
  return {
    paths: [{ params: { docsTab: 'components-api' } }, { params: { docsTab: 'hooks-api' } }],
    fallback: false, // can also be true or 'blocking'
  };
};

export const getStaticProps = () => {
  const TabApiReq = require.context('docs/translations/api-docs-base/tab', false, /tab.*.json$/);
  const TabApiDescriptions = mapApiPageTranslations(TabApiReq);

  const TabPanelApiReq = require.context(
    'docs/translations/api-docs-base/tab-panel',
    false,
    /tab-panel.*.json$/,
  );
  const TabPanelApiDescriptions = mapApiPageTranslations(TabPanelApiReq);

  const TabsApiReq = require.context('docs/translations/api-docs-base/tabs', false, /tabs.*.json$/);
  const TabsApiDescriptions = mapApiPageTranslations(TabsApiReq);

  const TabsListApiReq = require.context(
    'docs/translations/api-docs-base/tabs-list',
    false,
    /tabs-list.*.json$/,
  );
  const TabsListApiDescriptions = mapApiPageTranslations(TabsListApiReq);

  const useTabApiReq = require.context(
    'docs/translations/api-docs/use-tab',
    false,
    /use-tab.*.json$/,
  );
  const useTabApiDescriptions = mapApiPageTranslations(useTabApiReq);

  const useTabPanelApiReq = require.context(
    'docs/translations/api-docs/use-tab-panel',
    false,
    /use-tab-panel.*.json$/,
  );
  const useTabPanelApiDescriptions = mapApiPageTranslations(useTabPanelApiReq);

  const useTabsApiReq = require.context(
    'docs/translations/api-docs/use-tabs',
    false,
    /use-tabs.*.json$/,
  );
  const useTabsApiDescriptions = mapApiPageTranslations(useTabsApiReq);

  const useTabsListApiReq = require.context(
    'docs/translations/api-docs/use-tabs-list',
    false,
    /use-tabs-list.*.json$/,
  );
  const useTabsListApiDescriptions = mapApiPageTranslations(useTabsListApiReq);

  return {
    props: {
      componentsApiDescriptions: {
        Tab: TabApiDescriptions,
        TabPanel: TabPanelApiDescriptions,
        Tabs: TabsApiDescriptions,
        TabsList: TabsListApiDescriptions,
      },
      componentsApiPageContents: {
        Tab: TabApiJsonPageContent,
        TabPanel: TabPanelApiJsonPageContent,
        Tabs: TabsApiJsonPageContent,
        TabsList: TabsListApiJsonPageContent,
      },
      hooksApiDescriptions: {
        useTab: useTabApiDescriptions,
        useTabPanel: useTabPanelApiDescriptions,
        useTabs: useTabsApiDescriptions,
        useTabsList: useTabsListApiDescriptions,
      },
      hooksApiPageContents: {
        useTab: useTabApiJsonPageContent,
        useTabPanel: useTabPanelApiJsonPageContent,
        useTabs: useTabsApiJsonPageContent,
        useTabsList: useTabsListApiJsonPageContent,
      },
    },
  };
};
