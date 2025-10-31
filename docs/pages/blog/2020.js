import TopLayoutBlog from 'docs/src/modules/components/TopLayoutBlog';
import { withTranslations } from 'docs/src/modules/utils/withTranslations';
import { docs } from './2020.md?muiMarkdown';

export default function Page() {
  return <TopLayoutBlog docs={docs} />;
}

export async function getStaticProps() {
  return { props: withTranslations({}) };
}
