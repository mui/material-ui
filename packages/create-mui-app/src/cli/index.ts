import * as p from '@clack/prompts';
import { Command } from 'commander';
import { CREATE_MUI_APP, DEFAULT_APP_NAME } from 'src/constants';
import { AvailableMuiPackages, AvailablePackages } from 'src/installers';
import validateAppName from 'src/utils/validateAppName';

interface CliResults {
  appName: string;
  packages: string[];
}

const defaultOptions: CliResults = {
  appName: DEFAULT_APP_NAME,
  packages: ['system', 'typescript'],
};

export default async function runCreateMuiCli() {
  const cliResults = defaultOptions;

  // it could be an option to add flags here, e.g. for typescript or the packageManager
  const program = new Command()
    .name(CREATE_MUI_APP)
    .description('A CLI to create a stunning react application with Material UI components.')
    .argument(
      '[dir]',
      'The name of the application, as well as the name of the directory to create',
    )
    .parse(process.argv);

  const cliProvidedName = program.args[0];
  if (cliProvidedName) {
    cliResults.appName = cliProvidedName;
  }

  const project = await p.group(
    {
      name: () =>
        p.text({
          message: 'What will your project be called?',
          defaultValue: cliProvidedName,
          validate: validateAppName,
        }),
      framework: () =>
        p.select({
          message: 'What framework do you want to use?',
          options: [
            { value: 'react-vite', label: 'React(Vite)' },
            { value: 'react-cra', label: 'React(CRA)' },
            { value: 'next-app', label: 'Next.js(AppDir)' },
            { value: 'next-pages', label: 'Next.js(PagesDir)' },
          ],
          initialValue: 'react-vite',
        }),
      muiPackage: () =>
        p.select({
          message: 'What MUI package do you want to use?',
          options: [
            { value: 'mui', label: 'Material UI' },
            // { value: 'base', label: 'Base UI' },
            { value: 'joy', label: 'Joy UI' },
          ],
          initialValue: 'mui',
        }),
      icons: () =>
        p.confirm({
          message: 'Do you want to use Material Design Icons?',
        }),
      typescript: () =>
        p.confirm({
          message: 'Do you plan to use TypeScript?',
        }),
      styling: () =>
        p.select({
          message: 'Do you want to use MUI System or TailwindCSS for styling?',
          options: [
            { value: 'system', label: 'MUI System' },
            { value: 'tailwind', label: 'TailwindCSS' },
            { value: 'none', label: 'None/Other' },
          ],
          initialValue: 'system',
        }),
      packageManager: () =>
        p.select({
          message: 'What package manager do you want to use for this project?',
          options: [
            { value: 'npm', label: 'npm' },
            { value: 'yarn', label: 'yarn' },
            { value: 'pnpm', label: 'pnpm' },
            { value: 'bun', label: 'bun' },
          ],
          initialValue: 'npm',
        }),
    },
    {
      onCancel() {
        p.cancel('Operation cancelled');
        process.exit(1);
      },
    },
  );

  const packages: AvailablePackages[] = [project.muiPackage as AvailableMuiPackages];

  if (project.icons) {
    packages.push('icons');
  }
  if (project.styling === 'system' || project.styling === 'tailwind') {
    packages.push(project.styling);
  }
  return {
    appName: project.name ?? cliResults.appName,
    packages,
    framework: project.framework,
    flags: {
      typescript: project.typescript,
      packageManager: project.packageManager,
    },
  };
}
