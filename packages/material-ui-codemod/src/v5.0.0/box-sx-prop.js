const boxProps = [
  'border',
  'borderTop',
  'borderRight',
  'borderBottom',
  'borderLeft',
  'borderColor',
  'borderRadius',
  'displayPrint',
  'display',
  'overflow',
  'textOverflow',
  'visibility',
  'whiteSpace',
  'flexDirection',
  'flexWrap',
  'justifyContent',
  'alignItems',
  'alignContent',
  'order',
  'flex',
  'flexGrow',
  'flexShrink',
  'alignSelf',
  'color',
  'bgcolor',
  'position',
  'zIndex',
  'top',
  'right',
  'bottom',
  'left',
  'boxShadow',
  'width',
  'maxWidth',
  'minWidth',
  'height',
  'maxHeight',
  'minHeight',
  'boxSizing',
  'm',
  'mt',
  'mr',
  'mb',
  'ml',
  'mx',
  'my',
  'p',
  'pt',
  'pr',
  'pb',
  'pl',
  'px',
  'py',
  'margin',
  'marginTop',
  'marginRight',
  'marginBottom',
  'marginLeft',
  'marginX',
  'marginY',
  'padding',
  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',
  'paddingX',
  'paddingY',
  'fontFamily',
  'fontSize',
  'fontStyle',
  'fontWeight',
  'letterSpacing',
  'lineHeight',
  'textAlign',
];

export default function transformer(file, api) {
  const j = api.jscodeshift;

  function buildSxValue(node, value) {
    value.push(
      j.objectProperty(
        j.identifier(node.name.name),
        node.value.expression ? node.value.expression : node.value,
        false,
        false,
      ),
    );
    return value;
  }

  return j(file.source)
    .findJSXElements('Box')
    .forEach((path) => {
      let sxValue = [];
      const attributes = path.node.openingElement.attributes;
      attributes.forEach((node, index) => {
        // Only transform whitelisted props
        if (node.type === 'JSXAttribute' && boxProps.includes(node.name.name)) {
          sxValue = buildSxValue(node, sxValue);
          delete attributes[index];
        }
      });
      if (sxValue.length > 0) {
        attributes.push(
          j.jsxAttribute(
            j.jsxIdentifier('sx'),
            j.jsxExpressionContainer(j.objectExpression(sxValue)),
          ),
        );
      }
    })
    .toSource();
}
