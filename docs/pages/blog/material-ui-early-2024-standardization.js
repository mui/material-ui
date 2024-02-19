import * as React from 'react';
import TopLayoutBlog from 'docs/src/modules/components/TopLayoutBlog';
import { docs } from './material-ui-early-2024-standardization.md?@mui/markdown';

export default function Page() {
  return <TopLayoutBlog docs={docs} />;
}
