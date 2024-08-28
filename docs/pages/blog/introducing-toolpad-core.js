import * as React from 'react';
import TopLayoutBlog from 'docs/src/modules/components/TopLayoutBlog';
import { docs } from './introducing-toolpad-core.md?muiMarkdown';

export default function Page() {
  return <TopLayoutBlog docs={docs} />;
}
