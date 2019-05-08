import * as path from 'path';
import parseTest from './parseTest';

function resolveInheritanceChain(inheritanceChain) {
  const entries = Array.from(inheritanceChain.entries());
  const resolvedEntries = entries.map(([derived, bases]) => {
    if (bases.length > 1) {
      throw new Error('Already resolved. Should only have at most one immediate base');
    }

    const resolvedChain = [];
    let [base] = bases;
    while (base !== undefined) {
      resolvedChain.push(base);

      // `base` might not appear in inheritance graph for 3rd party libraries
      [base] = inheritanceChain.get(base) || [];
    }

    return [derived, resolvedChain];
  });

  return new Map(resolvedEntries);
}

export default async function getDependencyGraph(components) {
  const componentsInheritance = new Map();
  await Promise.all(
    components.map(async component => {
      let testInfo = null;
      try {
        testInfo = await parseTest(component.filename);
      } catch (err) {
        // ignore non-existing
      }

      if (testInfo !== null) {
        const componentName = path.basename(component.filename, '.js');
        const { inheritComponent } = testInfo;

        if (!componentsInheritance.has(componentName)) {
          componentsInheritance.set(componentName, []);
        }

        if (inheritComponent !== undefined) {
          componentsInheritance.get(componentName).push(inheritComponent);
        }
      }
    }),
  );

  return resolveInheritanceChain(componentsInheritance);
}
