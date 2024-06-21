const possibleDefaultImports = [
  '@mui/material/Unstable_Grid2',
  '@mui/system/Unstable_Grid',
  '@mui/joy/Grid',
];
const possibleNamedImports = {
  '@mui/material': 'Unstable_Grid2',
  '@mui/system': 'Unstable_Grid',
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
          if (possibleNamedImports[decl.node.source.value].includes(spec.imported.name)) {
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

      const breakpointNodes = j(el)
        .find(j.JSXAttribute)
        .filter(
          (path) =>
            path.parent.parent.node === el.node && breakpoints.includes(path.node.name.name),
        );

      const breakpointNodesArray = breakpointNodes.nodes() || [];

      breakpointNodesArray.forEach((node) => {
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
            breakpoints.includes(path.node.name.name.replace('Offset', '')),
        );

      const offsetNodesArray = offsetNodes.nodes() || [];

      offsetNodesArray.forEach((node) => {
        const breakpoint = node.name.name.replace('Offset', '');
        const value =
          node.value.type === 'JSXExpressionContainer' ? node.value.expression : node.value;

        offset.properties.push(j.property('init', j.identifier(breakpoint), value));
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
    });

  return root.toSource(printOptions);
}
