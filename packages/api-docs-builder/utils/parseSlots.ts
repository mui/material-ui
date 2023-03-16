import * as ts from 'typescript';
import { getSymbolDescription, getSymbolJSDocTags } from '../buildApiUtils';
import { TypeScriptProject } from './createTypeScriptProject';

export interface Slot {
  class: string;
  name: string;
  description: string;
  default?: string;
}

export default function parseSlots({
  project,
  componentName,
  muiName,
}: {
  project: TypeScriptProject;
  componentName: string;
  muiName: string;
}): Slot[] {
  // Generate the params
  let result: Slot[] = [];
  const slotsInterface = `${componentName}Slots`;
  try {
    const exportedSymbol = project.exports[slotsInterface];
    const type = project.checker.getDeclaredTypeOfSymbol(exportedSymbol);
    const typeDeclaration = type?.symbol?.declarations?.[0];
    if (!typeDeclaration || !ts.isInterfaceDeclaration(typeDeclaration)) {
      return [];
    }

    // Obtain an array of classes for the given component
    const classesInterface = `${componentName}Classes`;
    const classesType = project.checker.getDeclaredTypeOfSymbol(project.exports[classesInterface]);
    const classesTypeDeclaration = classesType?.symbol?.declarations?.[0];
    let classNames: string[] = [];
    if (classesTypeDeclaration && ts.isInterfaceDeclaration(classesTypeDeclaration)) {
      const classesProperties = classesType.getProperties();
      classNames = classesProperties.map((symbol) => symbol.name);
    }

    const slots: Record<string, Slot> = {};
    const propertiesOnProject = type.getProperties();

    propertiesOnProject.forEach((propertySymbol) => {
      const tags = getSymbolJSDocTags(propertySymbol);
      if (tags.ignore) {
        return;
      }
      const slotName = propertySymbol.name;
      slots[slotName] = {
        name: slotName,
        description: getSymbolDescription(propertySymbol, project),
        default: tags.default?.text?.[0].text,
        class: classNames.includes(slotName) ? `.${muiName}-${slotName}` : '',
      };
    });

    result = Object.values(slots);
  } catch (e) {
    console.error(`No declaration for ${slotsInterface}`);
  }

  return result;
}
