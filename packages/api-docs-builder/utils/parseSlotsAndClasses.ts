import * as ts from 'typescript';
import { ComponentClassDefinition } from '@mui-internal/api-docs-builder';
import { renderMarkdown } from '@mui/internal-markdown';
import { getSymbolDescription, getSymbolJSDocTags } from '../buildApiUtils';
import { TypeScriptProject } from './createTypeScriptProject';
import { getPropsFromComponentNode } from './getPropsFromComponentNode';
import resolveExportSpecifier from './resolveExportSpecifier';
import { ProjectSettings } from '../ProjectSettings';
import { Slot } from '../types/utils.types';

interface ClassInfo {
  description: string;
  isDeprecated?: true;
  deprecationInfo?: string;
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

interface ParseSlotsAndClassesParameters {
  typescriptProject: TypeScriptProject;
  projectSettings: ProjectSettings;
  componentName: string;
  muiName: string;
  slotInterfaceName?: string;
}

export default function parseSlotsAndClasses({
  typescriptProject,
  projectSettings,
  componentName,
  muiName,
  slotInterfaceName,
}: ParseSlotsAndClassesParameters): {
  slots: Slot[];
  classes: ComponentClassDefinition[];
} {
  // Obtain an array of classes for the given component
  const classDefinitions = extractClasses(
    typescriptProject,
    projectSettings,
    componentName,
    muiName,
  );
  const slots = extractSlots(typescriptProject, componentName, classDefinitions, slotInterfaceName);

  const nonSlotClassDefinitions = classDefinitions.filter(
    (classDefinition) => !Object.keys(slots).includes(classDefinition.key),
  );

  return {
    slots: Object.values(slots),
    classes: nonSlotClassDefinitions,
  };
}

function extractClasses(
  typescriptProject: TypeScriptProject,
  projectSettings: ProjectSettings,
  componentName: string,
  muiName: string,
): ComponentClassDefinition[] {
  return (
    extractClassesFromProps(typescriptProject, projectSettings, componentName, muiName) ??
    extractClassesFromInterface(typescriptProject, projectSettings, componentName, muiName)
  );
}

/**
 * Gets class names and descriptions from the {ComponentName}Classes interface.
 */
function extractClassesFromInterface(
  typescriptProject: TypeScriptProject,
  projectSettings: ProjectSettings,
  componentName: string,
  muiName: string,
): ComponentClassDefinition[] {
  const result: ComponentClassDefinition[] = [];

  const classesInterfaceName = `${componentName}Classes`;
  if (!typescriptProject.exports[classesInterfaceName]) {
    return result;
  }

  const classesType = typescriptProject.checker.getDeclaredTypeOfSymbol(
    typescriptProject.exports[classesInterfaceName],
  );

  const classesTypeDeclaration = classesType?.symbol?.declarations?.[0];
  if (classesTypeDeclaration && ts.isInterfaceDeclaration(classesTypeDeclaration)) {
    const classesProperties = classesType.getProperties();
    classesProperties.forEach((symbol) => {
      const tags = getSymbolJSDocTags(symbol);
      if (tags.ignore) {
        return;
      }
      result.push({
        key: symbol.name,
        className: projectSettings.generateClassName(muiName, symbol.name),
        description: getSymbolDescription(symbol, typescriptProject),
        isGlobal: projectSettings.isGlobalClassName(symbol.name),
        ...getClassDeprecationObject(symbol),
      });
    });
  }

  return result;
}

function extractClassesFromProps(
  typescriptProject: TypeScriptProject,
  projectSettings: ProjectSettings,
  componentName: string,
  muiName: string,
): ComponentClassDefinition[] | null {
  const unstableName = `Unstable_${componentName}`;
  const exportedSymbol =
    typescriptProject.exports[componentName] ?? typescriptProject.exports[unstableName];

  if (!exportedSymbol) {
    throw new Error(
      `No export found in "${typescriptProject.rootPath}" for component "${componentName}" or "${unstableName}".`,
    );
  }

  const localeSymbol = resolveExportSpecifier(exportedSymbol, typescriptProject);
  const declaration = localeSymbol.valueDeclaration!;

  const classesProp = getPropsFromComponentNode({
    node: declaration,
    project: typescriptProject,
    shouldInclude: ({ name }) => name === 'classes',
    checkDeclarations: true,
  })?.props.classes;

  if (classesProp == null) {
    return null;
  }

  const classes: Record<string, ClassInfo> = {};
  classesProp.signatures.forEach((propType) => {
    const type = typescriptProject.checker.getTypeAtLocation(propType.symbol.declarations?.[0]!);
    removeUndefinedFromType(type)
      ?.getProperties()
      .forEach((property) => {
        const tags = getSymbolJSDocTags(property);
        if (tags.ignore) {
          return;
        }
        const description = getSymbolDescription(property, typescriptProject);
        classes[property.escapedName.toString()] = {
          description,
          ...getClassDeprecationObject(property),
        };
      });
  });

  return Object.keys(classes).map((name) => ({
    key: name,
    className: projectSettings.generateClassName(muiName, name),
    description: name !== classes[name].description ? classes[name].description : '',
    isGlobal: projectSettings.isGlobalClassName(name),
    isDeprecated: classes[name].isDeprecated,
    deprecationInfo: classes[name].deprecationInfo,
  }));
}

function extractSlots(
  project: TypeScriptProject,
  componentName: string,
  classDefinitions: ComponentClassDefinition[],
  slotsInterfaceNameParams?: string,
): Record<string, Slot> {
  const defaultSlotsInterfaceName = `${componentName}Slots`;
  const slotsInterfaceName = slotsInterfaceNameParams ?? defaultSlotsInterfaceName;
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
