const possibleDefaultImports = ['@mui/material/Grid2', '@mui/system/Grid', '@mui/joy/Grid'];
const possibleNamedImports = {
  '@mui/material': 'Grid2',
  '@mui/system': 'Grid',
  '@mui/joy': 'Grid',
};

const defaultBreakpoints = ['xs', 'sm', 'md', 'lg', 'xl'];

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function gridV2Props(file, api, options) {
  if (file.path?.endsWith('.json') || file.path?.endsWith('.d.ts')) {
    return file.source;
  }
  const j = api.jscodeshift;
  const root = j(file.source);
  const breakpoints = options.muiBreakpoints?.split(',') || defaultBreakpoints;
  const printOptions = options.printOptions;

  const gridLocalNames = [];

  root
    .find(j.ImportDeclaration, (decl) => possibleDefaultImports.includes(decl.source.value))
    .forEach((decl) => {
      decl.node.specifiers.forEach((spec) => {
        if (spec.type === 'ImportDefaultSpecifier') {
          gridLocalNames.push(spec.local.name);
        }
      });
    });

  root
    .find(j.ImportDeclaration, (decl) =>
      Object.keys(possibleNamedImports).includes(decl.source.value),
    )
    .forEach((decl) => {
      decl.node.specifiers.forEach((spec) => {
        if (spec.type === 'ImportSpecifier') {
          if (possibleNamedImports[decl.node.source.value] === spec.imported.name) {
            gridLocalNames.push(spec.local.name);
          }
        }
      });
    });

  root
    .find(j.JSXElement, {
      openingElement: {
        name: {
          name: (name) => gridLocalNames.includes(name),
        },
      },
    })
    .forEach((el) => {
      const size = j.objectExpression([]);

      const spreadProps = [];
      const attributesToPrune = [];

      el.node.openingElement.attributes.forEach((attr) => {
        if (attr.type === 'JSXSpreadAttribute') {
          spreadProps.push(attr);
        }
      });

      const breakpointNodes = j(el)
        .find(j.JSXAttribute)
        .filter(
          (path) =>
            path.parent.parent.node === el.node && breakpoints.includes(path.node.name.name),
        );

      breakpointNodes.nodes().forEach((node) => {
        const breakpoint = node.name.name;
        const nodeValue = node.value;
        let value;

        if (nodeValue === null) {
          value = j.stringLiteral('grow');
        } else if (nodeValue.type === 'JSXExpressionContainer') {
          if (nodeValue.expression.value === true) {
            value = j.stringLiteral('grow');
          } else {
            value = nodeValue.expression;
          }
        } else {
          value = nodeValue;
        }

        size.properties.push(j.property('init', j.identifier(breakpoint), value));
      });

      spreadProps.forEach((spreadProp) => {
        const spreadPropArgument = spreadProp.argument;
        if (spreadPropArgument.type === 'ObjectExpression') {
          const propertiesToPrune = [];
          spreadPropArgument.properties.forEach((property) => {
            if (breakpoints.includes(property.key.name)) {
              size.properties.push(j.property('init', property.key, property.value));
              propertiesToPrune.push(property.key.name);
            }
          });
          spreadPropArgument.properties = spreadPropArgument.properties.filter(
            (prop) => !propertiesToPrune.includes(prop.key.name),
          );
          if (spreadPropArgument.properties.length === 0) {
            attributesToPrune.push(spreadProp);
          }
        }
      });

      if (size.properties.length) {
        let sizePropValue = size;
        if (size.properties.length === 1 && size.properties[0].key.name === 'xs') {
          sizePropValue = size.properties[0].value;
        }
        if (sizePropValue.type !== 'StringLiteral') {
          sizePropValue = j.jsxExpressionContainer(sizePropValue);
        }

        el.node.openingElement.attributes.push(
          j.jsxAttribute(j.jsxIdentifier('size'), sizePropValue),
        );
      }

      el.node.openingElement.attributes = el.node.openingElement.attributes.filter(
        (attr) => !breakpoints.includes(attr?.name?.name),
      );

      const offset = j.objectExpression([]);

      const offsetNodes = j(el)
        .find(j.JSXAttribute)
        .filter(
          (path) =>
            path.parent.parent.node === el.node &&
            path.node.name.name.endsWith('Offset') &&
            breakpoints.includes(path.node.name.name.replace('Offset', '')),
        );

      offsetNodes.nodes().forEach((node) => {
        const breakpoint = node.name.name.replace('Offset', '');
        const value =
          node.value.type === 'JSXExpressionContainer' ? node.value.expression : node.value;

        offset.properties.push(j.property('init', j.identifier(breakpoint), value));
      });

      spreadProps.forEach((spreadProp) => {
        const spreadPropArgument = spreadProp.argument;
        if (spreadPropArgument.type === 'ObjectExpression') {
          const propertiesToPrune = [];
          spreadPropArgument.properties.forEach((property) => {
            const breakpoint = property.key.name.replace('Offset', '');
            if (property.key.name.endsWith('Offset') && breakpoints.includes(breakpoint)) {
              offset.properties.push(j.property('init', j.identifier(breakpoint), property.value));
              propertiesToPrune.push(property.key.name);
            }
          });
          spreadPropArgument.properties = spreadPropArgument.properties.filter(
            (prop) => !propertiesToPrune.includes(prop.key.name),
          );
          if (spreadPropArgument.properties.length === 0) {
            attributesToPrune.push(spreadProp);
          }
        }
      });

      if (offset.properties.length) {
        let offsetPropValue = offset;

        if (offset.properties.length === 1 && offset.properties[0].key.name === 'xs') {
          offsetPropValue = offset.properties[0].value;
        }

        if (offsetPropValue.type !== 'StringLiteral') {
          offsetPropValue = j.jsxExpressionContainer(offsetPropValue);
        }

        el.node.openingElement.attributes.push(
          j.jsxAttribute(j.jsxIdentifier('offset'), offsetPropValue),
        );
      }

      el.node.openingElement.attributes = el.node.openingElement.attributes.filter(
        (attr) => !breakpoints.includes(attr?.name?.name.replace('Offset', '')),
      );

      el.node.openingElement.attributes = el.node.openingElement.attributes.filter(
        (attr) => !attributesToPrune.includes(attr),
      );
    });

  return root.toSource(printOptions);
}
