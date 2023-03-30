import * as ts from 'typescript';
import { TypeScriptProject } from './createTypeScriptProject';
import resolveExportSpecifier from './resolveExportSpecifier';

export interface ParsedProp {
  types: ts.Type[];
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
    return name === 'global.JSX.Element' || name === 'React.ReactElement';
  }

  return false;
}

function parsePropsSymbol({
  symbol,
  location,
  shouldInclude = () => true,
  project,
}: {
  symbol: ts.Symbol | undefined;
  location: ts.Node;
  shouldInclude: (data: { name: string; depth: number }) => boolean;
  project: TypeScriptProject;
}): Record<string, ParsedProp> {
  const type =
    symbol === undefined
      ? project.checker.getTypeAtLocation(location)
      : project.checker.getTypeOfSymbolAtLocation(symbol, location);

  const parsedProps: Record<string, ParsedProp> = {};

  type
    .getProperties()
    .filter((property) => shouldInclude({ name: property.getName(), depth: 1 }))
    .forEach((property) => {
      parsedProps[property.getName()] = {
        types: [project.checker.getTypeAtLocation(property.declarations?.[0]!)],
      };
    });

  return parsedProps;
}

function parseFunctionComponent({
  declaration,
  shouldInclude,
  project,
}: {
  declaration: ts.VariableDeclaration | ts.FunctionDeclaration;
  shouldInclude: (data: { name: string; depth: number }) => boolean;
  project: TypeScriptProject;
}) {
  if (!declaration.name) {
    return null;
  }

  const symbol = project.checker.getSymbolAtLocation(declaration.name);
  if (!symbol) {
    return null;
  }
  const componentName = declaration.name.getText();

  // Discriminate render functions to components
  if (componentName[0].toUpperCase() !== componentName[0]) {
    return null;
  }

  const type = project.checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration!);

  // squash props
  // { variant: 'a', href: string } & { variant: 'b' }
  // to
  // { variant: 'a' | 'b', href?: string }

  const squashedProps: Record<string, ParsedProp> = {};

  type.getCallSignatures().forEach((signature) => {
    if (!isTypeJSXElementLike(signature.getReturnType(), project)) {
      return;
    }

    const signatureProps = parsePropsSymbol({
      symbol: signature.parameters[0],
      location: signature.parameters[0].valueDeclaration!,
      shouldInclude,
      project,
    });

    Object.keys(signatureProps).forEach((propName) => {
      if (!squashedProps[propName]) {
        squashedProps[propName] = signatureProps[propName];
      } else {
        squashedProps[propName] = {
          ...squashedProps[propName],
          types: [...squashedProps[propName].types, ...signatureProps[propName].types],
        };
      }
    });
  });

  return squashedProps;
}

interface GetPropsFromComponentDeclarationOptions {
  project: TypeScriptProject;
  symbol: ts.Symbol;
  /**
   * Called before a PropType is added to a component/object
   * @returns true to include the prop, false to skip it
   */
  shouldInclude: (data: { name: string; depth: number }) => boolean;
}
export default function getPropsFromComponentSymbol({
  symbol: inSymbol,
  shouldInclude,
  project,
}: GetPropsFromComponentDeclarationOptions) {
  const localeSymbol = resolveExportSpecifier(inSymbol, project);
  const declaration = localeSymbol.valueDeclaration!;

  // function x(props: type) { return <div/> }
  if (
    ts.isFunctionDeclaration(declaration) &&
    declaration.name &&
    declaration.parameters.length === 1 &&
    project.checker
      .getTypeAtLocation(declaration.name)
      .getCallSignatures()
      .some((signature) => isTypeJSXElementLike(signature.getReturnType(), project))
  ) {
    return parseFunctionComponent({ declaration, shouldInclude, project });
  }

  // x = (props: type) => { return <div/> }
  // x = function(props: type) { return <div/> }
  // x = function y(props: type) { return <div/> }
  // x = react.memo((props:type) { return <div/> })
  if (ts.isVariableDeclaration(declaration) && declaration.name) {
    const type = project.checker.getTypeAtLocation(declaration.name);
    if (!declaration.initializer) {
      if (
        type.aliasSymbol &&
        type.aliasTypeArguments &&
        project.checker.getFullyQualifiedName(type.aliasSymbol) === 'React.JSXElementConstructor'
      ) {
        const propsSymbol = type.aliasTypeArguments[0].getSymbol();
        if (propsSymbol === undefined) {
          throw new TypeError(
            'Unable to find symbol for `props`. This is a bug in typescript-to-proptypes.',
          );
        }
        return parsePropsSymbol({
          symbol: propsSymbol,
          location: declaration.name,
          shouldInclude,
          project,
        });
      }

      return parseFunctionComponent({ declaration, shouldInclude, project });
    }
    if (
      (ts.isArrowFunction(declaration.initializer) ||
        ts.isFunctionExpression(declaration.initializer)) &&
      declaration.initializer.parameters.length === 1
    ) {
      return parseFunctionComponent({ declaration, shouldInclude, project });
    }
    //  x = react.memo((props:type) { return <div/> })
    if (
      ts.isCallExpression(declaration.initializer) &&
      declaration.initializer.arguments.length > 0
    ) {
      const arg = declaration.initializer.arguments[0];
      if ((ts.isArrowFunction(arg) || ts.isFunctionExpression(arg)) && arg.parameters.length > 0) {
        const symbol = project.checker.getSymbolAtLocation(arg.parameters[0].name);
        if (symbol) {
          return parsePropsSymbol({
            symbol,
            location: symbol.valueDeclaration!,
            shouldInclude,
            project,
          });
        }
      }

      return null;
    }
    // handle component factories: x = createComponent()
    if (
      type
        .getCallSignatures()
        .some((signature) => isTypeJSXElementLike(signature.getReturnType(), project))
    ) {
      return parseFunctionComponent({ declaration, shouldInclude, project });
    }

    return null;
  }

  if (
    ts.isClassDeclaration(declaration) &&
    declaration.name &&
    declaration.heritageClauses &&
    declaration.heritageClauses.length === 1
  ) {
    const heritage = declaration.heritageClauses[0];
    if (heritage.types.length !== 1) {
      return null;
    }

    const arg = heritage.types[0];
    if (!arg.typeArguments) {
      return null;
    }

    return parsePropsSymbol({
      symbol: undefined,
      location: arg.typeArguments[0],
      shouldInclude,
      project,
    });
  }

  return null;
}
