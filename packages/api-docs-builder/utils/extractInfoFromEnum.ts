import { Symbol, isPropertySignature, isEnumDeclaration, forEachChild, Node } from 'typescript';
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
  sourceFileNamePattern: RegExp,
  project: TypeScriptProject,
): Promise<ParsedProperty[]> => {
  // Generate the params
  let result: ParsedProperty[] = [];
  try {
    const declarationCandidates = project.program
      .getSourceFiles()
      .filter((file) => sourceFileNamePattern.test(file.fileName));

    let enumSymbol: Symbol | null = null;
    declarationCandidates.forEach((file) => {
      forEachChild(file, (node: Node) => {
        if (isEnumDeclaration(node) && node.name.getText() === typeName) {
          enumSymbol = project.checker.getSymbolAtLocation(node.name)!;
        }
      });
    });

    if (!enumSymbol) {
      return [];
    }

    const type = project.checker.getDeclaredTypeOfSymbol(enumSymbol!);

    // @ts-ignore
    const typeDeclaration = type?.types ?? [type];
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
