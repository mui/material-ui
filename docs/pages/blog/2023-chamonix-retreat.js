import * as React from 'react';
import TopLayoutBlog from 'docs/src/modules/components/TopLayoutBlog';
import { docs } from './2023-chamonix-retreat.md?@mui/internal-markdown';

export default function Page() {
  return <TopLayoutBlog docs={docs} />;
}
