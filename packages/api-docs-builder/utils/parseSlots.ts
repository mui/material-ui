import * as ts from 'typescript';
import {
  getSymbolDescription,
  getSymbolJSDocTags,
  stringifySymbol,
} from '../ApiBuilders/HookApiBuilder';
import { TypeScriptProject } from './createTypeScriptProject';

export interface Slot {
  name: string;
  description: string;
  typeStr: string;
  defaultValue?: string;
}

export default function parseSlots({
  project,
  componentName,
}: {
  project: TypeScriptProject;
  componentName: string;
}): Slot[] {
  // Generate the params
  let result: Slot[] = [];
  const interfaceName = `${componentName}Slots`;

  try {
    const exportedSymbol = project.exports[interfaceName];
    const type = project.checker.getDeclaredTypeOfSymbol(exportedSymbol);
    // @ts-ignore
    const typeDeclaration = type?.symbol?.declarations?.[0];
    if (!typeDeclaration || !ts.isInterfaceDeclaration(typeDeclaration)) {
      return [];
    }

    const slots: Record<string, Slot> = {};
    // @ts-ignore
    const propertiesOnProject = type.getProperties();

    // @ts-ignore
    propertiesOnProject.forEach((propertySymbol) => {
      const tags = getSymbolJSDocTags(propertySymbol);
      if (tags.ignore) {
        return;
      }

      slots[propertySymbol.name] = {
        name: propertySymbol.name,
        description: getSymbolDescription(propertySymbol, project),
        defaultValue: tags.default?.text?.[0].text,
        typeStr: stringifySymbol(propertySymbol, project),
      };
    });

    result = Object.values(slots).sort((a, b) => a.name.localeCompare(b.name));
  } catch (e) {
    console.error(`No declaration for ${interfaceName}`);
  }

  return result;
}
