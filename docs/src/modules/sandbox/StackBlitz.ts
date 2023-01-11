import SandboxDependencies from './Dependencies';
import * as CRA from './CreateReactApp';
import getFileExtension from './FileExtension';
import fetchFileFromPath from './fetchFileFromPath';

const createReactApp = async (demo: {
  title: string;
  language: string;
  raw: string;
  codeVariant: 'TS' | 'JS';
  githubLocation: string;
  product?: 'joy-ui' | 'base';
}) => {
  const ext = getFileExtension(demo.codeVariant);
  const { title, githubLocation: description } = demo;
  const includeXMonorepo = demo.raw.includes("from 'docsx/");
  // cloning to avoid the documentation demo `raw` content change
  const internalDemo = { ...demo };
  let xMonorepoImportPath;
  if (includeXMonorepo) {
    const importPathMatch = internalDemo.raw.match(/from 'docsx\/([\w*/*]+)/);
    if (importPathMatch) {
      xMonorepoImportPath = importPathMatch[1];
    }
    internalDemo.raw = internalDemo.raw.replace(/from 'docsx\/(.*)\//, "from './");
  }

  const files: Record<string, string | object> = {
    'index.html': CRA.getHtml(demo),
    [`index.${ext}`]: CRA.getRootIndex(demo.product),
    [`demo.${ext}`]: internalDemo.raw,
    ...(demo.codeVariant === 'TS' && {
      'tsconfig.json': CRA.getTsconfig(),
    }),
  };

  const { dependencies } = SandboxDependencies(internalDemo, {
    // Waiting for https://github.com/stackblitz/core/issues/437
    // commitRef: process.env.PULL_REQUEST_ID ? process.env.COMMIT_REF : undefined,
  });

  if (xMonorepoImportPath) {
    try {
      const fileResponse = await fetchFileFromPath(xMonorepoImportPath);
      if (fileResponse?.content) {
        files[fileResponse.name] = decodeURIComponent(
          Buffer.from(fileResponse.content, 'base64').toString(),
        );
      }
    } catch (err) {
      console.error(`Failed to include file: ${xMonorepoImportPath}`, err);
    }
  }

  return {
    title,
    description,
    files,
    dependencies,
  };
};

export default {
  createReactApp,
};
