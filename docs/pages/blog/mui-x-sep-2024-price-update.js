import * as React from 'react';
import TopLayoutBlog from 'docs/src/modules/components/TopLayoutBlog';
import { docs } from './mui-x-sep-2024-price-update.md?muiMarkdown';

export default function Page() {
  return <TopLayoutBlog docs={docs} />;
}
