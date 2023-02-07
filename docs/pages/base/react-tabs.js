import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocsV2';
import * as pageProps from 'docs/data/base/components/tabs/tabs.md?@mui/markdown';
import mapApiPageTranslations from 'docs/src/modules/utils/mapApiPageTranslations';
import tabApiJsonPageContent from './api/tab-unstyled.json';
import tabsApiJsonPageContent from './api/tabs-unstyled.json';
import tabsListApiJsonPageContent from './api/tabs-list-unstyled.json';
import tabPanelApiJsonPageContent from './api/tab-panel-unstyled.json';
import useTabApiJsonPageContent from './api/use-tab.json';
import useTabsApiJsonPageContent from './api/use-tabs.json';
import useTabsListApiJsonPageContent from './api/use-tabs-list.json';
import useTabPanelApiJsonPageContent from './api/use-tab-panel.json';

export default function Page(props) {
  const { userLanguage, ...other } = props;
  return <MarkdownDocs {...pageProps} {...other} />;
}

Page.getInitialProps = () => {
  const tabApiReq = require.context(
    'docs/translations/api-docs/tab-unstyled',
    false,
    /tab-unstyled.*.json$/,
  );
  const tabApiDescriptions = mapApiPageTranslations(tabApiReq);

  const tabsApiReq = require.context(
    'docs/translations/api-docs/tabs-unstyled',
    false,
    /tabs-unstyled.*.json$/,
  );
  const tabsApiDescriptions = mapApiPageTranslations(tabsApiReq);

  const tabsListApiReq = require.context(
    'docs/translations/api-docs/tabs-list-unstyled',
    false,
    /tabs-list-unstyled.*.json$/,
  );
  const tabsListApiDescriptions = mapApiPageTranslations(tabsListApiReq);

  const tabPanelApiReq = require.context(
    'docs/translations/api-docs/tab-panel-unstyled',
    false,
    /tab-panel-unstyled.*.json$/,
  );
  const tabPanelApiDescriptions = mapApiPageTranslations(tabPanelApiReq);

  const useTabApiReq = require.context(
    'docs/translations/api-docs/use-tab',
    false,
    /use-tab.*.json$/,
  );
  const useTabApiDescriptions = mapApiPageTranslations(useTabApiReq);

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

  const useTabPanelApiReq = require.context(
    'docs/translations/api-docs/use-tab-panel',
    false,
    /use-tab-panel.*.json$/,
  );
  const useTabPanelApiDescriptions = mapApiPageTranslations(useTabPanelApiReq);

  return {
    componentsApiDescriptions: {
      tab: tabApiDescriptions,
      tabs: tabsApiDescriptions,
      tabsList: tabsListApiDescriptions,
      tabPanel: tabPanelApiDescriptions,
    },
    componentsApiPageContents: {
      tab: tabApiJsonPageContent,
      tabs: tabsApiJsonPageContent,
      tabsList: tabsListApiJsonPageContent,
      tabPanel: tabPanelApiJsonPageContent,
    },
    hooksApiDescriptions: {
      useTab: useTabApiDescriptions,
      useTabs: useTabsApiDescriptions,
      useTabPanel: useTabPanelApiDescriptions,
      useTabsList: useTabsListApiDescriptions,
    },
    hooksApiPageContents: {
      useTab: useTabApiJsonPageContent,
      useTabs: useTabsApiJsonPageContent,
      useTabsList: useTabsListApiJsonPageContent,
      useTabPanel: useTabPanelApiJsonPageContent,
    },
  };
};
