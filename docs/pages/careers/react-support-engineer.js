import * as React from 'react';
import TopLayoutCareers from 'docs/src/modules/components/TopLayoutCareers';
import {
  demos,
  docs,
  demoComponents,
} from 'docs/src/pages/careers/react-support-engineer.md?@mui/markdown';

export default function Page() {
  return <TopLayoutCareers demos={demos} docs={docs} demoComponents={demoComponents} />;
}
