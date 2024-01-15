import * as ts from 'typescript';
import { ComponentClassDefinition } from '@mui-internal/docs-utilities';
import { unstable_generateUtilityClass as generateUtilityClass } from '@mui/utils';
import { renderMarkdown } from '@mui/markdown';
import { getSymbolDescription, getSymbolJSDocTags } from '../buildApiUtils';
import { TypeScriptProject } from './createTypeScriptProject';
import { getPropsFromComponentNode } from './getPropsFromComponentNode';
import resolveExportSpecifier from './resolveExportSpecifier';

// If GLOBAL_STATE_CLASSES is changed, GlobalStateSlot in
// \packages\mui-utils\src\generateUtilityClass\generateUtilityClass.ts must be updated accordingly.
const GLOBAL_STATE_CLASSES: string[] = [
  'active',
  'checked',
  'completed',
  'disabled',
  'error',
  'expanded',
  'focused',
  'focusVisible',
  'open',
  'readOnly',
  'required',
  'selected',
];

interface ClassInfo {
  description: string;
  isDeprecated?: true;
  deprecationInfo?: string;
}

export interface Slot {
  class: string | null;
  name: string;
  description: string;
  default?: string;
}

/**
 * Gets the deprecation information for a given symbol.
 * @param symbol - The TypeScript symbol.
 * @returns An object containing the deprecation information, if the symbol is deprecated.
 */
function getClassDeprecationObject(symbol: ts.Symbol): {
  isDeprecated?: true;
  deprecationInfo?: string;
} {
  const tags = getSymbolJSDocTags(symbol);
  if (tags.deprecated) {
    return {
      isDeprecated: true,
      deprecationInfo: renderMarkdown(tags.deprecated.text?.[0].text || '').trim() || undefined,
    };
  }
  return {};
}

export default function parseSlotsAndClasses({
  project,
  componentName,
  muiName,
}: {
  project: TypeScriptProject;
  componentName: string;
  muiName: string;
}): { slots: Slot[]; classes: ComponentClassDefinition[] } {
  // Obtain an array of classes for the given component
  const classDefinitions = extractClasses(project, componentName, muiName);
  const slots = extractSlots(project, componentName, classDefinitions);

  const nonSlotClassDefinitions = classDefinitions
    .filter((classDefinition) => !Object.keys(slots).includes(classDefinition.key))
    .sort((a, b) => a.key.localeCompare(b.key));

  return {
    slots: Object.values(slots),
    classes: nonSlotClassDefinitions,
  };
}

function extractClasses(
  project: TypeScriptProject,
  componentName: string,
  muiName: string,
): ComponentClassDefinition[] {
  return (
    extractClassesFromProps(project, componentName, muiName) ??
    extractClassesFromInterface(project, componentName, muiName)
  );
}

/**
 * Gets class names and descriptions from the {ComponentName}Classes interface.
 */
function extractClassesFromInterface(
  project: TypeScriptProject,
  componentName: string,
  muiName: string,
): ComponentClassDefinition[] {
  const result: ComponentClassDefinition[] = [];

  const classesInterfaceName = `${componentName}Classes`;
  if (!project.exports[classesInterfaceName]) {
    return result;
  }

  const classesType = project.checker.getDeclaredTypeOfSymbol(
    project.exports[classesInterfaceName],
  );

  const classesTypeDeclaration = classesType?.symbol?.declarations?.[0];
  if (classesTypeDeclaration && ts.isInterfaceDeclaration(classesTypeDeclaration)) {
    const classesProperties = classesType.getProperties();
    classesProperties.forEach((symbol) => {
      result.push({
        key: symbol.name,
        className: generateUtilityClass(muiName, symbol.name),
        description: getSymbolDescription(symbol, project),
        isGlobal: GLOBAL_STATE_CLASSES.includes(symbol.name),
        ...getClassDeprecationObject(symbol),
      });
    });
  }

  return result;
}

function extractClassesFromProps(
  project: TypeScriptProject,
  componentName: string,
  muiName: string,
): ComponentClassDefinition[] | null {
  const exportedSymbol =
    project.exports[componentName] ?? project.exports[`Unstable_${componentName}`];
  if (!exportedSymbol) {
    throw new Error(`No exported component for the componentName "${componentName}"`);
  }

  const localeSymbol = resolveExportSpecifier(exportedSymbol, project);
  const declaration = localeSymbol.valueDeclaration!;

  const classesProp = getPropsFromComponentNode({
    node: declaration,
    project,
    shouldInclude: ({ name }) => name === 'classes',
    checkDeclarations: true,
  })?.props.classes;

  if (classesProp == null) {
    return null;
  }

  const classes: Record<string, ClassInfo> = {};
  classesProp.signatures.forEach((propType) => {
    const type = project.checker.getTypeAtLocation(propType.symbol.declarations?.[0]!);
    removeUndefinedFromType(type)
      ?.getProperties()
      .forEach((property) => {
        const description = getSymbolDescription(property, project);
        classes[property.escapedName.toString()] = {
          description,
          ...getClassDeprecationObject(property),
        };
      });
  });

  return Object.keys(classes).map((name) => ({
    key: name,
    className: generateUtilityClass(muiName, name),
    description: name !== classes[name].description ? classes[name].description : '',
    isGlobal: GLOBAL_STATE_CLASSES.includes(name),
    isDeprecated: classes[name].isDeprecated,
    deprecationInfo: classes[name].deprecationInfo,
  }));
}

function extractSlots(
  project: TypeScriptProject,
  componentName: string,
  classDefinitions: ComponentClassDefinition[],
): Record<string, Slot> {
  const slotsInterfaceName = `${componentName}Slots`;
  const exportedSymbol = project.exports[slotsInterfaceName];
  if (!exportedSymbol) {
    console.warn(`No declaration for ${slotsInterfaceName}`);
    return {};
  }
  const type = project.checker.getDeclaredTypeOfSymbol(exportedSymbol);
  const typeDeclaration = type?.symbol?.declarations?.[0];

  if (!typeDeclaration || !ts.isInterfaceDeclaration(typeDeclaration)) {
    return {};
  }

  const slots: Record<string, Slot> = {};
  const propertiesOnProject = type.getProperties();

  propertiesOnProject.forEach((propertySymbol) => {
    const tags = getSymbolJSDocTags(propertySymbol);
    if (tags.ignore) {
      return;
    }
    const slotName = propertySymbol.name;

    const slotClassDefinition = classDefinitions.find(
      (classDefinition) => classDefinition.key === slotName,
    );

    slots[slotName] = {
      name: slotName,
      description: getSymbolDescription(propertySymbol, project),
      default: tags.default?.text?.[0].text,
      class: slotClassDefinition?.className ?? null,
    };
  });

  return slots;
}

function removeUndefinedFromType(type: ts.Type) {
  // eslint-disable-next-line no-bitwise
  if (type.flags & ts.TypeFlags.Union) {
    return (type as ts.UnionType).types.find((subType) => {
      return subType.flags !== ts.TypeFlags.Undefined;
    });
  }

  return type;
}
