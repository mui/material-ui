import * as React from 'react';
import TopLayoutCompany from 'docs/src/modules/components/TopLayoutCompany';
import {
  demos,
  docs,
  demoComponents,
} from 'docs/src/pages/careers/developer-experience-engineer.md?@mui/markdown';

export default function Page() {
  return <TopLayoutCompany demos={demos} docs={docs} demoComponents={demoComponents} />;
}
