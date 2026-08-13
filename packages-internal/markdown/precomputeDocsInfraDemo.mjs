// @ts-check

import path from 'path';
import { pathToFileURL } from 'url';
import { precomputeFileDemo } from '@mui/internal-docs-infra/pipeline/precomputeFileDemo';
import { getHastTextContent } from '@mui/internal-docs-infra/pipeline/hastUtils';
import { toHtml } from 'hast-util-to-html';

/**
 * Builds the docs-infra source graph for one demo marker.
 *
 * This is the only build-time module allowed to import docs-infra. It returns
 * serializable data so the Markdown loader can inline it next to the legacy
 * demo data.
 *
 * @param {import('./precomputeDocsInfraDemo.mjs').PrecomputeDocsInfraDemoOptions} options
 * @returns {Promise<import('./precomputeDocsInfraDemo.mjs').DocsInfraDemoData>}
 */
export default async function precomputeDocsInfraDemo(options) {
  const { demoName, moduleFilepath, previewSource } = options;
  const fileName = path.basename(moduleFilepath);
  const name = fileName.replace(/\.[^.]+$/, '');

  const precomputed = await precomputeFileDemo(
    {
      name,
      slug: demoName,
      entries: {
        Default: { name: 'Default', url: pathToFileURL(moduleFilepath).href, fileName },
      },
      ...(previewSource
        ? { preview: { source: previewSource, fileName: `${name}.tsx.preview` } }
        : {}),
    },
    { output: 'hast' },
  );

  const variant = precomputed.code.Default;
  if (typeof variant === 'string' || !variant) {
    throw new Error(`docs-infra returned no source for the demo "${demoName}"`);
  }

  return {
    source: getHastTextContent(variant.source),
    html: toHtml(variant.source),
    fileName: variant.fileName ?? fileName,
    language: variant.language,
    externals: precomputed.externals,
    dependencies: precomputed.dependencies,
  };
}
