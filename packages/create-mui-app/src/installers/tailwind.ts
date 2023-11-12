import fs from 'fs-extra';
import path from 'path';
import { PKG_ROOT } from 'src/constants';
import addDependency from 'src/utils/addDependency';

import { type Installer } from '.';

const tailwindInstaller: Installer = ({ projectDir }) => {
  addDependency({
    projectDir,
    dependencies: [
      'tailwindcss',
      'postcss',
      'autoprefixer',
      'prettier',
      'prettier-plugin-tailwindcss',
    ],
    devMode: true,
  });

  const configsDir = path.join(PKG_ROOT, 'templates/configs');
  const tailwindConfigSrc = path.join(configsDir, 'tailwind.config.js');
  const tailwindConfigDest = path.join(projectDir, 'tailwind.config.js');

  const postcssConfigSrc = path.join(configsDir, 'postcss.config.js');
  const postcssConfigDest = path.join(projectDir, 'postcss.config.js');

  const prettierConfigSrc = path.join(configsDir, 'prettier.config.mjs');
  const prettierConfigDest = path.join(projectDir, 'prettier.config.mjs');

  const cssSrc = path.join(configsDir, 'globals.css');
  const cssDest = path.join(projectDir, 'src/styles/globals.css');

  fs.copySync(tailwindConfigSrc, tailwindConfigDest);
  fs.copySync(postcssConfigSrc, postcssConfigDest);
  fs.copySync(prettierConfigSrc, prettierConfigDest);
  fs.copySync(cssSrc, cssDest);
};

export default tailwindInstaller;
