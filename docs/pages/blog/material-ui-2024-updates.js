import TopLayoutBlog from 'docs/src/modules/components/TopLayoutBlog';
import * as React from 'react';
import { docs } from './material-ui-2024-updates.md?muiMarkdown';

export default function PAge() {
  return <TopLayoutBlog docs={docs} />;
}
