import * as React from 'react';
import { ApiPage } from '@mui/internal-core-docs/ApiPage';
import descriptions from 'docs/translations/api-docs/menu-preview-checkbox-item-indicator/menu-preview-checkbox-item-indicator.json';
import jsonPageContent from './menu-preview-checkbox-item-indicator.json';

export default function Page() {
  return <ApiPage descriptions={descriptions} pageContent={jsonPageContent} />;
}
