// inspire by reacts dangerfile
// danger has to be the first thing required!
import { danger, markdown } from 'danger';

/**
 * The incoming path from danger does not start with `/`
 * e.g. ['docs/data/joy/components/button/button.md']
 */
function formatFileToLink(path: string) {
  return path
    .replace('docs/data/', '')
    .replace('material/', 'material-ui/')
    .replace('joy/', 'joy-ui/')
    .replace('components/', 'react-')
    .replace(/\/[^/]+\.md$/, '/');
}

async function run() {
  const netlifyPreview = `https://deploy-preview-${danger.github.pr.number}--material-ui.netlify.app/`;

  const files = [...danger.git.created_files, ...danger.git.modified_files];

  // limit to the first 5 docs
  const docs = files
    .filter((file) => file.startsWith('docs/data') && file.endsWith('.md'))
    .slice(0, 5);

  markdown(`
## Netlify deploy preview

${docs
  .map((path) => {
    const formattedUrl = formatFileToLink(path);
    return `- [${formattedUrl}](${netlifyPreview}${formattedUrl})`;
  })
  .join('\n')}
`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
