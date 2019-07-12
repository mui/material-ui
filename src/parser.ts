import * as ts from 'typescript';
import * as t from './types';

/**
 * A wrapper for `ts.createProgram`
 * @param files The files to later be parsed with `parseFromProgram`
 * @param options The options to pass to the compiler
 */
export function createProgram(files: string[], options: ts.CompilerOptions) {
  return ts.createProgram(files, options);
}

/**
 * Creates a program, parses the specified file and returns the PropTypes as an AST, if you need to parse more than one file
 * use `createProgram` and `parseFromProgram` for better performance
 * @param filePath The file to parse
 * @param options The options from `loadConfig`
 */
export function parseFile(filePath: string, options: ts.CompilerOptions) {
  const program = ts.createProgram([filePath], options);
  return parseFromProgram(filePath, program);
}

/**
 * Parses the specified file and returns the PropTypes as an AST
 * @param filePath The file to get the PropTypes from
 * @param program The program object returned by `createProgram`
 */
export function parseFromProgram(filePath: string, program: ts.Program) {
  const checker = program.getTypeChecker();
  const sourceFile = program.getSourceFile(filePath);

  const programNode = t.programNode();
  const reactImports: string[] = [];

  if (sourceFile) {
    ts.forEachChild(sourceFile, visitImports);
    ts.forEachChild(sourceFile, visit);
  } else {
    throw new Error(`Program doesn't contain file "${filePath}"`);
  }

  return programNode;

  function visitImports(node: ts.Node) {
    if (
      ts.isImportDeclaration(node) &&
      ts.isStringLiteral(node.moduleSpecifier) &&
      node.moduleSpecifier.text === 'react' &&
      node.importClause
    ) {
      const imports = ['Component', 'PureComponent', 'memo'];

      // import x from 'react'
      if (node.importClause.name) {
        const nameText = node.importClause.name.text;
        reactImports.push(...imports.map(x => `${nameText}.${x}`));
      }

      // import {x, y as z} from 'react'
      const bindings = node.importClause.namedBindings;
      if (bindings) {
        if (ts.isNamedImports(bindings)) {
          bindings.elements.forEach(spec => {
            const nameIdentifier = spec.propertyName || spec.name;
            const nameText = nameIdentifier.getText();
            if (imports.includes(nameText)) {
              reactImports.push(spec.name.getText());
            }
          });
        }
        // import * as x from 'react'
        else {
          const nameText = bindings.name.text;
          reactImports.push(...imports.map(x => `${nameText}.${x}`));
        }
      }
    }
  }

  function visit(node: ts.Node) {
    // function x(props: type) { return <div/> }
    if (ts.isFunctionDeclaration(node) && node.name && node.parameters.length === 1) {
      parseFunctionComponent(node);
    }
    // const x = ...
    else if (ts.isVariableStatement(node)) {
      ts.forEachChild(node.declarationList, variableNode => {
        // x = (props: type) => { return <div/> }
        // x = function(props: type) { return <div/> }
        // x = function y(props: type) { return <div/> }
        // x = react.memo((props:type) { return <div/> })

        if (
          ts.isVariableDeclaration(variableNode) &&
          variableNode.name &&
          variableNode.initializer
        ) {
          if (
            (ts.isArrowFunction(variableNode.initializer) ||
              ts.isFunctionExpression(variableNode.initializer)) &&
            variableNode.initializer.parameters.length === 1
          ) {
            parseFunctionComponent(variableNode);
          }
          // x = react.memo((props:type) { return <div/> })
          else if (
            ts.isCallExpression(variableNode.initializer) &&
            variableNode.initializer.arguments.length > 0
          ) {
            const callString = variableNode.initializer.expression.getText();
            const arg = variableNode.initializer.arguments[0];
            if (
              reactImports.includes(callString) &&
              (ts.isArrowFunction(arg) || ts.isFunctionExpression(arg)) &&
              arg.parameters.length > 0
            ) {
              const symbol = checker.getSymbolAtLocation(arg.parameters[0].name);
              if (symbol) {
                parsePropsType(
                  variableNode.name.getText(),
                  checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration),
                );
              }
            }
          }
        }
      });
    } else if (
      ts.isClassDeclaration(node) &&
      node.name &&
      node.heritageClauses &&
      node.heritageClauses.length === 1
    ) {
      const heritage = node.heritageClauses[0];
      if (heritage.types.length !== 1) return;

      const arg = heritage.types[0];
      if (!arg.typeArguments) return;

      if (reactImports.includes(arg.expression.getText())) {
        parsePropsType(node.name.getText(), checker.getTypeAtLocation(arg.typeArguments[0]));
      }
    }
  }

  function parseFunctionComponent(node: ts.VariableDeclaration | ts.FunctionDeclaration) {
    if (!node.name) {
      return;
    }

    const symbol = checker.getSymbolAtLocation(node.name);
    if (!symbol) {
      return;
    }

    const signature = checker
      .getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration)
      .getCallSignatures()[0];

    const rawReturnType = signature.getReturnType();
    if (!rawReturnType.symbol) {
      return;
    }

    const returnType = checker.getFullyQualifiedName(rawReturnType.symbol);

    if (returnType !== 'global.JSX.Element' && returnType !== 'React.ReactElement') {
      return;
    }

    const type = checker.getTypeOfSymbolAtLocation(
      signature.parameters[0],
      signature.parameters[0].valueDeclaration,
    );

    parsePropsType(node.name.getText(), type);
  }

  function parsePropsType(name: string, type: ts.Type) {
    const properties = type.getProperties();
    if (properties.length === 0) {
      return;
    }

    programNode.body.push(t.componentNode(name, properties.map(checkSymbol)));
  }

  function checkSymbol(symbol: ts.Symbol): t.PropTypeNode {
    const locations = symbol.getDeclarations();
    if (!locations) {
      console.error('No types found');
      return t.propTypeNode(symbol.getName(), getDocumentation(symbol), t.anyNode());
    }

    // The proptypes aren't detailed enough that we need all the different combinations
    // So we just pick the first and ignore the rest
    const type = checker.getTypeOfSymbolAtLocation(symbol, locations[0]);
    return t.propTypeNode(symbol.getName(), getDocumentation(symbol), checkType(type));
  }

  function checkType(type: ts.Type): t.Node {
    {
      const typeNode = type as any;

      const symbol = typeNode.aliasSymbol ? typeNode.aliasSymbol : typeNode.symbol;
      const name = symbol ? checker.getFullyQualifiedName(symbol) : null;
      switch (name) {
        case 'global.JSX.Element':
        case 'React.ReactElement': {
          return t.elementNode('element');
        }
        case 'React.ReactNode': {
          return t.unionNode([t.elementNode('node'), t.undefinedNode()]);
        }
      }
    }

    // @ts-ignore - Private method
    if (checker.isArrayType(type)) {
      // @ts-ignore - Private method
      const arrayType: ts.Type = checker.getElementTypeOfArrayType(type);
      return t.arrayNode(checkType(arrayType));
    }

    if (type.isUnion()) {
      return t.unionNode(type.types.map(checkType));
    }

    if (type.flags & ts.TypeFlags.String) {
      return t.stringNode();
    }

    if (type.flags & ts.TypeFlags.Number) {
      return t.numericNode();
    }

    if (type.flags & ts.TypeFlags.Undefined) {
      return t.undefinedNode();
    }

    if (type.flags & ts.TypeFlags.Object) {
      return type.getCallSignatures().length === 0 ? t.objectNode() : t.functionNode();
    }

    if (type.flags & ts.TypeFlags.Any) {
      return t.anyNode();
    }

    if (type.flags & ts.TypeFlags.Literal) {
      if (type.isLiteral()) {
        return t.literalNode(
          type.isStringLiteral() ? `"${type.value}"` : type.value,
          getDocumentation(type.symbol),
        );
      }
      return t.literalNode(checker.typeToString(type));
    }

    if (type.flags & ts.TypeFlags.NonPrimitive && checker.typeToString(type) === 'object') {
      return t.objectNode();
    }

    if (type.flags & ts.TypeFlags.Null) {
      return t.literalNode('null');
    }

    // {foo: string} & {bar: string}
    if (type.isIntersection()) {
      return t.objectNode();
    }

    if (type.flags & ts.TypeFlags.Unknown) {
      return t.anyNode();
    }

    console.warn(
      `Unable to handle node of type "ts.TypeFlags.${ts.TypeFlags[type.flags]}", using any`,
    );
    return t.anyNode();
  }

  function getDocumentation(symbol?: ts.Symbol): string | undefined {
    if (!symbol) {
      return undefined;
    }

    const comment = ts.displayPartsToString(symbol.getDocumentationComment(checker));
    if (comment) {
      return comment.replace(/(\r?\n)/, '$1* ');
    }
    return undefined;
  }
}
