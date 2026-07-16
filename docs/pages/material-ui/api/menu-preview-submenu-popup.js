import * as React from 'react';
import { ApiPage } from '@mui/internal-core-docs/ApiPage';
import descriptions from 'docs/translations/api-docs/menu-preview-submenu-popup/menu-preview-submenu-popup.json';
import jsonPageContent from './menu-preview-submenu-popup.json';

export default function Page() {
  return <ApiPage descriptions={descriptions} pageContent={jsonPageContent} />;
}
