import * as React from 'react';
import TopLayoutCareers from 'docs/src/modules/components/TopLayoutCareers';
import {
  demos,
  docs,
  demoComponents,
} from 'docs/src/pages/company/contact/contact.md?@mui/markdown';

export default function Page() {
  return <TopLayoutCareers demos={demos} docs={docs} demoComponents={demoComponents} />;
}
