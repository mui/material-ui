import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocsV2';
import AppFrame from 'docs/src/modules/components/AppFrame';
import * as pageProps from 'docs/data/base/components/menu/menu.md?muiMarkdown';
import mapApiPageTranslations from 'docs/src/modules/utils/mapApiPageTranslations';
import DropdownApiJsonPageContent from '../../api/dropdown.json';
import MenuApiJsonPageContent from '../../api/menu.json';
import MenuButtonApiJsonPageContent from '../../api/menu-button.json';
import MenuItemApiJsonPageContent from '../../api/menu-item.json';
import useDropdownApiJsonPageContent from '../../api/use-dropdown.json';
import useMenuApiJsonPageContent from '../../api/use-menu.json';
import useMenuButtonApiJsonPageContent from '../../api/use-menu-button.json';
import useMenuItemApiJsonPageContent from '../../api/use-menu-item.json';
import useMenuItemContextStabilizerApiJsonPageContent from '../../api/use-menu-item-context-stabilizer.json';

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
  const DropdownApiReq = require.context(
    'docs/translations/api-docs-base/dropdown',
    false,
    /dropdown.*.json$/,
  );
  const DropdownApiDescriptions = mapApiPageTranslations(DropdownApiReq);

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

  const useDropdownApiReq = require.context(
    'docs/translations/api-docs/use-dropdown',
    false,
    /use-dropdown.*.json$/,
  );
  const useDropdownApiDescriptions = mapApiPageTranslations(useDropdownApiReq);

  const useMenuApiReq = require.context(
    'docs/translations/api-docs/use-menu',
    false,
    /use-menu.*.json$/,
  );
  const useMenuApiDescriptions = mapApiPageTranslations(useMenuApiReq);

  const useMenuButtonApiReq = require.context(
    'docs/translations/api-docs/use-menu-button',
    false,
    /use-menu-button.*.json$/,
  );
  const useMenuButtonApiDescriptions = mapApiPageTranslations(useMenuButtonApiReq);

  const useMenuItemApiReq = require.context(
    'docs/translations/api-docs/use-menu-item',
    false,
    /use-menu-item.*.json$/,
  );
  const useMenuItemApiDescriptions = mapApiPageTranslations(useMenuItemApiReq);

  const useMenuItemContextStabilizerApiReq = require.context(
    'docs/translations/api-docs/use-menu-item-context-stabilizer',
    false,
    /use-menu-item-context-stabilizer.*.json$/,
  );
  const useMenuItemContextStabilizerApiDescriptions = mapApiPageTranslations(
    useMenuItemContextStabilizerApiReq,
  );

  return {
    props: {
      componentsApiDescriptions: {
        Dropdown: DropdownApiDescriptions,
        Menu: MenuApiDescriptions,
        MenuButton: MenuButtonApiDescriptions,
        MenuItem: MenuItemApiDescriptions,
      },
      componentsApiPageContents: {
        Dropdown: DropdownApiJsonPageContent,
        Menu: MenuApiJsonPageContent,
        MenuButton: MenuButtonApiJsonPageContent,
        MenuItem: MenuItemApiJsonPageContent,
      },
      hooksApiDescriptions: {
        useDropdown: useDropdownApiDescriptions,
        useMenu: useMenuApiDescriptions,
        useMenuButton: useMenuButtonApiDescriptions,
        useMenuItem: useMenuItemApiDescriptions,
        useMenuItemContextStabilizer: useMenuItemContextStabilizerApiDescriptions,
      },
      hooksApiPageContents: {
        useDropdown: useDropdownApiJsonPageContent,
        useMenu: useMenuApiJsonPageContent,
        useMenuButton: useMenuButtonApiJsonPageContent,
        useMenuItem: useMenuItemApiJsonPageContent,
        useMenuItemContextStabilizer: useMenuItemContextStabilizerApiJsonPageContent,
      },
    },
  };
};
