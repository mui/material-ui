import TopLayoutBlog from 'docs/src/modules/components/TopLayoutBlog';
import { withTranslations } from 'docs/src/modules/utils/withTranslations';
import { docs, srcComponents } from './material-ui-v6-is-out.md?muiMarkdown';

export default function Page() {
  return <TopLayoutBlog docs={docs} srcComponents={srcComponents} />;
}

export async function getStaticProps() {
  return { props: withTranslations({}) };
}
