import * as React from 'react';
import TopLayoutBlog from 'docs/src/modules/components/TopLayoutBlog';
import { docs } from './2024-material-ui-v6-deprecations.md?@mui/markdown';

export default function Page() {
  return <TopLayoutBlog docs={docs} />;
}
