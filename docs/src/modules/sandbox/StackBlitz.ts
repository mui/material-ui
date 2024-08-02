import addHiddenInput from 'docs/src/modules/utils/addHiddenInput';
import { CODE_VARIANTS } from 'docs/src/modules/constants';
import SandboxDependencies from 'docs/src/modules/sandbox/Dependencies';
import * as CRA from 'docs/src/modules/sandbox/CreateReactApp';
import getFileExtension from 'docs/src/modules/sandbox/FileExtension';
import flattenRelativeImports from 'docs/src/modules/sandbox/FlattenRelativeImports';
import { DemoData } from 'docs/src/modules/sandbox/types';

function createReactApp(demoData: DemoData) {
  const ext = getFileExtension(demoData.codeVariant);
  const { title, githubLocation: description } = demoData;

  const files: Record<string, string> = {
    'index.html': CRA.getHtml(demoData),
    [`index.${ext}`]: CRA.getRootIndex(demoData),
    [`Demo.${ext}`]: flattenRelativeImports(
      demoData.raw,
      demoData.relativeModules?.map((file) => file.module),
    ),
    // Spread the relative modules
    ...(demoData.relativeModules &&
      // Transform the relative modules array into an object
      demoData.relativeModules.reduce(
        (acc, curr) => ({
          ...acc,
          // Remove the path and keep the filename
          [`${curr.module.replace(/^.*[\\/]/g, '')}`]: curr.raw,
        }),
        {},
      )),
    ...(demoData.codeVariant === 'TS' && {
      'tsconfig.json': CRA.getTsconfig(),
    }),
  };

  const { dependencies, devDependencies } = SandboxDependencies(demoData, {
    // Waiting for https://github.com/stackblitz/core/issues/437
    // commitRef: process.env.PULL_REQUEST_ID ? process.env.COMMIT_REF : undefined,
  });

  return {
    title,
    description,
    files,
    dependencies,
    devDependencies,
    openSandbox: (initialFile = `Demo.${ext}`) => {
      const extension = demoData.codeVariant === CODE_VARIANTS.TS ? '.tsx' : '.js';
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
}

export default {
  createReactApp,
};
