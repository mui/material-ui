import TopLayoutBlog from 'docs/src/modules/components/TopLayoutBlog';
import { withTranslations } from 'docs/src/modules/utils/withTranslations';
import { docs } from './april-2019-update.md?muiMarkdown';

export default function Page() {
  return <TopLayoutBlog docs={docs} />;
}

export async function getStaticProps() {
  return { props: withTranslations({}) };
}
