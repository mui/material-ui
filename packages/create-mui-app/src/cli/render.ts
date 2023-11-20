/* eslint-disable no-console */
import chalk from 'chalk';
import { TITLE } from 'src/constants';
import { type PackageManager } from 'src/installers';
import { type FrameworkOption } from 'src/utils/createProject';

const runningPorts: Record<FrameworkOption, number> = {
  'next-app': 3000,
  'next-pages': 3000,
  'react-cra': 3000,
  'react-vite': 5173,
};

export function showNextSteps(packageManager: PackageManager, framework: FrameworkOption) {
  console.log('Everything set!\n\n');

  const devScript = `${packageManager} run dev`;
  const devScriptExplanation = `This starts the project at http://localhost:${runningPorts[framework]}`;
  const buildScript = `${packageManager} run build`;
  const buildScriptExplanation = 'To build the project';
  const startScript = `${packageManager} run start`;
  const startScriptExplanation = 'To start the build of the project';

  console.log('To start the project, you can run the following commands:\n\n');

  console.log(chalk.blueBright(`\t${devScript}`));
  console.log(`\t${devScriptExplanation}\n`);
  console.log(chalk.blueBright(`\t${buildScript}`));
  console.log(`\t${buildScriptExplanation}\n`);
  console.log(chalk.blueBright(`\t${startScript}`));
  console.log(`\t${startScriptExplanation}\n`);

  console.log(chalk.blueBright('Happy hacking!'));
}

export function renderTitle() {
  console.log(chalk.blueBright(TITLE));

  console.log(
    'Welcome to create-mui-app. I will guide you through this installation process with a few questions.',
  );
}
