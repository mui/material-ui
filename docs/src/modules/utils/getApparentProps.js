import * as fse from 'fs-extra';
import * as lodash from 'lodash';
import * as path from 'path';
import { parse as docgenParse } from 'react-docgen';

/**
 * Maps the inheritance chain for each component to their respective props that specific
 * component implements.
 *
 * @param {Map<string, {}>} componentsBaseProps
 * @param {Map<string, string[]>} dependencyGraph
 * @returns {Map<string, Array<{interface: {}, implementedBy: string}>>}
 */
function resolveProps(componentsBaseProps, dependencyGraph) {
  const componentNames = Array.from(dependencyGraph.keys());

  const resolvedEntries = componentNames.map(derivedComponentName => {
    const inheritsFrom = dependencyGraph.get(derivedComponentName) || [];
    const inheritanceChain = [derivedComponentName, ...inheritsFrom];

    const resolvedProps = inheritanceChain.reduce((partialProps, componentName) => {
      const props = componentsBaseProps.get(componentName) || {};
      return {
        ...partialProps,
        ...lodash.mapValues(props, prop => {
          return {
            interface: prop,
            implementedBy: componentName,
          };
        }),
      };
    }, []);

    return [derivedComponentName, resolvedProps];
  });

  return new Map(resolvedEntries);
}

/**
 * The result is a mapping from a component to a list of all the props that are available
 * with a field for the interface of that prop and the name of the component that implements
 * that prop.
 *
 * @param {Array<{filename: string}>} components
 * @param {Map<string, string[]>} dependencyGraph
 */
export default async function getApparentProps(components, dependencyGraph) {
  const componentsBaseProps = new Map();
  await Promise.all(
    components.map(async component => {
      const componentSource = await fse.readFile(component.filename, { encoding: 'utf8' });

      const componentName = path.basename(component.filename, '.js');

      let reactAPI = null;
      try {
        reactAPI = docgenParse(componentSource, null, null, {
          filename: component.filename,
        });
      } catch (error) {
        // ignore
      }

      if (reactAPI !== null) {
        componentsBaseProps.set(componentName, reactAPI.props);
      }
    }),
  );

  return resolveProps(componentsBaseProps, dependencyGraph);
}
