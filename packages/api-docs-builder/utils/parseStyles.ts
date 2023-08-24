import * as ts from 'typescript';
import { getSymbolDescription } from '../buildApiUtils';
import { TypeScriptProject } from './createTypeScriptProject';
import getPropsFromComponentSymbol from './getPropsFromComponentSymbol';

export interface Classes {
  classes: string[];
  globalClasses: Record<string, string>;
  descriptions: Record<string, string>;
}

export interface Styles extends Classes {
  name: string | null;
}

const EMPTY_STYLES: Styles = {
  classes: [],
  descriptions: {},
  globalClasses: {},
  name: null,
};

function removeUndefinedFromType(type: ts.Type) {
  // eslint-disable-next-line no-bitwise
  if (type.flags & ts.TypeFlags.Union) {
    return (type as ts.UnionType).types.find((subType) => {
      return subType.flags !== ts.TypeFlags.Undefined;
    });
  }

  return type;
}

/**
 * Gets class names and descriptions from the {ComponentName}Classes interface.
 */
function extractClasses(project: TypeScriptProject, componentName: string): Styles {
  const result: Styles = {
    classes: [],
    descriptions: {},
    globalClasses: {},
    name: null,
  };

  const classesInterfaceName = `${componentName}Classes`;
  if (!project.exports[classesInterfaceName]) {
    return EMPTY_STYLES;
  }

  const classesType = project.checker.getDeclaredTypeOfSymbol(
    project.exports[classesInterfaceName],
  );

  const classesTypeDeclaration = classesType?.symbol?.declarations?.[0];
  if (classesTypeDeclaration && ts.isInterfaceDeclaration(classesTypeDeclaration)) {
    const classesProperties = classesType.getProperties();
    classesProperties.forEach((symbol) => {
      result.classes.push(symbol.name);
      result.descriptions[symbol.name] = getSymbolDescription(symbol, project);
    });

    return result;
  }

  return EMPTY_STYLES;
}

export default function parseStyles({
  project,
  componentName,
}: {
  project: TypeScriptProject;
  componentName: string;
}): Styles {
  const exportedSymbol =
    project.exports[componentName] ?? project.exports[`Unstable_${componentName}`];
  if (!exportedSymbol) {
    throw new Error(`No exported component for the componentName "${componentName}"`);
  }

  const classesProp = getPropsFromComponentSymbol({
    symbol: exportedSymbol,
    project,
    shouldInclude: ({ name }) => name === 'classes',
  })?.classes;
  if (classesProp == null) {
    // We could not infer the type of the classes prop, so we try to extract them from the {ComponentName}Classes interface
    return extractClasses(project, componentName);
  }

  const classes: Record<string, string> = {};
  classesProp.types.forEach((propType) => {
    removeUndefinedFromType(propType)
      ?.getProperties()
      .forEach((property) => {
        classes[property.escapedName.toString()] = getSymbolDescription(property, project);
      });
  });

  return {
    classes: Object.keys(classes),
    descriptions: Object.fromEntries(
      Object.entries(classes).filter((descriptionEntry) => !!descriptionEntry[1]),
    ),
    globalClasses: {},
    name: null,
  };
}
