import * as React from 'react';
import TopLayoutBlog from 'docs/src/modules/components/TopLayoutBlog';
import { docs } from './toolpad-use-cases.md?@mui/markdown';

export default function Page() {
  return <TopLayoutBlog docs={docs} />;
}
