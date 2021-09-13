export default function propsToObject({ j, root, componentName, propName, props }) {
  function buildObject(node, value) {
    const shorthand = node.value.expression && node.value.expression.name === node.name.name;
    const property = j.objectProperty(
      j.identifier(node.name.name),
      node.value.expression ? node.value.expression : node.value,
    );
    property.shorthand = shorthand;
    value.push(property);

    return value;
  }

  return root.findJSXElements(componentName).forEach((path) => {
    let propValue = [];
    const attributes = path.node.openingElement.attributes;
    attributes.forEach((node, index) => {
      // Only transform whitelisted props
      if (node.type === 'JSXAttribute' && props.includes(node.name.name)) {
        propValue = buildObject(node, propValue);
        delete attributes[index];
      }
    });
    if (propValue.length > 0) {
      const propNameAttr = attributes.find((attr) => attr?.name?.name === propName);
      if (propNameAttr) {
        (propNameAttr.value.expression?.properties || []).push(
          ...j.objectExpression(propValue).properties,
        );
      } else {
        attributes.push(
          j.jsxAttribute(
            j.jsxIdentifier(propName),
            j.jsxExpressionContainer(j.objectExpression(propValue)),
          ),
        );
      }
    }
  });
}
