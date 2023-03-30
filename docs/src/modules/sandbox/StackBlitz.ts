import addHiddenInput from 'docs/src/modules/utils/addHiddenInput';
import { CODE_VARIANTS } from 'docs/src/modules/constants';
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

  const files: Record<string, string> = {
    'index.html': CRA.getHtml(demo),
    [`index.${ext}`]: CRA.getRootIndex(demo.product),
    [`demo.${ext}`]: demo.raw,
    ...(demo.codeVariant === 'TS' && {
      'tsconfig.json': CRA.getTsconfig(),
    }),
  };

  const { dependencies, devDependencies } = SandboxDependencies(demo, {
    // Waiting for https://github.com/stackblitz/core/issues/437
    // commitRef: process.env.PULL_REQUEST_ID ? process.env.COMMIT_REF : undefined,
  });

  return {
    title,
    description,
    files,
    dependencies,
    devDependencies,
    openSandbox: (initialFile = 'App') => {
      const extension = demo.codeVariant === CODE_VARIANTS.TS ? '.tsx' : '.js';
      // ref: https://developer.stackblitz.com/docs/platform/post-api/
      const form = document.createElement('form');
      form.method = 'POST';
      form.target = '_blank';
      form.action = `https://stackblitz.com/run?file=${initialFile}${
        initialFile.match(/(\.tsx|\.ts|\.js)$/) ? '' : extension
      }`;
      addHiddenInput(form, 'project[template]', 'create-react-app');
      addHiddenInput(form, 'project[title]', title);
      addHiddenInput(form, 'project[description]', `# ${title}\n${description}`);
      addHiddenInput(form, 'project[dependencies]', JSON.stringify(dependencies));
      addHiddenInput(form, 'project[devDependencies]', JSON.stringify(devDependencies));
      Object.keys(files).forEach((key) => {
        const value = files[key];
        addHiddenInput(form, `project[files][${key}]`, value);
      });
      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);
    },
  };
};

export default {
  createReactApp,
};
