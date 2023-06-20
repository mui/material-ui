import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocsV2';
import AppFrame from 'docs/src/modules/components/AppFrame';
import * as pageProps from 'docs/data/base/components/menu/menu.md?@mui/markdown';
import mapApiPageTranslations from 'docs/src/modules/utils/mapApiPageTranslations';
import DropdownMenuApiJsonPageContent from '../../api/dropdown-menu.json';
import MenuApiJsonPageContent from '../../api/menu.json';
import MenuButtonApiJsonPageContent from '../../api/menu-button.json';
import MenuItemApiJsonPageContent from '../../api/menu-item.json';
import useMenuApiJsonPageContent from '../../api/use-menu.json';
import useMenuItemApiJsonPageContent from '../../api/use-menu-item.json';

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
  const DropdownMenuApiReq = require.context(
    'docs/translations/api-docs-base/dropdown-menu',
    false,
    /dropdown-menu.*.json$/,
  );
  const DropdownMenuApiDescriptions = mapApiPageTranslations(DropdownMenuApiReq);

  const MenuApiReq = require.context('docs/translations/api-docs-base/menu', false, /menu.*.json$/);
  const MenuApiDescriptions = mapApiPageTranslations(MenuApiReq);

  const MenuButtonApiReq = require.context(
    'docs/translations/api-docs-base/menu-button',
    false,
    /menu-button.*.json$/,
  );
  const MenuButtonApiDescriptions = mapApiPageTranslations(MenuButtonApiReq);

  const MenuItemApiReq = require.context(
    'docs/translations/api-docs-base/menu-item',
    false,
    /menu-item.*.json$/,
  );
  const MenuItemApiDescriptions = mapApiPageTranslations(MenuItemApiReq);

  const useMenuApiReq = require.context(
    'docs/translations/api-docs/use-menu',
    false,
    /use-menu.*.json$/,
  );
  const useMenuApiDescriptions = mapApiPageTranslations(useMenuApiReq);

  const useMenuItemApiReq = require.context(
    'docs/translations/api-docs/use-menu-item',
    false,
    /use-menu-item.*.json$/,
  );
  const useMenuItemApiDescriptions = mapApiPageTranslations(useMenuItemApiReq);

  return {
    props: {
      componentsApiDescriptions: {
        DropdownMenu: DropdownMenuApiDescriptions,
        Menu: MenuApiDescriptions,
        MenuButton: MenuButtonApiDescriptions,
        MenuItem: MenuItemApiDescriptions,
      },
      componentsApiPageContents: {
        DropdownMenu: DropdownMenuApiJsonPageContent,
        Menu: MenuApiJsonPageContent,
        MenuButton: MenuButtonApiJsonPageContent,
        MenuItem: MenuItemApiJsonPageContent,
      },
      hooksApiDescriptions: {
        useMenu: useMenuApiDescriptions,
        useMenuItem: useMenuItemApiDescriptions,
      },
      hooksApiPageContents: {
        useMenu: useMenuApiJsonPageContent,
        useMenuItem: useMenuItemApiJsonPageContent,
      },
    },
  };
};
