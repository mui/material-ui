import * as ts from 'typescript';
import { TypeScriptProject } from './createTypeScriptProject';

export interface ParsedProp {
  /**
   * If `true`, some signatures do not contain this property.
   * e.g: `id` in `{ id: number, value: string } | { value: string }`
   */
  onlyUsedInSomeSignatures: boolean;
  signatures: { symbol: ts.Symbol; type: ts.Type }[];
}

export interface ParsedComponent {
  name: string;
  location: ts.Node;
  type: ts.Type;
  sourceFile: ts.SourceFile | undefined;
  props: Record<string, ParsedProp>;
}

function isTypeJSXElementLike(type: ts.Type, project: TypeScriptProject): boolean {
  if (type.isUnion()) {
    return type.types.every(
      // eslint-disable-next-line no-bitwise
      (subType) => subType.flags & ts.TypeFlags.Null || isTypeJSXElementLike(subType, project),
    );
  }
  if (type.symbol) {
    const name = project.checker.getFullyQualifiedName(type.symbol);
    return (
      // Remove once global JSX namespace is no longer used by React
      name === 'global.JSX.Element' || name === 'React.JSX.Element' || name === 'React.ReactElement'
    );
  }

  return false;
}

function parsePropsType({
  name,
  type,
  shouldInclude = () => true,
  location,
  sourceFile,
}: {
  name: string;
  type: ts.Type;
  location: ts.Node;
  shouldInclude?: (data: { name: string; depth: number }) => boolean;
  sourceFile: ts.SourceFile | undefined;
}): ParsedComponent {
  const parsedProps: Record<string, ParsedProp> = {};

  type
    .getProperties()
    .filter((property) => shouldInclude({ name: property.getName(), depth: 1 }))
    .forEach((property) => {
      parsedProps[property.getName()] = {
        signatures: [
          {
            symbol: property,
            type,
          },
        ],
        onlyUsedInSomeSignatures: false,
      };
    });

  return {
    name,
    location,
    type,
    sourceFile,
    props: parsedProps,
  };
}

function parseFunctionComponent({
  node,
  shouldInclude,
  project,
}: {
  node: ts.VariableDeclaration | ts.FunctionDeclaration;
  shouldInclude?: (data: { name: string; depth: number }) => boolean;
  project: TypeScriptProject;
}): ParsedComponent | null {
  if (!node.name) {
    return null;
  }

  const symbol = project.checker.getSymbolAtLocation(node.name);
  if (!symbol) {
    return null;
  }
  const componentName = node.name.getText();

  // Discriminate render functions to components
  if (componentName[0].toUpperCase() !== componentName[0]) {
    return null;
  }

  const type = project.checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration!);

  let squashedParsedComponent: ParsedComponent | null = null;

  const signatures = type
    .getCallSignatures()
    .filter((signature) => isTypeJSXElementLike(signature.getReturnType(), project));

  signatures.forEach((signature) => {
    const parsedComponent = parsePropsType({
      shouldInclude,
      name: componentName,
      type: project.checker.getTypeOfSymbolAtLocation(
        signature.parameters[0],
        signature.parameters[0].valueDeclaration!,
      ),
      location: signature.parameters[0].valueDeclaration!,
      sourceFile: node.getSourceFile(),
    });

    if (squashedParsedComponent == null) {
      squashedParsedComponent = { ...parsedComponent };
    }

    Object.keys(parsedComponent.props).forEach((propName) => {
      if (!squashedParsedComponent!.props[propName]) {
        squashedParsedComponent!.props[propName] = parsedComponent.props[propName];
      } else {
        squashedParsedComponent!.props[propName].signatures = [
          ...squashedParsedComponent!.props[propName].signatures,
          ...parsedComponent.props[propName].signatures,
        ];
      }
    });

    Object.keys(squashedParsedComponent.props).forEach((propName) => {
      squashedParsedComponent!.props[propName].onlyUsedInSomeSignatures =
        squashedParsedComponent!.props[propName].signatures.length < signatures.length;
    });
  });

  return squashedParsedComponent;
}

export interface GetPropsFromComponentDeclarationOptions {
  project: TypeScriptProject;
  node: ts.Node;
  /**
   * Called before a PropType is added to a component/object
   * @returns true to include the prop, false to skip it
   */
  shouldInclude?: (data: { name: string; depth: number }) => boolean;
  /**
   * Control if const declarations should be checked
   * @default false
   * @example declare const Component: React.JSXElementConstructor<Props>;
   */
  checkDeclarations?: boolean;
}
export function getPropsFromComponentSymbol({
  node,
  shouldInclude,
  project,
  checkDeclarations,
}: GetPropsFromComponentDeclarationOptions) {
  let parsedComponent: ParsedComponent | null = null;

  // function x(props: type) { return <div/> }
  if (
    ts.isFunctionDeclaration(node) &&
    node.name &&
    node.parameters.length === 1 &&
    project.checker
      .getTypeAtLocation(node.name)
      .getCallSignatures()
      .some((signature) => isTypeJSXElementLike(signature.getReturnType(), project))
  ) {
    parsedComponent = parseFunctionComponent({ node, shouldInclude, project });
  } else if (ts.isVariableStatement(node)) {
    // const x = ...
    ts.forEachChild(node.declarationList, (variableNode) => {
      // x = (props: type) => { return <div/> }
      // x = function(props: type) { return <div/> }
      // x = function y(props: type) { return <div/> }
      // x = react.memo((props:type) { return <div/> })
      if (ts.isVariableDeclaration(variableNode) && variableNode.name) {
        const type = project.checker.getTypeAtLocation(variableNode.name);
        if (!variableNode.initializer) {
          if (
            checkDeclarations &&
            type.aliasSymbol &&
            type.aliasTypeArguments &&
            project.checker.getFullyQualifiedName(type.aliasSymbol) ===
              'React.JSXElementConstructor'
          ) {
            const propsType = type.aliasTypeArguments[0];
            if (propsType === undefined) {
              throw new TypeError(
                'Unable to find symbol for `props`. This is a bug in typescript-to-proptypes.',
              );
            }
            parsedComponent = parsePropsType({
              name: variableNode.name.getText(),
              type: propsType,
              location: variableNode.name,
              shouldInclude,
              sourceFile: node.getSourceFile(),
            });
          } else if (checkDeclarations) {
            parsedComponent = parseFunctionComponent({
              node: variableNode,
              shouldInclude,
              project,
            });
          }
        } else if (
          (ts.isArrowFunction(variableNode.initializer) ||
            ts.isFunctionExpression(variableNode.initializer)) &&
          variableNode.initializer.parameters.length === 1
        ) {
          parsedComponent = parseFunctionComponent({
            node: variableNode,
            shouldInclude,
            project,
          });
        }
        //  x = react.memo((props:type) { return <div/> })
        else if (
          ts.isCallExpression(variableNode.initializer) &&
          variableNode.initializer.arguments.length > 0
        ) {
          const arg = variableNode.initializer.arguments[0];
          if (
            (ts.isArrowFunction(arg) || ts.isFunctionExpression(arg)) &&
            arg.parameters.length > 0
          ) {
            const symbol = project.checker.getSymbolAtLocation(arg.parameters[0].name);
            if (symbol) {
              parsedComponent = parsePropsType({
                shouldInclude,
                name: variableNode.name.getText(),
                location: symbol.valueDeclaration!,
                type: project.checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration!),
                sourceFile: node.getSourceFile(),
              });
            }
          }
        }
        // handle component factories: x = createComponent()
        else if (
          checkDeclarations &&
          variableNode.initializer &&
          type
            .getCallSignatures()
            .some((signature) => isTypeJSXElementLike(signature.getReturnType(), project))
        ) {
          parsedComponent = parseFunctionComponent({
            node: variableNode,
            shouldInclude,
            project,
          });
        }
      }

      if (
        ts.isClassDeclaration(variableNode) &&
        variableNode.name &&
        variableNode.heritageClauses &&
        variableNode.heritageClauses.length === 1
      ) {
        const heritage = variableNode.heritageClauses[0];
        if (heritage.types.length !== 1) {
          return;
        }

        const arg = heritage.types[0];
        if (!arg.typeArguments) {
          return;
        }

        parsedComponent = parsePropsType({
          shouldInclude,
          name: variableNode.name.getText(),
          location: arg.typeArguments[0],
          type: project.checker.getTypeAtLocation(arg.typeArguments[0]),
          sourceFile: node.getSourceFile(),
        });
      }
    });
  }

  return parsedComponent;
}
