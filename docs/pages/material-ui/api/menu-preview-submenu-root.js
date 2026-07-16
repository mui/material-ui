import * as React from 'react';
import { ApiPage } from '@mui/internal-core-docs/ApiPage';
import descriptions from 'docs/translations/api-docs/menu-preview-submenu-root/menu-preview-submenu-root.json';
import jsonPageContent from './menu-preview-submenu-root.json';

export default function Page() {
  return <ApiPage descriptions={descriptions} pageContent={jsonPageContent} />;
}
