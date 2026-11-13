import * as ts from '@typescript/typescript6';
import type { ComponentClassDefinition } from '../types/ApiBuilder.types';
import { renderMarkdown } from '../buildApi';
import {
  getSymbolDescription,
  getSymbolJSDocTags,
  IGNORE_HINT,
  isHiddenFromApiDocs,
} from '../buildApiUtils';
import type { TypeScriptProject } from './createTypeScriptProject';
import {
  getComponentDeclaration,
  getPropsFromComponentNode,
  isSymbolDeclaredOnlyInDependencies,
} from './getPropsFromComponentNode';
import type { ProjectSettings } from '../ProjectSettings';
import type { Slot } from '../types/utils.types';

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
  /**
   * Slots and classes without a description, and slots with a missing or malformed `@default`.
   */
  errors: string[];
} {
  const classSymbols = new Map<string, ts.Symbol>();
  const slotSymbols = new Map<string, ts.Symbol>();

  // Obtain an array of classes for the given component
  const { classDefinitions, classesLocation } = extractClasses(
    typescriptProject,
    projectSettings,
    componentName,
    muiName,
    classSymbols,
  );
  const slotsInterfaceName = slotInterfaceName ?? `${componentName}Slots`;
  const slots = extractSlots(
    typescriptProject,
    componentName,
    classDefinitions,
    slotsInterfaceName,
    slotSymbols,
  );

  const nonSlotClassDefinitions = classDefinitions.filter(
    (classDefinition) => !Object.keys(slots).includes(classDefinition.key),
  );

  const getMissingDescriptionErrors = (
    kind: string,
    entries: { key: string; description: string }[],
    symbols: Map<string, ts.Symbol>,
    defaultLocation: string,
  ) =>
    entries.flatMap(({ key, description }) => {
      if (description.trim() !== '') {
        return [];
      }
      const symbol = symbols.get(key);
      // Undocumented slots and classes from dependencies are listed without a description.
      if (symbol && isSymbolDeclaredOnlyInDependencies(typescriptProject, symbol)) {
        return [];
      }
      const location = getDeclaringInterfaceLocation(symbol) ?? defaultLocation;
      return [
        `[${componentName}] ${kind} \`${key}\` has no description. Add a JSDoc comment to \`${key}\` in ${location}. ${IGNORE_HINT}`,
      ];
    });

  const slotDefaultErrors = Object.values(slots).flatMap((slot) => {
    const symbol = slotSymbols.get(slot.name);
    if (
      !symbol ||
      !isComponentSlot(typescriptProject, symbol) ||
      isSymbolDeclaredOnlyInDependencies(typescriptProject, symbol)
    ) {
      return [];
    }
    const location =
      getDeclaringInterfaceLocation(symbol) ?? `the \`${slotsInterfaceName}\` interface`;
    const error = getSlotDefaultError(slot.default, location);
    return error ? [`[${componentName}] slot \`${slot.name}\` ${error}`] : [];
  });

  return {
    slots: Object.values(slots),
    classes: nonSlotClassDefinitions,
    errors: [
      ...slotDefaultErrors,
      ...getMissingDescriptionErrors(
        'slot',
        Object.values(slots).map((slot) => ({ key: slot.name, description: slot.description })),
        slotSymbols,
        `the \`${slotsInterfaceName}\` interface`,
      ),
      ...getMissingDescriptionErrors(
        'class',
        nonSlotClassDefinitions,
        classSymbols,
        classesLocation,
      ),
    ],
  };
}

/**
 * Returns `true` if the slot takes a component, like `React.ElementType`.
 * Slots that hold the slots of a nested component are objects instead.
 */
function isComponentSlot(project: TypeScriptProject, symbol: ts.Symbol): boolean {
  const type = project.checker.getNonNullableType(project.checker.getTypeOfSymbol(symbol));
  const types = type.isUnion() ? type.types : [type];
  return types.some(
    (member) =>
      member.isStringLiteral() ||
      // eslint-disable-next-line no-bitwise
      (member.flags & (ts.TypeFlags.String | ts.TypeFlags.Any | ts.TypeFlags.Unknown)) !== 0 ||
      member.getCallSignatures().length > 0 ||
      member.getConstructSignatures().length > 0,
  );
}

/**
 * Checks the `@default` of a component slot: HTML elements are in single quotes (`'div'`),
 * components are not, and a slot that renders nothing has `@default null`.
 */
export function getSlotDefaultError(
  defaultValue: string | undefined,
  location: string,
): string | null {
  const value = defaultValue?.trim();
  if (!value) {
    return `has no \`@default\`. Add one in ${location}, with the component it renders or the HTML tag in quotes, like \`@default 'div'\`.`;
  }
  if (value === 'null') {
    return null;
  }
  // A lone lowercase name, bare or wrapped in double quotes, backticks, or angle brackets.
  const match = value.match(
    /^(?:"([a-z][a-z0-9-]*)"|`([a-z][a-z0-9-]*)`|<([a-z][a-z0-9-]*)\s*\/?>|([a-z][a-z0-9-]*))$/,
  );
  if (!match) {
    return null;
  }
  const name = match.slice(1).find(Boolean)!;
  if (name === 'null' || name === 'undefined') {
    return `has \`@default ${value}\`. Write \`@default null\` in ${location} for a slot that renders nothing.`;
  }
  return `has \`@default ${value}\`. Write \`@default '${name}'\` in ${location}, HTML tags are in single quotes.`;
}

/**
 * Names the interface that declares the symbol, which can be an interface it extends.
 */
function getDeclaringInterfaceLocation(symbol: ts.Symbol | undefined): string | null {
  const parent = symbol?.declarations?.[0]?.parent;
  if (parent && ts.isInterfaceDeclaration(parent)) {
    return `the \`${parent.name.text}\` interface`;
  }
  return null;
}

function extractClasses(
  typescriptProject: TypeScriptProject,
  projectSettings: ProjectSettings,
  componentName: string,
  muiName: string,
  symbols: Map<string, ts.Symbol>,
): { classDefinitions: ComponentClassDefinition[]; classesLocation: string } {
  const fromProps = extractClassesFromProps(
    typescriptProject,
    projectSettings,
    componentName,
    muiName,
    symbols,
  );
  if (fromProps) {
    return { classDefinitions: fromProps, classesLocation: 'the type of the `classes` prop' };
  }
  return {
    classDefinitions: extractClassesFromInterface(
      typescriptProject,
      projectSettings,
      componentName,
      muiName,
      symbols,
    ),
    classesLocation: `the \`${componentName}Classes\` interface`,
  };
}

/**
 * Gets class names and descriptions from the {ComponentName}Classes interface.
 */
function extractClassesFromInterface(
  typescriptProject: TypeScriptProject,
  projectSettings: ProjectSettings,
  componentName: string,
  muiName: string,
  symbols: Map<string, ts.Symbol>,
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
      if (isHiddenFromApiDocs(tags)) {
        return;
      }
      symbols.set(symbol.name, symbol);
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
  symbols: Map<string, ts.Symbol>,
): ComponentClassDefinition[] | null {
  const declaration = getComponentDeclaration(typescriptProject, componentName);

  if (!declaration) {
    throw new Error(
      `No export found in "${typescriptProject.rootPath}" for component "${componentName}" or "Unstable_${componentName}".`,
    );
  }

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
    const type = typescriptProject.checker.getTypeAtLocation(propType.symbol.declarations![0]);
    removeUndefinedFromType(type)
      ?.getProperties()
      .forEach((property) => {
        const tags = getSymbolJSDocTags(property);
        if (isHiddenFromApiDocs(tags)) {
          return;
        }
        const description = getSymbolDescription(property, typescriptProject);
        symbols.set(property.escapedName.toString(), property);
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
  slotsInterfaceName: string,
  symbols: Map<string, ts.Symbol>,
): Record<string, Slot> {
  const exportedSymbol = project.exports[slotsInterfaceName];

  const hasSlotsProp = (): boolean => {
    const declaration = getComponentDeclaration(project, componentName);
    if (!declaration) {
      return false;
    }

    const slotsProp = getPropsFromComponentNode({
      node: declaration,
      project,
      shouldInclude: ({ name }) => name === 'slots',
      checkDeclarations: true,
    })?.props.slots;

    return slotsProp != null;
  };

  if (!exportedSymbol) {
    if (hasSlotsProp()) {
      console.warn(
        `Component "${componentName}" has a "slots" prop but is missing the "${slotsInterfaceName}" export.`,
      );
    }
    return {};
  }

  if (!hasSlotsProp()) {
    console.warn(
      `"${slotsInterfaceName}" is exported but component "${componentName}" has no "slots" prop.`,
    );
  }

  const type = project.checker.getDeclaredTypeOfSymbol(exportedSymbol);
  const typeDeclaration = type?.symbol?.declarations?.[0];

  if (!typeDeclaration || !ts.isInterfaceDeclaration(typeDeclaration)) {
    return {};
  }

  const slots: Record<string, Slot> = {};
  const propertiesOnProject = type.getProperties();
  const classDefMap = new Map(classDefinitions.map((classDef) => [classDef.key, classDef]));

  propertiesOnProject.forEach((propertySymbol) => {
    const tags = getSymbolJSDocTags(propertySymbol);
    if (isHiddenFromApiDocs(tags)) {
      return;
    }
    const slotName = propertySymbol.name;
    const slotClassDefinition = classDefMap.get(slotName);
    symbols.set(slotName, propertySymbol);

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
