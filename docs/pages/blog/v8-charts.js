import * as React from 'react';
import TopLayoutBlog from 'docs/src/modules/components/TopLayoutBlog';
import { docs } from './v8-charts.md?muiMarkdown';

export default function Page() {
  return <TopLayoutBlog docs={docs} />;
}
