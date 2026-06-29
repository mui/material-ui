import * as React from 'react';
import { ApiPage } from '@mui/internal-core-docs/ApiPage';
import descriptions from 'docs/translations/api-docs/menu-preview-radio-item-indicator/menu-preview-radio-item-indicator.json';
import jsonPageContent from './menu-preview-radio-item-indicator.json';

export default function Page() {
  return <ApiPage descriptions={descriptions} pageContent={jsonPageContent} />;
}
