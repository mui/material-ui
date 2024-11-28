import { Symbol, isPropertySignature } from 'typescript';
import { TypeScriptProject } from './createTypeScriptProject';
import { ParsedProperty } from '../types/ApiBuilder.types';
import { getSymbolDescription, getSymbolJSDocTags, stringifySymbol } from '../buildApiUtils';

const parseProperty = async (
  propertySymbol: Symbol,
  project: TypeScriptProject,
  name: string,
): Promise<ParsedProperty> => ({
  name,
  description: getSymbolDescription(propertySymbol, project),
  tags: getSymbolJSDocTags(propertySymbol),
  required: !propertySymbol.declarations?.find(isPropertySignature)?.questionToken,
  typeStr: await stringifySymbol(propertySymbol, project),
});

const extractInfoFromEnum = async (
  typeName: string,
  project: TypeScriptProject,
): Promise<ParsedProperty[]> => {
  // Generate the params
  let result: ParsedProperty[] = [];

  try {
    const exportedSymbol = project.exports[typeName];
    const type = project.checker.getDeclaredTypeOfSymbol(exportedSymbol);

    // @ts-ignore
    const typeDeclaration = type?.types;
    if (!typeDeclaration) {
      return [];
    }

    const properties: Record<string, ParsedProperty> = {};

    // @ts-ignore
    await Promise.all(
      typeDeclaration.map(async (t: any) => {
        const propertySymbol = t.symbol;
        properties[t.value] = await parseProperty(propertySymbol, project, t.value);
      }),
    );

    result = Object.values(properties)
      .filter((property) => !property.tags.ignore)
      .sort((a, b) => a.name.localeCompare(b.name));
  } catch {
    console.error(`No declaration for ${typeName}`);
  }

  return result;
};

export default extractInfoFromEnum;
