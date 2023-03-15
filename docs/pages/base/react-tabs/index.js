import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocsV2';
import AppFrame from 'docs/src/modules/components/AppFrame';
import * as pageProps from 'docs/data/base/components/tabs/tabs.md?@mui/markdown';
import mapApiPageTranslations from 'docs/src/modules/utils/mapApiPageTranslations';
import TabPanelUnstyledApiJsonPageContent from '../api/tab-panel-unstyled.json';
import TabUnstyledApiJsonPageContent from '../api/tab-unstyled.json';
import TabsListUnstyledApiJsonPageContent from '../api/tabs-list-unstyled.json';
import TabsUnstyledApiJsonPageContent from '../api/tabs-unstyled.json';
import useTabApiJsonPageContent from '../api/use-tab.json';
import useTabPanelApiJsonPageContent from '../api/use-tab-panel.json';
import useTabsApiJsonPageContent from '../api/use-tabs.json';
import useTabsListApiJsonPageContent from '../api/use-tabs-list.json';

export default function Page(props) {
  const { userLanguage, ...other } = props;
  return <MarkdownDocs {...pageProps} {...other} />;
}

Page.getLayout = (page) => {
  return <AppFrame>{page}</AppFrame>;
};

Page.getInitialProps = () => {
  const TabPanelUnstyledApiReq = require.context(
    'docs/translations/api-docs/tab-panel-unstyled',
    false,
    /tab-panel-unstyled.*.json$/,
  );
  const TabPanelUnstyledApiDescriptions = mapApiPageTranslations(TabPanelUnstyledApiReq);

  const TabUnstyledApiReq = require.context(
    'docs/translations/api-docs/tab-unstyled',
    false,
    /tab-unstyled.*.json$/,
  );
  const TabUnstyledApiDescriptions = mapApiPageTranslations(TabUnstyledApiReq);

  const TabsListUnstyledApiReq = require.context(
    'docs/translations/api-docs/tabs-list-unstyled',
    false,
    /tabs-list-unstyled.*.json$/,
  );
  const TabsListUnstyledApiDescriptions = mapApiPageTranslations(TabsListUnstyledApiReq);

  const TabsUnstyledApiReq = require.context(
    'docs/translations/api-docs/tabs-unstyled',
    false,
    /tabs-unstyled.*.json$/,
  );
  const TabsUnstyledApiDescriptions = mapApiPageTranslations(TabsUnstyledApiReq);

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
    componentsApiDescriptions: {
      TabPanelUnstyled: TabPanelUnstyledApiDescriptions,
      TabUnstyled: TabUnstyledApiDescriptions,
      TabsListUnstyled: TabsListUnstyledApiDescriptions,
      TabsUnstyled: TabsUnstyledApiDescriptions,
    },
    componentsApiPageContents: {
      TabPanelUnstyled: TabPanelUnstyledApiJsonPageContent,
      TabUnstyled: TabUnstyledApiJsonPageContent,
      TabsListUnstyled: TabsListUnstyledApiJsonPageContent,
      TabsUnstyled: TabsUnstyledApiJsonPageContent,
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
  };
};
