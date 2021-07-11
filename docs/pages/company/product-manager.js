import * as React from 'react';
import TopLayoutCompany from 'docs/src/modules/components/TopLayoutCompany';
import {
  demos,
  docs,
  requireDemo,
} from 'docs/src/pages/company/careers/product-manager.md?@material-ui/markdown';

export default function Page() {
  return <TopLayoutCompany demos={demos} docs={docs} requireDemo={requireDemo} />;
}
