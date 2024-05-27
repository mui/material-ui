import addHiddenInput from 'docs/src/modules/utils/addHiddenInput';
import { CODE_VARIANTS } from 'docs/src/modules/constants';
import SandboxDependencies from 'docs/src/modules/sandbox/Dependencies';
import * as CRA from 'docs/src/modules/sandbox/CreateReactApp';
import getFileExtension from 'docs/src/modules/sandbox/FileExtension';
import { DemoData } from 'docs/src/modules/sandbox/types';

function createReactApp(demoData: DemoData) {
  const ext = getFileExtension(demoData.codeVariant);
  const { title, relativeModules = [], githubLocation: description } = demoData;

  if (relativeModules) {
    relativeModules.forEach(({ module, raw: content }) => {
      // remove exports from relative module
      content = content.replace(/export( )*(default)*( )*\w+;|export default|export/gm, '');
      // replace import statement with relative module content
      // the module might be imported with or without extension, so we need to cover all cases
      // E.g.: /import .* from '(.\/top100Films.js|.\/top100Films)';/
      const extensions = ['', '.js', '.jsx', '.ts', '.tsx', '.css', '.json'];
      const patterns = extensions
        .map((ex) => {
          if (module.endsWith(ex)) {
            return module.replace(ex, '');
          }
          return '';
        })
        .filter(Boolean)
        .join('|');
      const importPattern = new RegExp(`import .* from '(${patterns})';`);
      demoData.raw = demoData.raw.replace(importPattern, content);
    });
  }

  const files: Record<string, string> = {
    'index.html': CRA.getHtml(demoData),
    [`index.${ext}`]: CRA.getRootIndex(demoData),
    [`Demo.${ext}`]: demoData.raw,
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
