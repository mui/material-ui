import * as React from 'react';
import TopLayoutBlog from 'docs/src/modules/components/TopLayoutBlog';
import { docs } from './base-ui-2024-plans.md?@mui/markdown';

export default function Page() {
  return <TopLayoutBlog {...docs} />;
}
