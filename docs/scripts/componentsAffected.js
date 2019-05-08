/* eslint-disable no-console, no-restricted-syntax */
import * as inquirer from 'inquirer';
import * as path from 'path';
import { findComponents } from '../src/modules/utils/find';
import getDependencyGraph from '../src/modules/utils/getDependencyGraph';
import getApparentProps from '../src/modules/utils/getApparentProps';

function* readAnswers() {
  while (true) {
    yield inquirer.prompt([
      { message: 'What component changed (name):', name: 'component' },
      { message: 'What prop changed (name):', name: 'prop' },
    ]);
  }
}

async function run() {
  console.log('Building meta data. This might take a while.');

  const workspaceRoot = path.join(__dirname, '../../');

  const coreComponents = findComponents(path.join(workspaceRoot, 'packages/material-ui/src'));
  const labComponents = findComponents(path.join(workspaceRoot, 'packages/material-ui-lab/src'));
  const components = [...coreComponents, ...labComponents];

  const dependencyGraph = await getDependencyGraph(components);
  // we don't have to await this until we get user input but a pending promise blocks
  // the terminal ui paint thread (terminology might be incorrect) which means
  // input feels unresponsive
  const componentsApparentProps = await getApparentProps(components, dependencyGraph);

  for await (const answer of readAnswers()) {
    const { component: changedComponentName, prop: changedPropName } = answer;

    const affectedComponents = Array.from(componentsApparentProps.entries())
      .filter(([, apparentProps]) => {
        return Object.entries(apparentProps).some(
          ([propName, prop]) =>
            propName === changedPropName && prop.implementedBy === changedComponentName,
        );
      })
      .map(([componentName]) => componentName)
      .sort((a, b) => a.localeCompare(b));

    console.log(
      `Changing the prop '${changedPropName}' in '${changedComponentName}' affects the following components:\n${affectedComponents
        .map(name => `  - ${name}`)
        .join('\n')}`,
    );

    console.log('\nCTRL+C to stop program\n');
  }
}

run().catch(error => {
  console.error(error);
  process.exit(1);
});
