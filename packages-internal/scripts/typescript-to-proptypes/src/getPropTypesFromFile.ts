import ts from 'typescript';
import * as doctrine from 'doctrine';
import {
  GetPropsFromComponentDeclarationOptions,
  getPropsFromComponentNode,
  TypeScriptProject,
} from '@mui/internal-docs-utils';
import {
  createUnionType,
  createUndefinedType,
  createAnyType,
  createElementType,
  createDOMElementType,
  createArrayType,
  createFunctionType,
  createInstanceOfType,
  createLiteralType,
  createInterfaceType,
  createNumericType,
  createObjectType,
  createStringType,
} from './createType';
import { PropTypeDefinition, PropTypesComponent, PropType } from './models';

function getSymbolFileNames(symbol: ts.Symbol): Set<string> {
  const declarations = symbol.getDeclarations() || [];

  return new Set(declarations.map((declaration) => declaration.getSourceFile().fileName));
}

function getSymbolDocumentation({
  symbol,
  project,
}: {
  symbol: ts.Symbol | undefined;
  project: TypeScriptProject;
}): string | undefined {
  if (symbol === undefined) {
    return undefined;
  }

  const decl = symbol.getDeclarations();
  if (decl) {
    // @ts-ignore
    const comments = ts.getJSDocCommentsAndTags(decl[0]) as readonly any[];
    if (comments && comments.length === 1) {
      const commentNode = comments[0];
      if (ts.isJSDoc(commentNode)) {
        return doctrine.unwrapComment(commentNode.getText()).trim();
      }
    }
  }

  const comment = ts.displayPartsToString(symbol.getDocumentationComment(project.checker));
  return comment !== '' ? comment : undefined;
}

function getType({
  project,
  symbol,
  declaration,
  location,
}: {
  project: PropTypesProject;
  symbol: ts.Symbol;
  declaration: ts.Declaration | undefined;
  location: ts.Node;
}) {
  const symbolType = declaration
    ? // The proptypes aren't detailed enough that we need all the different combinations
      // so we just pick the first and ignore the rest
      project.checker.getTypeOfSymbolAtLocation(symbol, declaration)
    : project.checker.getTypeOfSymbolAtLocation(symbol, location);

  let type: ts.Type;
  if (declaration === undefined) {
    type = symbolType;
  } else {
    const declaredType = project.checker.getTypeAtLocation(declaration);
    const baseConstraintOfType = project.checker.getBaseConstraintOfType(declaredType);

    if (baseConstraintOfType === undefined || baseConstraintOfType === declaredType) {
      type = symbolType;
    }
    // get `React.ElementType` from `C extends React.ElementType`
    else if (baseConstraintOfType.aliasSymbol?.escapedName === 'ElementType') {
      type = baseConstraintOfType;
    } else {
      type = symbolType;
    }
  }

  if (!type) {
    throw new Error('No types found');
  }

  return type;
}

function checkType({
  type,
  location,
  typeStack,
  name,
  project,
}: {
  type: ts.Type;
  location: ts.Node;
  typeStack: readonly number[];
  name: string;
  project: PropTypesProject;
}): PropType {
  // If the typeStack contains type.id we're dealing with an object that references itself.
  // To prevent getting stuck in an infinite loop we just set it to an createObjectType
  if (typeStack.includes((type as any).id)) {
    return createObjectType({ jsDoc: undefined });
  }

  const typeNode = type as any;
  const symbol = typeNode.aliasSymbol ? typeNode.aliasSymbol : typeNode.symbol;
  const jsDoc = getSymbolDocumentation({ symbol, project });

  {
    const typeName = symbol ? project.checker.getFullyQualifiedName(symbol) : null;

    switch (typeName) {
      // Remove once global JSX namespace is no longer used by React
      case 'global.JSX.Element':
      case 'React.JSX.Element':
      case 'React.ReactElement': {
        return createElementType({ jsDoc, elementType: 'element' });
      }
      case 'React.ComponentType':
      case 'React.ElementType': {
        return createElementType({
          jsDoc,
          elementType: 'elementType',
        });
      }
      case 'React.ReactNode': {
        return createUnionType({
          jsDoc,
          types: [
            createElementType({ elementType: 'node', jsDoc: undefined }),
            createUndefinedType({ jsDoc: undefined }),
          ],
        });
      }
      case 'React.Component': {
        return createInstanceOfType({ jsDoc, instance: typeName });
      }
      case 'Element':
      case 'HTMLElement': {
        return createDOMElementType({ jsDoc, optional: undefined });
      }
      case 'RegExp': {
        return createInstanceOfType({ jsDoc, instance: 'RegExp' });
      }
      case 'URL': {
        return createInstanceOfType({ jsDoc, instance: 'URL' });
      }
      case 'URLSearchParams': {
        return createInstanceOfType({ jsDoc, instance: 'URLSearchParams' });
      }
      case 'Date': {
        if (!project.shouldUseObjectForDate?.({ name })) {
          return createInstanceOfType({ jsDoc, instance: 'Date' });
        }

        return createObjectType({ jsDoc });
      }
      default:
        // continue with function execution
        break;
    }
  }

  if (project.checker.isArrayType(type)) {
    // @ts-ignore
    const arrayType: ts.Type = project.checker.getElementTypeOfArrayType(type);

    return createArrayType({
      arrayType: checkType({ type: arrayType, location, typeStack, name, project }),
      jsDoc,
    });
  }

  const isTupleType = project.checker.isTupleType(type);
  if (isTupleType) {
    return createArrayType({
      arrayType: createUnionType({
        jsDoc: undefined,
        types: (type as any).typeArguments.map((x: ts.Type) =>
          checkType({ type: x, location, typeStack, name, project }),
        ),
      }),
      jsDoc,
    });
  }

  if (type.isUnion()) {
    const node = createUnionType({
      jsDoc,
      types: type.types.map((x) => checkType({ type: x, location, typeStack, name, project })),
    });

    return node.types.length === 1 ? node.types[0] : node;
  }

  if (type.flags & ts.TypeFlags.TypeParameter) {
    const baseConstraintOfType = project.checker.getBaseConstraintOfType(type);

    if (baseConstraintOfType) {
      if (
        baseConstraintOfType.flags & ts.TypeFlags.Object &&
        baseConstraintOfType.symbol.members?.size === 0
      ) {
        return createAnyType({ jsDoc });
      }

      return checkType({ type: baseConstraintOfType!, location, typeStack, name, project });
    }
  }

  if (type.flags & ts.TypeFlags.String) {
    return createStringType({ jsDoc });
  }

  if (type.flags & ts.TypeFlags.Number) {
    return createNumericType({ jsDoc });
  }

  if (type.flags & ts.TypeFlags.Undefined) {
    return createUndefinedType({ jsDoc });
  }

  if (type.flags & ts.TypeFlags.Any || type.flags & ts.TypeFlags.Unknown) {
    return createAnyType({ jsDoc });
  }

  if (type.flags & ts.TypeFlags.Literal) {
    if (type.isLiteral()) {
      return createLiteralType({
        value: type.isStringLiteral() ? `"${type.value}"` : type.value,
        jsDoc,
      });
    }
    return createLiteralType({
      jsDoc,
      value: project.checker.typeToString(type),
    });
  }

  if (type.flags & ts.TypeFlags.Null) {
    return createLiteralType({ jsDoc, value: 'null' });
  }

  if (type.flags & ts.TypeFlags.IndexedAccess) {
    const objectType = (type as ts.IndexedAccessType).objectType;

    if (objectType.flags & ts.TypeFlags.Conditional) {
      const node = createUnionType({
        jsDoc,
        types: [
          (objectType as ts.ConditionalType).resolvedTrueType,
          (objectType as ts.ConditionalType).resolvedFalseType,
        ]
          .map((resolveType) => resolveType?.getProperty(name))
          .filter((propertySymbol): propertySymbol is ts.Symbol => !!propertySymbol)
          .map((propertySymbol) =>
            checkType({
              type: getType({
                project,
                symbol: propertySymbol,
                declaration: propertySymbol.declarations?.[0],
                location,
              }),
              location,
              typeStack,
              name,
              project,
            }),
          ),
      });

      return node.types.length === 1 ? node.types[0] : node;
    }
  }

  if (type.getCallSignatures().length) {
    return createFunctionType({ jsDoc });
  }

  // () => new ClassInstance
  if (type.getConstructSignatures().length) {
    return createFunctionType({ jsDoc });
  }

  // Object-like type
  {
    const properties = type.getProperties();
    if (properties.length) {
      if (
        project.shouldResolveObject({
          name,
          propertyCount: properties.length,
          depth: typeStack.length,
        })
      ) {
        const filtered = properties.filter((x) =>
          project.shouldInclude({ name: x.getName(), depth: typeStack.length + 1 }),
        );
        if (filtered.length > 0) {
          return createInterfaceType({
            jsDoc,
            types: filtered.map((x) => {
              const definition = checkSymbol({
                symbol: x,
                location,
                project,
                typeStack: [...typeStack, (type as any).id],
              });
              definition.propType.jsDoc = definition.jsDoc;

              return [definition.name, definition.propType];
            }),
          });
        }
      }

      return createObjectType({ jsDoc });
    }
  }

  // Object without properties or object keyword
  if (
    type.flags & ts.TypeFlags.Object ||
    (type.flags & ts.TypeFlags.NonPrimitive && project.checker.typeToString(type) === 'object')
  ) {
    return createObjectType({ jsDoc });
  }

  console.warn(
    `${project.reactComponentName}: Unable to handle node of type "ts.TypeFlags.${
      ts.TypeFlags[type.flags]
    }", using any`,
  );
  return createAnyType({ jsDoc });
}

function checkSymbol({
  project,
  symbol,
  location,
  typeStack,
}: {
  project: PropTypesProject;
  symbol: ts.Symbol;
  location: ts.Node;
  typeStack: readonly number[];
}): PropTypeDefinition {
  const declarations = symbol.getDeclarations();
  const declaration = declarations && declarations[0];
  const symbolFilenames = getSymbolFileNames(symbol);
  const jsDoc = getSymbolDocumentation({ symbol, project });

  // TypeChecker keeps the name for
  // { a: React.ElementType, b: React.ReactElement | boolean }
  // but not
  // { a?: React.ElementType, b: React.ReactElement }
  // get around this by not using the TypeChecker
  if (
    declaration &&
    ts.isPropertySignature(declaration) &&
    declaration.type &&
    ts.isTypeReferenceNode(declaration.type)
  ) {
    const name = declaration.type.typeName.getText();
    if (
      name === 'React.ElementType' ||
      name === 'React.ComponentType' ||
      name === 'React.JSXElementConstructor' ||
      name === 'React.ReactElement'
    ) {
      const elementNode = createElementType({
        elementType: name === 'React.ReactElement' ? 'element' : 'elementType',
        jsDoc,
      });

      return {
        $$id: project.createPropTypeId(symbol),
        name: symbol.getName(),
        jsDoc,
        filenames: symbolFilenames,
        propType: declaration.questionToken
          ? createUnionType({
              jsDoc: elementNode.jsDoc,
              types: [
                createUndefinedType({ jsDoc: undefined }),
                {
                  ...elementNode,
                  // jsDoc was hoisted to the union type
                  jsDoc: undefined,
                },
              ],
            })
          : elementNode,
      };
    }
  }

  const type = getType({ project, symbol, declaration, location });

  // Typechecker only gives the type "any" if it's present in a union
  // This means the type of "a" in {a?:any} isn't "any | undefined"
  // So instead we check for the questionmark to detect optional types
  let parsedType: PropType | undefined;
  if (
    (type.flags & ts.TypeFlags.Any || type.flags & ts.TypeFlags.Unknown) &&
    declaration &&
    ts.isPropertySignature(declaration)
  ) {
    parsedType =
      symbol.flags & ts.SymbolFlags.Optional
        ? createUnionType({
            jsDoc,
            types: [createUndefinedType({ jsDoc: undefined }), createAnyType({ jsDoc: undefined })],
          })
        : createAnyType({ jsDoc });
  } else {
    parsedType = checkType({ type, location, typeStack, name: symbol.getName(), project });
  }

  return {
    $$id: project.createPropTypeId(type),
    name: symbol.getName(),
    jsDoc,
    propType: parsedType,
    filenames: symbolFilenames,
  };
}

/**
 * Squashes props from:
 * { variant: 'a', href: string } & { variant: 'b' }
 * Into:
 * { variant: 'a' | 'b', href?: string }
 */
function squashPropTypeDefinitions({
  propTypeDefinitions,
  onlyUsedInSomeSignatures,
}: {
  propTypeDefinitions: PropTypeDefinition[];
  onlyUsedInSomeSignatures: boolean;
}): PropTypeDefinition {
  const distinctDefinitions = new Map<number, PropTypeDefinition>();
  propTypeDefinitions.forEach((definition) => {
    if (!distinctDefinitions.has(definition.$$id)) {
      distinctDefinitions.set(definition.$$id, definition);
    }
  });

  if (distinctDefinitions.size === 1 && !onlyUsedInSomeSignatures) {
    return propTypeDefinitions[0];
  }

  const definitions = Array.from(distinctDefinitions.values());
  const types = definitions.map((definition) => definition.propType);
  if (onlyUsedInSomeSignatures) {
    types.push(createUndefinedType({ jsDoc: undefined }));
  }

  return {
    name: definitions[0].name,
    jsDoc: definitions[0].jsDoc,
    propType: createUnionType({
      // TODO: jsDoc from squashing is dropped
      jsDoc: undefined,
      types,
    }),
    filenames: new Set(definitions.flatMap((definition) => Array.from(definition.filenames))),
    $$id: definitions[0].$$id,
  };
}

function generatePropTypesFromNode(
  params: Omit<GetPropsFromComponentDeclarationOptions, 'project'> & { project: PropTypesProject },
): PropTypesComponent | null {
  const parsedComponent = getPropsFromComponentNode(params);
  if (parsedComponent == null) {
    return null;
  }

  const propsFilename =
    parsedComponent.sourceFile !== undefined ? parsedComponent.sourceFile.fileName : undefined;

  const types = Object.values(parsedComponent.props).map((prop) => {
    const propTypeDefinitions = prop.signatures.map(({ symbol, componentType }) =>
      checkSymbol({
        symbol,
        project: params.project,
        location: parsedComponent.location,
        typeStack: [(componentType as any).id],
      }),
    );

    return squashPropTypeDefinitions({
      propTypeDefinitions,
      onlyUsedInSomeSignatures: prop.onlyUsedInSomeSignatures,
    });
  });

  return {
    name: parsedComponent.name,
    types,
    propsFilename,
  };
}

export function getPropTypesFromFile({
  filePath,
  project,
  shouldInclude: inShouldInclude,
  shouldResolveObject: inShouldResolveObject,
  shouldUseObjectForDate,
  checkDeclarations,
}: GetPropTypesFromFileOptions) {
  const sourceFile = project.program.getSourceFile(filePath);
  const reactComponentName = filePath.match(/.*\/([^/]+)/)?.[1];
  const components: PropTypesComponent[] = [];
  const sigilIds: Map<ts.Symbol | ts.Type, number> = new Map();
  /**
   *
   * @param sigil - Prefer ts.Type if available since these are re-used in the type checker. Symbols (especially those for literals) are oftentimes re-created on every usage.
   */
  function createPropTypeId(sigil: ts.Symbol | ts.Type) {
    if (!sigilIds.has(sigil)) {
      sigilIds.set(sigil, sigilIds.size);
    }

    return sigilIds.get(sigil)!;
  }

  const shouldResolveObject: PropTypesProject['shouldResolveObject'] = (data) => {
    if (inShouldResolveObject) {
      const result = inShouldResolveObject(data);
      if (result !== undefined) {
        return result;
      }
    }

    return data.propertyCount <= 50 && data.depth <= 3;
  };

  const shouldInclude: PropTypesProject['shouldInclude'] = (data): boolean => {
    // ref is a reserved prop name in React
    // for example https://github.com/reactjs/rfcs/pull/107
    // no need to add a prop-type
    if (data.name === 'ref') {
      return false;
    }

    if (inShouldInclude) {
      const result = inShouldInclude(data);
      if (result !== undefined) {
        return result;
      }
    }

    return true;
  };

  const propTypesProject: PropTypesProject = {
    ...project,
    reactComponentName,
    shouldResolveObject,
    shouldUseObjectForDate,
    shouldInclude,
    createPropTypeId,
  };

  if (sourceFile) {
    ts.forEachChild(sourceFile, (node) => {
      const component = generatePropTypesFromNode({
        project: propTypesProject,
        node,
        shouldInclude,
        checkDeclarations,
      });
      if (component != null) {
        components.push(component);
      }
    });
  } else {
    throw new Error(`Program doesn't contain file "${filePath}"`);
  }

  return components;
}

export interface GetPropTypesFromFileOptions
  extends Pick<
    GetPropsFromComponentDeclarationOptions,
    'shouldInclude' | 'project' | 'checkDeclarations'
  > {
  filePath: string;
  /**
   * Called before the shape of an object is resolved
   * @returns true to resolve the shape of the object, false to just use a object, or undefined to
   * use the default behavior
   * @default propertyCount <= 50 && depth <= 3
   */
  shouldResolveObject?: (data: {
    name: string;
    propertyCount: number;
    depth: number;
  }) => boolean | undefined;
  /**
   * Called to know if a date should be represented as `PropTypes.object` or `PropTypes.instanceOf(Date)
   * @returns true to use `PropTypes.object`, false to use `PropTypes.instanceOf(Date)`.
   * @default false
   */
  shouldUseObjectForDate?: (data: { name: string }) => boolean;
}

interface PropTypesProject extends TypeScriptProject {
  reactComponentName: string | undefined;
  shouldResolveObject: NonNullable<GetPropTypesFromFileOptions['shouldResolveObject']>;
  shouldUseObjectForDate: GetPropTypesFromFileOptions['shouldUseObjectForDate'];
  shouldInclude: NonNullable<GetPropTypesFromFileOptions['shouldInclude']>;
  createPropTypeId: (sigil: ts.Symbol | ts.Type) => number;
}
