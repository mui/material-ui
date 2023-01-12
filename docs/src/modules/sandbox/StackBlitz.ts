import SandboxDependencies from './Dependencies';
import * as CRA from './CreateReactApp';
import getFileExtension from './FileExtension';

const createReactApp = (demo: {
  title: string;
  language: string;
  raw: string;
  codeVariant: 'TS' | 'JS';
  githubLocation: string;
  product?: 'joy-ui' | 'base';
}) => {
  const ext = getFileExtension(demo.codeVariant);
  const { title, githubLocation: description } = demo;

  const files: Record<string, string | object> = {
    'index.html': CRA.getHtml(demo),
    [`index.${ext}`]: CRA.getRootIndex(demo.product),
    [`demo.${ext}`]: demo.raw,
    ...(demo.codeVariant === 'TS' && {
      'tsconfig.json': CRA.getTsconfig(),
    }),
  };

  const { dependencies } = SandboxDependencies(demo, {
    // Waiting for https://github.com/stackblitz/core/issues/437
    // commitRef: process.env.PULL_REQUEST_ID ? process.env.COMMIT_REF : undefined,
  });

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
