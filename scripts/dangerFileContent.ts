import type * as dangerModule from 'danger';
import replaceUrl from '@mui-internal/api-docs-builder/utils/replaceUrl';
import { renderMarkdownReport } from '@mui/internal-bundle-size-checker';

declare const danger: (typeof dangerModule)['danger'];
declare const markdown: (typeof dangerModule)['markdown'];

const circleCIBuildNumber = process.env.CIRCLE_BUILD_NUM;
const circleCIBuildUrl = `https://app.circleci.com/pipelines/github/mui/material-ui/jobs/${circleCIBuildNumber}`;
const dangerCommand = process.env.DANGER_COMMAND;

function prepareBundleSizeReport() {
  markdown(
    `## Bundle size report

Bundle size will be reported once [CircleCI build #${circleCIBuildNumber}](${circleCIBuildUrl}) finishes.`,
  );
}

// These functions are no longer needed as they've been moved to the prSizeDiff.js module

async function reportBundleSize() {
  let markdownContent = `## Bundle size report\n\n`;

  if (!process.env.CIRCLE_BUILD_NUM) {
    throw new Error('CIRCLE_BUILD_NUM is not defined');
  }

  const circleciBuildNumber = process.env.CIRCLE_BUILD_NUM;

  markdownContent += await renderMarkdownReport(danger.github.pr, circleciBuildNumber, {
    track: ['@mui/material', '@mui/lab', '@mui/system', '@mui/utils'],
  });

  // Use the markdown function to publish the report
  markdown(markdownContent);
}

function addDeployPreviewUrls() {
  /**
   * The incoming path from danger does not start with `/`
   * e.g. ['docs/data/joy/components/button/button.md']
   */
  function formatFileToLink(path: string) {
    let url = path.replace('docs/data', '').replace(/\.md$/, '');

    const fragments = url.split('/').reverse();
    if (fragments[0] === fragments[1]) {
      // check if the end of pathname is the same as the one before
      // for example `/data/material/getting-started/overview/overview.md
      url = fragments.slice(1).reverse().join('/');
    }

    if (url.startsWith('/material')) {
      // needs to convert to correct material legacy folder structure to the existing url.
      url = replaceUrl(url.replace('/material', ''), '/material-ui').replace(/^\//, '');
    } else {
      url = url
        .replace(/^\//, '') // remove initial `/`
        .replace('joy/', 'joy-ui/')
        .replace('components/', 'react-');
    }

    return url;
  }

  const netlifyPreview = `https://deploy-preview-${danger.github.pr.number}--material-ui.netlify.app/`;

  const files = [...danger.git.created_files, ...danger.git.modified_files];

  // limit to the first 5 docs
  const docs = files
    .filter((file) => file.startsWith('docs/data') && file.endsWith('.md'))
    .slice(0, 5);

  markdown(`
## Netlify deploy preview

${
  docs.length
    ? docs
        .map((path) => {
          const formattedUrl = formatFileToLink(path);
          return `- [${path}](${netlifyPreview}${formattedUrl})`;
        })
        .join('\n')
    : netlifyPreview
}
`);
}

async function run() {
  addDeployPreviewUrls();

  switch (dangerCommand) {
    case 'prepareBundleSizeReport':
      prepareBundleSizeReport();
      break;
    case 'reportBundleSize':
      await reportBundleSize();
      break;
    default:
      throw new TypeError(`Unrecognized danger command '${dangerCommand}'`);
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
