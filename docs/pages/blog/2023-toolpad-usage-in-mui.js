import * as React from 'react';
import TopLayoutBlog from 'docs/src/modules/components/TopLayoutBlog';
import { docs } from './2023-toolpad-usage-in-mui.md?@mui/markdown';

export default function Page() {
  return <TopLayoutBlog docs={docs} />;
}
