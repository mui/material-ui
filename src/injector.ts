import * as babel from '@babel/core';
import * as babelTypes from '@babel/types';
import * as t from './types/index';
import { generate, GenerateOptions } from './generator';

export type InjectOptions = {
  /**
   * By default all unused props are omitted from the result.
   * Set this to true to include them instead.
   */
  includeUnusedProps?: boolean;
} & Pick<GenerateOptions, 'sortProptypes' | 'includeJSDoc'>;

/**
 * Injects the PropTypes from `parse` into the provided JavaScript code
 * @param propTypes Result from `parse` to inject into the JavaScript code
 * @param target The JavaScript code to add the PropTypes to
 * @param options Options controlling the final result
 */
export function inject(
  propTypes: t.ProgramNode,
  target: string,
  options: InjectOptions = {},
): string | null {
  if (propTypes.body.length === 0) {
    return target;
  }

  const result = babel.transformSync(target, {
    plugins: [
      '@babel/plugin-syntax-class-properties',
      '@babel/plugin-syntax-jsx',
      plugin(propTypes, options),
    ],
    configFile: false,
    babelrc: false,
    retainLines: true,
  });

  return (result && result.code) || null;
}

function plugin(propTypes: t.ProgramNode, options: InjectOptions = {}): babel.PluginObj {
  const { includeUnusedProps = false, includeJSDoc = true, sortProptypes } = options;

  let importName = '';
  let needImport = false;
  let alreadyImported = false;

  return {
    visitor: {
      Program: {
        enter(path) {
          if (
            !path.node.body.some(n => {
              if (
                babelTypes.isImportDeclaration(n) &&
                n.source.value === 'prop-types' &&
                n.specifiers.length
              ) {
                importName = n.specifiers[0].local.name;
                alreadyImported = true;
                return true;
              }
            })
          ) {
            importName = 'PropTypes';
          }
        },
        exit(path) {
          if (alreadyImported || !needImport) return;

          const propTypesImport = babel.template.ast(
            `import ${importName} from 'prop-types'`,
          ) as babel.types.ImportDeclaration;

          const firstImport = path
            .get('body')
            .find(nodePath => babelTypes.isImportDeclaration(nodePath.node));

          // Insert import after the first one to avoid issues with comment flags
          if (firstImport) {
            firstImport.insertAfter(propTypesImport);
          } else {
            path.node.body = [propTypesImport, ...path.node.body];
          }
        },
      },
      FunctionDeclaration(path) {
        const { node } = path;

        // Prevent visiting again
        if ((node as any).hasBeenVisited) {
          path.skip();
          return;
        }

        if (!node.id) return;
        const props = propTypes.body.find(prop => prop.name === node.id!.name);
        if (!props) return;

        let usedProps: string[] = [];

        if (!includeUnusedProps) {
          const prop = node.params[0];
          if (babelTypes.isIdentifier(prop) || babelTypes.isObjectPattern(prop)) {
            usedProps = getUsedProps(path, prop);
          }
        }

        if (usedProps.length === 0 && !includeUnusedProps) return;

        needImport = true;

        // Prevent visiting again
        (node as any).hasBeenVisited = true;
        path.skip();

        injectPropTypes({
          nodeName: node.id.name,
          usedProps,
          path,
          props,
        });
      },
      VariableDeclarator(path) {
        const { node } = path;

        // Prevent visiting again
        if ((node as any).hasBeenVisited) {
          path.skip();
          return;
        }

        if (!babelTypes.isIdentifier(node.id)) return;
        const nodeName = node.id.name;

        const props = propTypes.body.find(prop => prop.name === nodeName);
        if (!props) return;

        if (
          babelTypes.isArrowFunctionExpression(node.init) ||
          babelTypes.isFunctionExpression(node.init)
        ) {
          getFromProp(node.init.params[0]);
        }
        // x = react.memo(props => <div/>)
        else if (babelTypes.isCallExpression(node.init)) {
          const arg = node.init.arguments[0];
          if (babelTypes.isArrowFunctionExpression(arg) || babelTypes.isFunctionExpression(arg)) {
            getFromProp(arg.params[0]);
          }
        }

        function getFromProp(prop: babelTypes.Node) {
          const usedProps =
            !includeUnusedProps &&
            (babelTypes.isIdentifier(prop) || babelTypes.isObjectPattern(prop))
              ? getUsedProps(path, prop)
              : [];

          if (usedProps.length === 0 && !includeUnusedProps) return;

          needImport = true;

          // Prevent visiting again
          (node as any).hasBeenVisited = true;
          path.skip();

          injectPropTypes({ path: path.parentPath, usedProps, props: props!, nodeName });
        }
      },
      ClassDeclaration(path) {
        const { node } = path;

        // Prevent visiting again
        if ((node as any).hasBeenVisited) {
          path.skip();
          return;
        }

        if (!babelTypes.isIdentifier(node.id)) return;
        const nodeName = node.id.name;

        const props = propTypes.body.find(prop => prop.name === nodeName);
        if (!props) return;

        const usedProps = !includeUnusedProps ? getUsedProps(path, undefined) : [];

        if (usedProps.length === 0 && !includeUnusedProps) return;

        needImport = true;

        // Prevent visiting again
        (node as any).hasBeenVisited = true;
        path.skip();

        injectPropTypes({
          nodeName,
          usedProps,
          path,
          props,
        });
      },
    },
  };

  function injectPropTypes(options: {
    path: babel.NodePath;
    usedProps: string[];
    props: t.ComponentNode;
    nodeName: string;
  }) {
    const { path, props, usedProps, nodeName } = options;

    const source = generate(props, {
      importedName: importName,
      shouldInclude: includeUnusedProps ? undefined : prop => usedProps.includes(`${prop.name}`),
      sortProptypes,
      includeJSDoc,
    });

    const ast = babel.template.ast(source, { preserveComments: includeJSDoc });

    // TODO: Need to add comments to the AST since template.ast removes them from the source
    // https://github.com/babel/babel/issues/9684
    // Once fixed, this block can be removed
    if (
      includeJSDoc &&
      babelTypes.isExpressionStatement(ast) &&
      babelTypes.isAssignmentExpression(ast.expression) &&
      babelTypes.isObjectExpression(ast.expression.right)
    ) {
      for (const prop of ast.expression.right.properties) {
        if (babelTypes.isObjectProperty(prop) && babelTypes.isIdentifier(prop.key)) {
          const originalProp = props.types.find(x => x.name === prop.key.name);

          if (originalProp && originalProp.jsDoc) {
            prop.leadingComments = prop.leadingComments || [];
            (prop.leadingComments as babelTypes.Comment[]).push({
              type: 'CommentBlock',
              value: `*\n * ${originalProp.jsDoc} \n`,
            } as babelTypes.CommentBlock);
          }
        }
      }
    }

    // Insert prop types
    if (babelTypes.isExportNamedDeclaration(path.parent)) {
      path.insertAfter(babel.template.ast(`export { ${nodeName} };`));
      path.insertAfter(ast);
      path.parentPath.replaceWith(path.node);
    } else if (babelTypes.isExportDefaultDeclaration(path.parent)) {
      path.insertAfter(babel.template(`export default ${nodeName};`)());
      path.insertAfter(ast);
      path.parentPath.replaceWith(path.node);
    } else {
      path.insertAfter(ast);
    }
  }
}

/**
 * Gets used props from path
 * @param rootPath The path to search for uses of rootNode
 * @param rootNode The node to start the search, if undefined searches for `this.props`
 */
function getUsedProps(
  rootPath: babel.NodePath,
  rootNode: babelTypes.ObjectPattern | babelTypes.Identifier | undefined,
) {
  const usedProps: string[] = [];
  getUsedPropsInternal(rootNode);
  return usedProps;

  function getUsedPropsInternal(
    node: babelTypes.ObjectPattern | babelTypes.Identifier | undefined,
  ) {
    if (node && babelTypes.isObjectPattern(node)) {
      node.properties.forEach(x => {
        if (babelTypes.isObjectProperty(x)) {
          usedProps.push(x.key.name);
        } else if (babelTypes.isIdentifier(x.argument)) {
          getUsedPropsInternal(x.argument);
        }
      });
    } else {
      rootPath.traverse({
        VariableDeclarator(path) {
          const init = path.node.init;
          if (
            (node
              ? babelTypes.isIdentifier(init, { name: node.name })
              : babelTypes.isMemberExpression(init) &&
                babelTypes.isThisExpression(init.object) &&
                babelTypes.isIdentifier(init.property, { name: 'props' })) &&
            babelTypes.isObjectPattern(path.node.id)
          ) {
            getUsedPropsInternal(path.node.id);
          }
        },
        MemberExpression(path) {
          if (
            (node
              ? babelTypes.isIdentifier(path.node.object, { name: node.name })
              : babelTypes.isMemberExpression(path.node.object) &&
                babelTypes.isMemberExpression(path.node.object.object) &&
                babelTypes.isThisExpression(path.node.object.object.object) &&
                babelTypes.isIdentifier(path.node.object.object.property, { name: 'props' })) &&
            babelTypes.isIdentifier(path.node.property)
          ) {
            usedProps.push(path.node.property.name);
          }
        },
      });
    }
  }
}
