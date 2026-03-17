import TopLayoutBlog from 'docs/src/modules/components/TopLayoutBlog';
import { docs } from './mui-v9-major-version-cycle.md?muiMarkdown';

export default function Page() {
  return <TopLayoutBlog docs={docs} />;
}

