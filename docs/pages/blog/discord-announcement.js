import TopLayoutBlog from 'docs/src/modules/components/TopLayoutBlog';
import { docs } from './discord-announcement.md?muiMarkdown';

export default function Page() {
  return <TopLayoutBlog docs={docs} />;
}
