import fs from 'fs-extra';
import path from 'path';
import { PKG_ROOT } from 'src/constants';
import addDependency from 'src/utils/addDependency';

import { type Installer } from '.';

export const muiInstaller: Installer = ({ projectDir, typescript }) => {
  addDependency({
    projectDir,
    dependencies: ['@mui/material'],
    devMode: false,
  });
  // const componentsDir = path.join(PKG_ROOT, 'templates/components');

  // const muiComponentSrc = path.join(componentsDir, `Card.${typescript ? 'tsx' : 'jsx'}`);
  // const muiComponentsDest = path.join(projectDir, `Card.${typescript ? 'tsx' : 'jsx'}`);

  // fs.copySync(muiComponentSrc, muiComponentsDest);
};

export const joyInstaller: Installer = ({ projectDir, typescript }) => {
  addDependency({
    projectDir,
    dependencies: ['@mui/joy'],
    devMode: false,
  });
  // const componentsDir = path.join(PKG_ROOT, 'templates/components');
  // const joyComponentSrc = path.join(componentsDir, `Card.${typescript ? 'tsx' : 'jsx'}`);
  // const joyComponentsDest = path.join(projectDir, `Card.${typescript ? 'tsx' : 'jsx'}`);
  // fs.copySync(joyComponentSrc, joyComponentsDest);
};

export const iconsInstaller: Installer = ({ projectDir }) => {
  addDependency({
    projectDir,
    dependencies: ['@mui/icons-material'],
    devMode: false,
  });
};

export const muiSystemInstaller: Installer = ({ projectDir }) => {
  addDependency({
    projectDir,
    dependencies: ['@mui/system'],
    devMode: false,
  });
};

export const emotionInstaller: Installer = ({ projectDir }) => {
  addDependency({
    projectDir,
    dependencies: ['@emotion/react', '@emotion/styled'],
    devMode: false,
  });
};
