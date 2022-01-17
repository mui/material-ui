import * as React from 'react';
import TopLayoutBlog from 'docs/src/modules/components/TopLayoutBlog';
import { docs } from './mui-material-v5-3.md?@mui/markdown';

export default function Page() {
  return <TopLayoutBlog docs={docs} />;
}
