import * as React from 'react';
import TopLayoutBlog from 'docs/src/modules/components/TopLayoutBlog';
import { docs } from './supporting-callback-in-style-overrides.md?@mui/markdown';

export default function Page() {
  return <TopLayoutBlog docs={docs} />;
}
